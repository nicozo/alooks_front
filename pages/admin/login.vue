<template>
  <v-container fill-height>
    <v-row
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
        width="400"
        max-width="600"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="login">
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
                >
                  {{ $t('btn.login') }}
                </v-btn>
              </v-col>
            </v-row>
          </form>
        </validation-observer>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminILoginPage',
  layout: 'signup',
  data ({ $route }) {
    return {
      user: {
        email: '',
        password: ''
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
    async login () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          '/api/v1/admin/sessions',
          this.user
        )
          .then(res => this.authSuccessful(res))
          .catch(e => this.authFailure(e))
      }
    },
    authSuccessful (res) {
      this.$auth.login(res)
      this.$router.push('/admin')
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    authFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 404) {
        const msg = 'メールアドレスまたはパスワードが一致しません'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'ログインしました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
