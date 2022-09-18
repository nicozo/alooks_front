<template>
  <v-container>
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
          {{ pageTitle }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="400"
      >
        <v-card-text>
          メールアドレスを入力してください
        </v-card-text>

        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="sendEmail">
            <v-container fluid>
              <user-form-email :email.sync="user.email" />

              <v-row>
                <v-col>
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                  >
                    {{ $t('btn.submit') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ResetPasswordUpdatePage',
  data ({ $route }) {
    return {
      user: {
        email: ''
      },
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  },
  methods: {
    async sendEmail () {
      if (!this.invalid) {
        await this.$axios.$post(
          'api/v1/password_resets',
          { email: this.user.email }
        )
          .then(res => this.sendEmailSuccessful(res))
      }
    },
    sendEmailSuccessful (res) {
      console.log(res)

      this.setToaster()
    },
    setToaster () {
      const msg = 'Eメールを送信しました。Eメールのリンクからパスワードをリセットしてください'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
