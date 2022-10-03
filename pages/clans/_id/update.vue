<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-card
        flat
        width="80%"
        max-width="900"
      >
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="updateClan">
            <v-container>
              <clan-form-name :name.sync="clan.name" />

              <clan-form-concept :concept.sync="clan.concept" />

              <clan-form-prohibited-matters :prohibited-matters.sync="clan.prohibited_matters" />

              <clan-form-joining-process :joining_process.sync="clan.joining_process" />

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
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ClanUpdatePage',
  middleware: ['clan-edit'],
  data () {
    return {
      clan: {
        name: '',
        concept: '',
        prohibited_matters: '',
        joining_process: '',
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
      },
      store_clan: this.$store.getters['clans/clan'],
      redirectPath: this.$store.state.loggedIn.clansPath
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  created () {
    this.clan = Object.assign({}, this.store_clan)
  },
  methods: {
    async updateClan () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$patch(
        `api/v1/clans/${this.clan.id}`,
        this.clan
      )
        .then(res => this.updateClanSuccessful(res))
        .catch(e => this.updateClanFailure(e))
    },
    updateClanSuccessful (res) {
      this.$store.dispatch('clans/updateClan', res)
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
      this.$router.push(this.redirectPath)
    },
    updateClanFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '編集できませんでした。入力間違いがないか確認してください。'

        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'クランを編集しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
