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
        max-width="900"
      >
        <v-card-text class="br pt-0">
          ここでは投稿したスクワッドメンバー掲示板を編集できます。
          さっそく以下のフォームを記入して、スクワッドメンバーを募集しよう！
        </v-card-text>
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="updateRoom">
            <v-container fluid>
              <room-form-title :title.sync="room.title" />

              <room-form-platform :platform.sync="room.platform" />

              <room-form-game-mode :game-mode.sync="room.game_mode" />

              <room-form-rank-tier :rank-tier.sync="room.rank_tier" />

              <room-form-application-deadline :application-deadline.sync="room.application_deadline" />

              <room-form-recruitment-number :recruitment-number.sync="room.recruitment_number" />

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
                    {{ $t('btn.update') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </validation-observer>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RoomUpdatePage',
  middleware: [
    'authentication',
    'room-edit'
  ],
  data () {
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
      storeRoom: this.$store.getters['rooms/room'],
      redirectPath: this.$store.state.loggedIn.homePath
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  created () {
    this.copyRoom()
  },
  methods: {
    async updateRoom () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `api/v1/rooms/${this.room.id}`,
        this.room
      )

        .then(res => this.updateRoomSuccessful(res))
        .catch(e => this.updateRoomFailure(e))
    },
    updateRoomSuccessful () {
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$router.push(this.redirectPath)
    },
    updateRoomFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '編集できませんでした。入力間違いがないか確認してください。'

        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'スクワッドを編集しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    },
    resetApplicationDeadline () {
      this.room.application_deadline = null
    },
    copyRoom () {
      this.room = Object.assign({}, this.storeRoom)
      this.resetApplicationDeadline()
    }
  }
}
</script>
