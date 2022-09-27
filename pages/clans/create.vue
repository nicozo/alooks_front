<template>
  <v-container>
    <v-row>
      <v-col>
        <clan-back-previous-button />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          flat
        >
          <validation-observer v-slot="{ invalid }">
            <form @submit.prevent="recruit">
              <v-container>
                <clan-form-name :name.sync="clan.name" />

                <clan-form-concept :concept.sync="clan.concept" />

                <clan-form-prohibited-matters :prohibited_matters.sync="clan.prohibited_matters" />

                <clan-form-interview :interview.sync="clan.interview" />

                <v-card-title>
                  {{ $t('clan.requirements') }}
                </v-card-title>

                <v-card-subtitle>
                  クランに入るための条件を設定しましょう！
                </v-card-subtitle>

                <clan-form-platform :platform.sync="clan.platform" />

                <clan-form-age :age.sync="clan.age" />

                <clan-form-required-login :required-login.sync="clan.required_login" />

                <clan-form-required-ranked :required-ranked.sync="clan.required_ranked" />

                <clan-form-required-vc :required-vc.sync="clan.required_vc" />

                <clan-form-personality :personality.sync="clan.personality" />

                <v-card-title>
                  {{ $t('clan.information') }}
                </v-card-title>

                <v-card-subtitle>
                  現在のクラン情報を設定しましょう！
                </v-card-subtitle>

                <clan-form-enrollment :enrollment.sync="clan.enrollment" />

                <clan-form-enrollment-age :enrollment-age.sync="clan.enrollment_age" />

                <clan-form-activity-time :activity-time.sync="clan.activity_time" />

                <clan-form-snipe :snipe.sync="clan.snipe" />

                <clan-form-contact-means :contact-means.sync="clan.contact_means" />

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ClansCreatePage',
  data () {
    return {
      clan: {
        name: '',
        concept: '',
        prohibited_matters: '',
        interview: '',
        platform: '',
        age: '',
        required_login: '',
        required_ranked: '',
        required_vc: true,
        personality: '',
        enrollment: '',
        enrollment_age: '',
        activity_time: '',
        snipe: '',
        contact_means: ''
      }
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async recruit () {
      if (!this.invalid) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/clans',
          this.clan
        )
          .then(res => this.recruitSuccessful(res))
          .catch(e => this.recruitFailure(e))
      }
    },
    recruitSuccessful (res) {
      console.log(res)
      this.$store.dispatch('getBtnLoading', false)
    },
    recruitFailure ({ response }) {
      console.log(response)
      this.$store.dispatch('getBtnLoading', false)
    },
    setToaster () {
      const msg = 'クランを投稿しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
