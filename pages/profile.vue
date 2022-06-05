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
    {{ this.user.avatar_url }}
      <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="updateProfile">
          <v-container fluid>

            <v-row>
              <v-col>
                <validation-provider
                  v-slot="{errors}"
                  name="プロフィール画像"
                  rules="required|image"
                >
                  <v-file-input
                    id="avatar"
                    v-model="user.avatar_url"
                    label="プロフィール画像"
                    accept="image/png, image/jpeg"
                    :error-messages="errors"
                    outlined
                    required
                  />
                </validation-provider>
              </v-col>
            </v-row>

            <user-form-name :name.sync="user.name" />

            <user-form-self-introduction :self-introduction.sync="user.self_introduction" />

            <user-form-date-of-birth :date-of-birth.sync="user.date_of_birth" />

            <user-form-sex :sex.sync="user.sex" />

            <user-form-game-id :game-id.sync="user.game_id" />
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
  name: 'ProfilePage',
  layout: 'loggedIn',
  data () {
    return {
      user: {
        name: '',
        self_introduction: '',
        date_of_birth: '',
        sex: '',
        game_id: '',
        avatar_url: ''
      }
    }
  },
  computed: {
    authUser () {
      console.log(this.$auth.user)
      return this.$auth.user
    }
  },
  created () {
    this.user = Object.assign({}, this.authUser)
  },
  methods: {
    async updateProfile () {
      const formData = new FormData()
      formData.append('user[name]', this.user.name)
      formData.append('user[self_introduction]', this.user.self_introduction)
      formData.append('user[date_of_birth]', this.user.date_of_birth)
      formData.append('user[sex]', this.user.sex)
      formData.append('user[game_id]', this.user.game_id)
      formData.append('user[avatar]', this.user.avatar_url)
      console.log(...formData.entries())

      await this.$axios.$patch(`/api/v1/profile/${this.authUser.id}`, formData)
        .then(res => this.$store.dispatch('getAuthUser', res))
        .catch(e => console.log(e))
    }
  }
}
</script>
