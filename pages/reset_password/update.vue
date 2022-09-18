<template>
  <v-container>
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
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="resetPassword">
            <v-container fluid>
              <user-form-password :password.sync="user.password" />

              <user-form-password-confirmation :password-confirmation.sync="user.password_confirmation" />

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
  name: 'ResetPasswordPage',
  data ({ $route }) {
    return {
      user: {
        password: '',
        password_confirmation: ''
      },
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  },
  methods: {
    async resetPassword () {
      if (!this.invalid) {
        await this.$axios.$post
      }
    }
  }
}
</script>
