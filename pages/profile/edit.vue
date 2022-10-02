<template>
  <v-row
    id="profile-form"
    align="center"
    justify="center"
  >
    <v-card
      flat
      width="800"
      max-width="1000"
    >
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="updateProfile">
          <v-container fluid>
            <v-row dense>
              <v-col cols="12">
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

              <v-col cols="12">
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

              <v-col cols="12">
                <user-form-name :name.sync="user.name" />
              </v-col>

              <v-col cols="12">
                <user-form-self-introduction :self-introduction.sync="user.self_introduction" />
              </v-col>

              <v-col cols="12">
                <user-form-date-of-birth :date-of-birth.sync="user.date_of_birth" />
              </v-col>

              <v-col cols="12">
                <user-form-sex :sex.sync="user.sex" />
              </v-col>

              <v-col cols="12">
                <user-form-game-id :game-id.sync="user.game_id" />
              </v-col>

              <v-col cols="12">
                <user-form-platform :platform.sync="user.platform" />
              </v-col>

              <v-col cols="12">
                <user-form-kd
                  :kd="user.kd"
                  @change="changeKd"
                />
              </v-col>

              <v-col cols="12">
                <user-form-highest-damage :highest-damage.sync="user.highest_damage" />
              </v-col>

              <v-col cols="12">
                <user-form-favorite-weapons :favorite-weapons.sync="user.favorite_weapons" />
              </v-col>

              <v-col cols="12">
                <v-btn
                  type="submit"
                  block
                  color="primary"
                  :disabled="invalid"
                  :loading="btnLoading"
                >
                  {{ $t('btn.update') }}
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
        platform: '',
        kd: null,
        highest_damage: null,
        favorite_weapons: ''
      },
      uploadAvatar: null,
      redirectPath: this.$store.state.loggedIn.rememberPath
    }
  },
  computed: {
    authUser () {
      return this.$auth.user
    },
    defaultAvatarSrc () {
      return this.$store.getters.defaultAvatarSrc
    },
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  created () {
    this.user = Object.assign({}, this.authUser)
    // console.log('ログインユーザー情報：', this.user)
  },
  methods: {
    async updateProfile () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        const formData = new FormData()
        formData.append('user[name]', this.user.name)
        formData.append('user[self_introduction]', this.user.self_introduction)
        formData.append('user[date_of_birth]', this.user.date_of_birth)
        formData.append('user[sex]', this.user.sex)
        formData.append('user[game_id]', this.user.game_id)
        formData.append('user[platform]', this.user.platform)
        formData.append('user[kd]', this.user.kd)
        formData.append('user[highest_damage]', this.user.highest_damage)
        formData.append('user[favorite_weapons]', this.user.favorite_weapons)
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
      }
    },
    uploadSuccessful (res) {
      this.setToaster()
      this.$auth.login(res)
      this.$router.push(this.redirectPath)
      this.$store.dispatch('getBtnLoading', false)
    },
    setToaster () {
      const msg = 'プロフィール画像を更新しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    },
    changeKd (newVal) {
      this.user.kd = newVal
    }
  }
}
</script>
