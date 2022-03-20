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
              {{ appName }}に新規登録
            </h1>
          </v-col>

          <v-card
            flat
            width="80%"
            max-width="400"
          >
            <validation-observer v-slot="{ invalid }">
              <form @submit.prevent="console">
                <v-container fluid>
                  <v-row>
                    <v-col>
                      <validation-provider
                        v-slot="{ errors }"
                        name="ユーザー名"
                        rules="required|max:30"
                      >
                        <v-text-field
                          v-model="user.name"
                          label="ユーザー名"
                          placeholder="あなたのユーザー名"
                          counter="30"
                          :error-messages="errors"
                          outlined
                          clearable
                          required
                        >
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <validation-provider
                        v-slot="{ errors }"
                        name="メールアドレス"
                        rules="required|email"
                      >
                        <v-text-field
                          v-model="user.email"
                          label="メールアドレス"
                          placeholder="your@example.com"
                          :error-messages="errors"
                          outlined
                          clearable
                          required
                        >
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <validation-provider
                        v-slot="{ errors }"
                        name="パスワード"
                        rules="required|min:3"
                        vid="password"
                      >
                        <v-text-field
                          v-model="user.password"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPassword ? 'text' : 'password'"
                          label="パスワード"
                          placeholder="3文字以上"
                          :error-messages="errors"
                          outlined
                          clearable
                          required
                          @click:append="showPassword = !showPassword"
                        >
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <validation-provider
                        v-slot="{ errors }"
                        name="パスワード（確認）"
                        rules="required|confirmed:password"
                      >
                        <v-text-field
                          v-model="user.password_confirmation"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPassword ? 'text' : 'password'"
                          label="パスワード（確認）"
                          placeholder="パスワードを再入力"
                          :error-messages="errors"
                          outlined
                          clearable
                          required
                          @click:append="showPassword = !showPassword"
                        >
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>

                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                  >
                    登録する
                  </v-btn>
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
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      showPassword: false
    }
  },
  methods: {
    console () {
      console.log(this.user)
    }
  }
}
</script>
