<template>
  <div>
    <room-back-previous-page-button />

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
      >
        <div class="text-h3 my-7 text-center">
          ホスト
        </div>
      </v-col>

      <v-col
        align="center"
        cols="12"
        sm="8"
        md="8"
        lg="8"
      >
        <v-card id="host-profile" flat>
          <v-list-item>
            <div v-if="this.room.host.avatar_url">
              <v-list-item-avatar size="150">
                <v-img :src="this.room.host.avatar_url" />
              </v-list-item-avatar>
            </div>
            <div v-else>
              <v-list-item-avatar size="150">
                <v-img :src="defaultAvatarSrc" />
              </v-list-item-avatar>
            </div>

            <v-list-item-content>
              <v-list-item-title class="text-h4 text-left">
                {{ this.room.host.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-left introduction">
                {{ this.room.host.self_introduction }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        align="center"
        cols="12"
        sm="4"
        md="4"
        lg="4"
      >
        <v-card id="rank-stats" :loading="loading">
          <div class="text-h6 pa-3 text-center">
            Rank Stats
          </div>

          <div v-if="rankStatsData">
            <profile-rank-stats :rank-stats-data="rankStatsData" />
          </div>
          <div v-else>
            <p>NO DATA</p>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <div class="text-h3 my-7 text-center">
          募集内容
        </div>

        <v-col>
          <v-card>
            <RoomDetails :room="room" />
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'RoomIdIndex',
  async asyncData ({ $axios, params }) {
    const room = await $axios.$get(
      'api/v1/rooms/' + params.id
    )
    // console.log('部屋情報:', room)
    // console.log('募集主情報:', room.host)
    return { room }
  },
  data () {
    return {
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      data: '',
      legendStatsData: '',
      targetLegend: '',
      rankStatsData: [],
      totalStatsData: '',
      loading: true
    }
  },
  created () {
    this.getGameData()
  },
  methods: {
    // TODO profile/index.vueと同じ表記がある為、クラス化を検討
    async getGameData () {
      await this.$axios.$get(
        'search',
        {
          params: {
            game_id: this.room.host.game_id,
            platform: this.room.host.platform
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      if (this.isDifferentGameId(res)) {
        this.loading = false
        console.log('idが一致しません。')
        return
      }
      this.data = res
      this.setLegendsData()
      this.setRankData()
      this.setTotalData()
    },
    requestFailure (e) {
      this.loading = false
      console.log(e)
    },
    setLegendsData () {
      this.legendStatsData = this.data.legends.all
      this.getLegendData()
    },
    getLegendKillData () {
      const data = this.legendStatsData
      const legendKillData = []
      Object.keys(data).forEach((key) => {
        if (data[key].data !== undefined) {
          Object.values(data[key].data).forEach((value) => {
            if (value.name === 'BR Kills') {
              const obj = {
                name: '',
                value: ''
              }
              obj.name = key
              obj.value = value.value
              legendKillData.push(obj)
            }
          })
        }
      })
      // console.log('legendKillData:', legendKillData)
      return legendKillData
    },
    getHighestKillData () {
      const data = this.getLegendKillData()
      let hightestKillLegendData = ''
      data.forEach((el) => {
        if (!hightestKillLegendData || hightestKillLegendData.value < el.value) {
          hightestKillLegendData = el
        }
      })
      // console.log('hightestKillLegendData:', hightestKillLegendData)
      return hightestKillLegendData
    },
    getLegendData () {
      const data = this.getHighestKillData()
      if (data.name in this.legendStatsData) {
        this.targetLegend = this.legendStatsData[data.name]
      }
      this.loading = false
      // console.log('targetLegend:', this.targetLegend)
    },
    isDifferentGameId (data) {
      return !this.room.host.game_id === data.global.name
    },
    setRankData () {
      this.rankStatsData.push(this.data.global.arena)
      this.rankStatsData.push(this.data.global.rank)
    },
    setTotalData () {
      this.totalStatsData = this.data.total
    }
  }
}
</script>

<style scoped>
  .introduction {
    white-space: normal;
  }
</style>
