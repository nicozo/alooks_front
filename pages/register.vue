<template>
  <v-container fill-height>
    <app-back-home-button />

    <v-row
      id="register-form"
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
          <form @submit.prevent="register">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <user-form-name :name.sync="user.name" />
                </v-col>

                <v-col cols="12">
                  <user-form-email :email.sync="user.email" />
                </v-col>

                <v-col cols="12">
                  <user-form-password :password.sync="user.password" />
                </v-col>

                <v-col cols="12">
                  <user-form-password-confirmation :password-confirmation.sync="user.password_confirmation" />
                </v-col>

                <v-col cols="12">
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                    :loading="btnLoading"
                  >
                    {{ $t('btn.register') }}
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
          :to="{ name: 'login' }"
        >
          {{ $t('btn.already_have_account') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'signup',
  data ({ $route }) {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async register () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/registers',
          { user: this.user }
        )
          .then(res => this.registerSuccessful(res))
          .catch(e => this.registerFailure(e))
      }
    },
    registerSuccessful (res) {
      this.$router.push('/login')

      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    registerFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = 'ユーザーを作成できませんでした。既に使用されているメールアドレスです。'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'ユーザーを作成しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
