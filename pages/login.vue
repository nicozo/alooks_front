<template>
  <v-container fluid>
    <app-back-home-button />

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ $t('pages.login') }}
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
  data () {
    return {
      // 開発環境中にログインを行いやすくするためデフォルトの値を設定
      // auth_userブランチの作業が終わり次第空にすること
      user: {
        email: 'test1@example.com',
        password: 'password'
      },
      redirectPath: this.$store.state.loggedIn.rememberPath,
      loggedInHomePath: this.$store.state.loggedIn.homePath
    }
  },
  methods: {
    async login () {
      if (!this.invalid) {
        await this.$axios.$post('api/v1/sessions', this.user)
          .then(res => this.authSuccessful(res))
          .catch(e => this.authFailure(e))
      }
    },
    authSuccessful (res) {
      this.$auth.login(res)
      this.$router.push(this.redirectPath)
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        const msg = 'メールアドレスまたはパスワードが一致しません'
        return this.$store.dispatch('getToast', { msg })
      }
      // TODO エラー処理
      console.log(response)
    }
  }
}
</script>
