<template>
  <v-main>
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
                <user-form-email :email.sync="email" />

                <user-form-password :password.sync="password" />

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
  </v-main>
</template>

<script>
export default {
  name: 'LoginPage',
  data ({ $config: { appName } }) {
    return {
      appName,
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$axios.post('api/v1/sessions', { email: this.email, password: this.password })
    }
  }
}
</script>
