<template>
  <div>
    <!-- <v-row>
      <v-col align="end">
        <v-btn
          color="success"
          to="/profile/edit"
        >
          プロフィールを編集
        </v-btn>
      </v-col>
    </v-row> -->

    <div v-show="loading">
      <v-row
        style="height: 100vh;"
        justify="center"
        align-content="center"
      >
        <v-col>
          <v-card
            flat
            class="text-center"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
            <p>
              Now Loading Your Apex Legends Status...
            </p>
          </v-card>
        </v-col>
      </v-row>
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
            class="pa-0"
            align="center"
            cols="12"
          >
            <profile-banner :target-legend-banner="targetLegend.ImgAssets.banner" />
          </v-col>

          <!-- ログインユーザーブロック -->
          <v-col
            align="center"
            cols="12"
            sm="8"
            md="8"
            lg="8"
          >
            <profile-user-details
              :auth-user="authUser"
              :user-age="user.age"
            />
          </v-col>

          <!-- Apex Legendsランクブロック -->
          <v-col
            align="center"
            cols="12"
            sm="4"
            md="4"
            lg="4"
          >
            <profile-rank-stats :rank-stats-data="rankStatsData" />
          </v-col>

          <!-- Apex Legends戦績ブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <profile-total-stats
              :total-stats-data="totalStatsData"
              :target-legend="targetLegend"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row
          id="profile"
          align="center"
          justify="center"
        >
          <!-- バナーブロック -->
          <v-col
            class="pa-0"
            align="center"
            cols="12"
          >
            <v-card>
              <v-img
                id="profile-banner"
                :src="commonImageSrc"
                max-height="400"
              />
            </v-card>
          </v-col>

          <!-- ログインユーザーブロック -->
          <v-col
            align="center"
            cols="12"
            sm="8"
            md="8"
            lg="8"
          >
            <v-card id="user-profile">
              <v-list-item>
                <div v-if="authUser.avatar_url">
                  <v-list-item-avatar size="100">
                    <v-img :src="authUser.avatar_url" />
                  </v-list-item-avatar>
                </div>
                <div v-else>
                  <v-list-item-avatar size="100">
                    <v-img :src="defaultAvatarSrc" />
                  </v-list-item-avatar>
                </div>

                <v-list-item-content>
                  <v-list-item-title class="text-h4 text-left">
                    {{ authUser.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle class="text-left">
                    {{ authUser.self_introduction }}
                  </v-list-item-subtitle>

                  <div v-show="user.age">
                    <v-list-item-subtitle class="text-left">
                      {{ user.age }}歳
                    </v-list-item-subtitle>
                  </div>
                  <div v-show="!user.age">
                    <v-list-item-subtitle class="text-left">
                      未登録
                    </v-list-item-subtitle>
                  </div>

                  <v-list-item-subtitle class="text-left">
                    {{ authUser.sex }}
                  </v-list-item-subtitle>
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
            <v-card id="rank-stats">
              <v-row
                justify="center"
                align-content="center"
              >
                <v-col>
                  <v-card
                    flat
                    class="text-center"
                  >
                    <p>
                      NO DATA
                    </p>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- Apex Legends戦績ブロック -->
          <v-col
            align="center"
            cols="12"
          >
            <v-card id="player-stats">
              <v-row
                justify="center"
                align-content="center"
              >
                <v-col>
                  <v-card
                    flat
                    class="text-center"
                  >
                    <p>
                      NO DATA
                    </p>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileIndexPage',
  data ({ $config: { apiKey } }) {
    return {
      user: {
        age: ''
      },
      defaultAvatarSrc: require('@/static/DefaultAvatar.png'),
      commonImageSrc: require('@/static/CommonImage.jpg'),
      data: '',
      legendStatsData: '',
      targetLegend: '',
      rankStatsData: [],
      totalStatsData: '',
      loading: true,
      apiKey
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user.age = this.getUserAge(this.authUser.date_of_birth)
    console.log(this.user.age)
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
            platform: 'PS4',
            player: this.authUser.game_id,
            auth: this.apiKey
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
      console.log('targetLegend:', this.targetLegend)
    },
    isDifferentGameId (data) {
      return !this.authUser.game_id === data.global.name
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
