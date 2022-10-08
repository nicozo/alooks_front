<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col>
        <template v-if="isApplicationExist">
          <application-item
            :applications="applications"
            :auth-user="authUser"
            @child-request-method="requestApi"
            @child-read-method="read"
          />
        </template>

        <template v-else>
          <v-row
            justify="center"
            align-content="center"
          >
            <v-col>
              <v-card
                flat
                class="text-center"
              >
                <v-container>
                  <p>
                    {{ $t('message.no_requests') }}
                  </p>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SamplePage',
  layout: 'loggedIn',
  data () {
    return {
      authUser: this.$auth.user
    }
  },
  computed: {
    applications () {
      return this.$store.getters['applications/applications']
    },
    isApplicationExist () {
      return this.applications.length !== 0
    }
  },
  methods: {
    async requestApi (application) {
      try {
        await this.$game.getStats(application.applicant.game_id, application.applicant.platform)
      } catch (error) {
        console.log(error)
      }
    },
    async read (application) {
      await this.$axios.$patch(
        `api/v1/applies/${application.id}/read`
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => console.log(e))
    },
    requestSuccessful (res) {
      this.$store.dispatch('applications/getReadApplication', res)
    }
  }
}
</script>
