<template>
  <v-container>
    <v-row>
      <v-col>
        <clan-back-previous-button />
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
          ここではクランメンバーを募集するための掲示板を作成できます。
          さっそく以下のフォームを記入して、クランメンバーを募集しよう！
        </v-card-text>

        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="recruit">
            <v-container>
              <clan-form-name :name.sync="clan.name" />

              <clan-form-concept :concept.sync="clan.concept" />

              <clan-form-prohibited-matters :prohibited-matters.sync="clan.prohibited_matters" />

              <clan-form-joining-process :joining-process.sync="clan.joining_process" />

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
  name: 'ClansCreatePage',
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
      redirectPath: this.$store.state.loggedIn.clansPath
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
      this.$store.dispatch('clans/addClan', res)
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
      this.$router.push(this.redirectPath)
    },
    recruitFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = '投稿に失敗しました'

        return this.$store.dispatch('getToast', { msg })
      }
    },
    setToaster () {
      const msg = 'クランを投稿しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>

<style scoped>
  .br{
    white-space: pre-line;
  }
</style>
