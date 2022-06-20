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

              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ authUser.self_introduction }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-subtitle>
                  性別:{{ authUser.sex }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-content>
                <v-list-item-subtitle>
                  年齢:{{ user.age }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-row>

    <v-row>
      <v-card
        height="200"
        width="600"
        color="red"
        class="flex-grow-1"
      >
        簡易戦績が入る
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
      }
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user.age = this.getUserAge(this.authUser.date_of_birth)
  },
  methods: {
    getUserAge (birthday) {
      console.log(birthday)
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    }
  }
}
</script>
