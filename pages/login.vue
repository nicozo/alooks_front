<template>
  <div>
    <home-header />

    <v-main>
      <v-container fluid>
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
              <form @submit.prevent="loginUser">
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
      </v-container>
    </v-main>

    <app-footer />
  </div>
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
    loginUser () {
      console.log(this.email)
      console.log(this.password)
    }
  }
}
</script>
