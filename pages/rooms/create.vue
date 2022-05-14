<template>
  <v-container>
    <room-back-previous-page-button />

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
                  >
                    募集する
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
  name: 'RoomsCreatePage',
  data ({ $route }) {
    return {
      room: {
        title: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        application_deadline: '',
        recruitment_number: '',
        is_draft: false
      },
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  },
  methods: {
    recruit () {
      // if (!this.invalid) {
      //   await this.$axios.$post(
      //     'api/v1/rooms', { room: this.room }
      //   )
      // }
      console.log(this.room)
    }
  }
}
</script>
