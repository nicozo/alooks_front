<template>
  <v-container>
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

    <v-row
      id="profile"
      align="center"
      justify="center"
    >
      <v-card
        flat
        width="70%"
      >
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <div v-if="authUser.avatar_url">
                <v-avatar size="200">
                  <img :src="authUser.avatar_url" alt="プロフィール画像です">
                </v-avatar>
              </div>
              <div v-else>
                <v-avatar size="200">
                  <img :src="defaultAvatarSrc" alt="プロフィール画像です">
                </v-avatar>
              </div>
            </v-list-item-content>

            <v-list-item-content class="pr-10">
              <v-list-item-title class="text-h4">
                {{ authUser.name }}
              </v-list-item-title>

              <!-- TODO テキストが長いと見切れてしまう問題を修正 -->
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ authUser.self_introduction }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <!-- TODO 性別を日本語に翻訳 -->
              <v-list-item-content>
                <div v-if="authUser.sex">
                  <v-list-item-subtitle>
                    性別:{{ authUser.sex }}
                  </v-list-item-subtitle>
                </div>
                <div v-else>
                  <v-list-item-subtitle>
                    性別:未登録
                  </v-list-item-subtitle>
                </div>
              </v-list-item-content>

              <v-list-item-content>
                <div v-if="authUser.date_of_birth">
                  <v-list-item-subtitle>
                    年齢:{{ user.age }}
                  </v-list-item-subtitle>
                </div>
                <div v-else>
                  <v-list-item-subtitle>
                    年齢:未登録
                  </v-list-item-subtitle>
                </div>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>

    <v-row>
      <v-card class="flex-grow-1">
        <div v-show="loading">
          <v-progress-circular
            :value="100"
            :size="50"
            color="primary"
            indeterminate
          >
          </v-progress-circular>
          <div>
            Now Getting Your Apex Legends Status...
          </div>
        </div>
        <div v-show="!loading">
          <div v-if="targetLegend.ImgAssets">
            <v-img :src="targetLegend.ImgAssets.banner">

            </v-img>
          </div>
          <div v-else>
            データを取得できませんでした。
          </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
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
      legendData: '',
      targetLegend: '',
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
            platform: 'PS4',
            player: this.authUser.game_id,
            auth: '7ca10e99dcb9441bc514bbe9892e863f'
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      this.setLegendsData(res)
    },
    requestFailure (e) {
      this.loading = false
      console.log(e)
    },
    setLegendsData (data) {
      this.legendData = data.legends.all
      if (this.legendData) {
        this.getLegendData()
      }
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
      } else {
        console.log('レジェンドデータが存在しません。')
      }
      this.loading = false
      console.log('targetLegend:', this.targetLegend)
    }
  }
}
</script>
