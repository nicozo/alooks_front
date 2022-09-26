<template>
  <v-container fluid>
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
            <v-container fluid>
              <user-form-name :name.sync="user.name" />

              <user-form-email :email.sync="user.email" />

              <user-form-password :password.sync="user.password" />

              <user-form-password-confirmation :password-confirmation.sync="user.password_confirmation" />

              <v-row>
                <v-col>
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
        <NuxtLink
          :to="{ name: 'login' }"
          class="text-decoration-none"
        >
          {{ $t('btn.already_have_account') }}
        </NuxtLink>
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
      console.log(res)
      this.$router.push('/login')

      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    registerFailure ({ response }) {
      if (response && response.status === 400) {
        const msg = 'ユーザーを作成できませんでした。既に使用されているメールアドレスです。'
        return this.$store.dispatch('getToast', { msg })
      }
      this.$store.dispatch('getBtnLoading', false)
    },
    setToaster () {
      const msg = 'ユーザーを作成しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
