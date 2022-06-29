<template>
  <div>
    <v-row>
      <v-col align="end">
        <v-btn
          color="success"
          to="/profile/edit"
        >
          プロフィールを編集
        </v-btn>
      </v-col>
    </v-row>

    <div v-show="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
        <div>
          Now Loading Your Apex Legends Status...
        </div>
      </div>
    </div>

    <div v-show="!loading">
      <div v-if="targetLegend">
        <v-row
          id="profile"
          align="center"
          justify="center"
        >
          <!-- バナーブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <div v-if="targetLegend.ImgAssets">
              <v-img
                :src="targetLegend.ImgAssets.banner"
                max-height="400"
              />
            </div>
            <div v-else>
              <v-img
                :src="defaultAvatarSrc"
                max-height="400"
              />
            </div>
          </v-col>

          <!-- ログインユーザーブロック -->
          <v-col
            align="center"
            cols="12"
            md="6"
            lg="6"
          >
            <v-card>
              <v-list-item>
                <div v-if="authUser.avatar_url">
                  <v-list-item-avatar size="100">
                    <v-img :src="authUser.avatar_url"/>
                  </v-list-item-avatar>
                </div>
                <div v-else>
                  <v-list-item-avatar size="100">
                    <v-img :src="defaultAvatarSrc"/>
                  </v-list-item-avatar>
                </div>

                <v-list-item-content>
                  <v-list-item-title class="text-h4 text-left">
                    {{ authUser.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ authUser.self_introduction }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    {{ user.age }}歳
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="text-left">
                    {{ authUser.sex }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <!-- Apex Legends戦績ブロック -->
          <v-col
            align="center"
            cols="12"
            md="6"
            lg="6"
          >
            <v-card>
              <v-list-item>
                <v-list-item-icon>
                  <img :src="targetLegend.ImgAssets.icon" width="100">
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    v-for="(data, i) in targetLegend.data"
                    :key="i"
                    v-show="data.name === 'BR Kills' ||
                            data.name === 'BR Damage' ||
                            data.name === 'BR Wins' ||
                            data.name === 'BR Headshots'"
                  >
                    {{ data.name }} {{ data.value }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>

          <!-- Apex Legendsランクブロック -->
          <v-col
            align="center"
            cols="12"
            sm="4"
            md="4"
            lg="4"
          >
            <v-card>
              <v-list-item>
                <template v-for="(data, i) in rankData">
                  <v-list-item-content :key="i">
                    <v-list-item-title v-show="isThisArenaRankData(data)">
                      Arena
                    </v-list-item-title>
                    <v-list-item-title v-show="!isThisArenaRankData(data)">
                      BR
                    </v-list-item-title>

                    <v-list-item-icon>
                      <v-img :src="data.rankImg" />
                    </v-list-item-icon>

                    <v-list-item-subtitle>
                      {{ data.rankScore }}RP
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-card>
          </v-col>

          <v-col
            align="center"
            cols="12"
          >
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row
          id="profile"
          align="center"
          justify="center"
        >
          <v-col align="center">
            データがありません
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileIndex',
  data () {
    return {
      user: {
        age: ''
      },
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      data: '',
      legendData: '',
      targetLegend: '',
      rankData: [],
      loading: true
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user.age = this.getUserAge(this.authUser.date_of_birth)
    this.getGameData()
  },
  methods: {
    getUserAge (birthday) {
      // console.log(birthday)
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    },
    // TODO ユーザー情報に登録されたplatformを代入するよう修正
    // TODO APIキーを環境変数に持たせるよう修正
    async getGameData () {
      await this.$axios.$get(
        'https://api.mozambiquehe.re/bridge',
        {
          params: {
            platform: 'PC',
            player: this.authUser.game_id,
            auth: '7ca10e99dcb9441bc514bbe9892e863f'
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      if (!this.isSameId(res)) {
        this.loading = false
        console.log('idが一致しません。')
        return
      }
      this.data = res
      this.setLegendsData(this.data.legends)
      this.setRankData(this.data.global)
    },
    requestFailure (e) {
      this.loading = false
      console.log(e)
    },
    setLegendsData (data) {
      this.legendData = data.all
      this.getLegendData()
    },
    getLegendKillData () {
      const data = this.legendData
      const legendKillData = []
      Object.keys(data).forEach((key) => {
        if (data[key].data !== undefined) {
          const obj = {
            name: '',
            value: ''
          }
          obj.name = key
          obj.value = data[key].data[0].value
          legendKillData.push(obj)
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
      if (data.name in this.legendData) {
        this.targetLegend = this.legendData[data.name]
      }
      this.loading = false
      console.log('targetLegend:', this.targetLegend)
    },
    isSameId (data) {
      return !!this.authUser.game_id !== data.global.name
    },
    setRankData (data) {
      this.rankData.push(data.arena)
      this.rankData.push(data.rank)
    },
    isThisArenaRankData (data) {
      return !data.rankedSeason.indexOf('arena')
    }
  }
}
</script>
