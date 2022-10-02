<template>
  <v-container fluid>
    <app-back-home-button />

    <v-row
      id="login-form"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ pageTitle }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="400"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="login">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <user-form-email :email.sync="user.email" />
                </v-col>

                <v-col cols="12">
                  <user-form-password :password.sync="user.password" />
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                    :loading="btnLoading"
                  >
                    {{ $t('btn.login') }}
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
        <v-btn
          plain
          text
          nuxt
          color="primary"
          :to="{ name: 'register' }"
        >
          {{ $t('btn.do_not_have_account') }}
        </v-btn>
      </v-col>

      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          plain
          text
          nuxt
          color="primary"
          :to="{ name: 'reset_password-create' }"
        >
          {{ $t('btn.password_forget') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'signup',
  data ({ $route }) {
    return {
      user: {
        email: '',
        password: ''
      },
      redirect_path: this.$store.state.loggedIn.rememberPath,
      loggedInHomePath: this.$store.state.loggedIn.homePath,
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async login () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/sessions',
          this.user
        )
          .then(res => this.authSuccessful(res))
          .catch(e => this.authFailure(e))
      }
    },
    authSuccessful (res) {
      this.$auth.login(res)
      this.$router.push(this.redirect_path)
      this.$store.dispatch('getRememberPath', this.loggedInHomePath)
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    authFailure ({ response }) {
      if (response && response.status === 404) {
        const msg = 'メールアドレスまたはパスワードが一致しません'
        return this.$store.dispatch('getToast', { msg })
      }
      this.$store.dispatch('getBtnLoading', false)
    },
    setToaster () {
      const msg = 'ログインしました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
