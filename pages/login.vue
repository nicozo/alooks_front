<template>
  <v-container fluid>
    <app-back-previous-page-button />

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ appName }}にログイン
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="400"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="login">
            <v-container fluid>
              <user-form-email :email.sync="user.email" />

              <user-form-password :password.sync="user.password" />

              <v-row>
                <v-col>
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                  >
                    ログインする
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <NuxtLink
          to="/register"
          class="text-decoration-none"
        >
          アカウントお持ちでないですか？
        </NuxtLink>
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <NuxtLink
          to="#"
          class="text-decoration-none"
        >
          パスワードをお忘れですか？
        </NuxtLink>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'signup',
  data ({ $config: { appName } }) {
    return {
      appName,
      // 開発環境中にログインを行いやすくするためデフォルトの値を設定
      // auth_userブランチの作業が終わり次第空にすること
      user: {
        email: 'test1@example.com',
        password: 'password'
      }
    }
  },
  methods: {
    async login () {
      if (!this.invalid) {
        try {
          await this.authSuccessful(this.user)
          // TODO リダイレクト
          // this.$router.push('/rooms')
        } catch (error) {
          this.authFailure(error)
        }
      }
    },
    authSuccessful (user) {
      this.$store.dispatch('login', user)
    },
    authFailure (e) {
      if (e.res && e.res.status === 404) {
        // TODO トースター出力
      }
      // TODO エラー処理
      console.log(e)
    }
  }
}
</script>
