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
            <v-form>
              <v-container fluid>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="user.name"
                      label="ユーザー名"
                      placeholder="あなたのユーザー名"
                      counter="30"
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="user.email"
                      label="メールアドレス"
                      placeholder="your@example.com"
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="user.password"
                      label="パスワード"
                      placeholder="3文字以上"
                      outlined
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="user.password_confirmation"
                      label="パスワード（確認用）"
                      placeholder="パスワードを再入力"
                      outlined
                    >
                    </v-text-field>
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
            </v-form>
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
