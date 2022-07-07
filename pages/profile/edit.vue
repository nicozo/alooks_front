<template>
  <v-row
    id="profile-form"
    align="center"
    justify="center"
  >
    <v-card
      flat
      width="80%"
      max-width="400"
    >
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="updateProfile">
          <v-container fluid>

          <v-row>
            <v-col>
              <v-layout justify-center>
                <div v-if="user.avatar_url">
                  <v-avatar size="200">
                    <img :src="user.avatar_url" alt="プロフィール画像です">
                  </v-avatar>
                </div>
                <div v-else>
                  <v-avatar size="200">
                    <img :src="defaultAvatarSrc" alt="プロフィール画像です">
                  </v-avatar>
                </div>
              </v-layout>
            </v-col>
          </v-row>

            <v-row>
              <v-col>
                <validation-provider
                  v-slot="{errors}"
                  name="プロフィール画像"
                  rules="image"
                >
                  <v-file-input
                    id="avatar"
                    v-model="uploadAvatar"
                    label="プロフィール画像"
                    accept="image/png, image/jpeg"
                    :error-messages="errors"
                    outlined
                    hint="推奨サイズ:640x590"
                    persistent-hint
                  />
                </validation-provider>
              </v-col>
            </v-row>

            <user-form-name :name.sync="user.name" />

            <user-form-self-introduction :self-introduction.sync="user.self_introduction" />

            <user-form-date-of-birth :date-of-birth.sync="user.date_of_birth" />

            <user-form-sex :sex.sync="user.sex" />

            <user-form-game-id :game-id.sync="user.game_id" />

            <user-form-platform :platform.sync="user.platform" />
            <v-row>
              <v-col>
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  :disabled="invalid"
                >
                  更新する
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </validation-observer>
    </v-card>
  </v-row>
</template>

<script>
export default {
  name: 'ProfileEdit',
  data () {
    return {
      user: {
        name: '',
        self_introduction: '',
        date_of_birth: '',
        sex: '',
        game_id: '',
        avatar_url: '',
        platform: ''
      },
      uploadAvatar: null,
      defaultAvatarSrc: require('@/static/DefaultAvatar.png')
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    }
  },
  created () {
    this.user = Object.assign({}, this.authUser)
    // console.log('ログインユーザー情報：', this.user)
  },
  methods: {
    async updateProfile () {
      const formData = new FormData()
      formData.append('user[name]', this.user.name)
      formData.append('user[self_introduction]', this.user.self_introduction)
      formData.append('user[date_of_birth]', this.user.date_of_birth)
      formData.append('user[sex]', this.user.sex)
      formData.append('user[game_id]', this.user.game_id)
      formData.append('user[platform]', this.user.platform)
      if (this.uploadAvatar !== null) {
        formData.append('user[avatar]', this.uploadAvatar)
      }
      // console.log(...formData.entries())

      await this.$axios.$patch(
        `/api/v1/profile/${this.authUser.id}`,
        formData
      )
        .then(res => this.uploadSuccessful(res))
        .catch(e => console.log(e))
    },
    uploadSuccessful (res) {
      this.setToaster()
      this.$store.dispatch('getAuthUser', res)
      // TODO ログイン状態を維持して/roomsに遷移する実装
      // 一旦リロードさせる方法を使用
      // レスポンスにsubを含めていないため、VuexのauthUserのsubの値が保存されずログアウトが走ってしまう。
      this.$router.go({
        path: this.$router.currentRoute.path,
        force: true
      })
    },
    setToaster () {
      const msg = 'プロフィール画像を更新しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
