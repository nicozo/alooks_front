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
            <form>
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
                        label="パスワード"
                        placeholder="3文字以上"
                        :error-messages="errors"
                        outlined
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
                        label="パスワード（確認）"
                        placeholder="パスワードを再入力"
                        :error-messages="errors"
                        outlined
                      >
                      </v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>

                <v-btn
                  type="submit"
                  block
                  color="primary"
                >
                  登録する
                </v-btn>
              </v-container>
            </form>
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
      }
    }
  }
}
</script>
