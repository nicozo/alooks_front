<template>
  <v-container fluid>
    <v-btn
      plain
      to="/"
    >
      <v-icon>
        mdi-chevron-double-left
      </v-icon>
      戻る
    </v-btn>

    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ appName }}に新規登録
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="400"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="createUser">
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
                  >
                    登録する
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
          to="/login"
          class="text-decoration-none"
        >
          アカウントをお持ちですか？
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
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    createUser () {
      this.$axios.post('api/v1/registers', { user: this.user })
    }
  }
}
</script>
