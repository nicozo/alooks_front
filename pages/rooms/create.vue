<template>
  <v-container>
    <v-row>
      <v-col>
        <room-back-previous-page-button />
      </v-col>
    </v-row>

    <v-row
      align="center"
      justify="center"
    >
      <v-card
        flat
        width="80%"
        max-width="400"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="recruit">
            <v-container fluid>
              <room-form-title :title.sync="room.title" />

              <room-form-platform :platform.sync="room.platform" />

              <room-form-rank-tier :rank-tier.sync="room.rank_tier" />

              <room-form-application-deadline :application-deadline.sync="room.application_deadline" />

              <room-form-recruitment-number :recruitment-number.sync="room.recruitment_number" />

              <room-form-game-mode :game-mode.sync="room.game_mode" />

              <!-- TODO 下書き機能 -->
              <!-- <v-switch
                v-model="switch1"
                :label="`Switch 1: ${switch1.toString()}`"
              ></v-switch> -->

              <v-row>
                <v-col>
                  <v-btn
                    type="submit"
                    block
                    color="primary"
                    :disabled="invalid"
                    :loading="btnLoading"
                  >
                    {{ $t('btn.create') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-row>

    <app-guide-profile :profile-dialog.sync="profile_dialog" />
  </v-container>
</template>

<script>
export default {
  name: 'RoomsCreatePage',
  data ({ $route }) {
    return {
      room: {
        title: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        application_deadline: null,
        recruitment_number: null,
        is_draft: false
      },
      redirect_path: this.$store.state.loggedIn.rememberPath,
      pageTitle: this.$t(`pages.${$route.name}`),
      profile_dialog: false
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async recruit () {
      if (!this.invalid && this.$auth.profileCompleted()) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/rooms',
          { room: this.room }
        )
          .then(res => this.recruitSuccessful(res))
          .catch(e => this.recruitFailure(e))
      } else {
        this.profile_dialog = true
        const msg = 'まずはプロフィールを完成させましょう！'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    recruitSuccessful (res) {
      // console.log('作成されたroomオブジェクト', res)
      this.$router.push(this.redirect_path)
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    recruitFailure ({ response }) {
      if (response && response.status === 400) {
        const msg = '投稿に失敗しました'
        return this.$store.dispatch('getToast', { msg })
      }
      this.$store.dispatch('getBtnLoading', false)
    },
    setToaster () {
      const msg = 'スクワッドを投稿しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
