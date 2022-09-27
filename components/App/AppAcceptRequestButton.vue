<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          color="success"
          v-on="on"
        >
          {{ $t('btn.accept_request') }}
        </v-btn>
      </template>

      <v-card>
        <v-container>
          <v-card-title>
            <span class="text-h5">
              {{ $t('agreement.form.title') }}
            </span>
          </v-card-title>

          <v-row>
            <v-col
              cols="12"
            >
              <validation-provider
                v-slot="{ errors }"
                name="ひとこと"
                rules="required|max:25"
              >
                <v-text-field
                  v-model="message"
                  label="ひとこと"
                  counter="25"
                  :error-messages="errors"
                  required
                  placeholder="こちらこそよろしくお願いします！"
                />
              </validation-provider>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="red darken-1"
              text
              @click="closeDialog"
            >
              {{ $t('btn.cancel') }}
            </v-btn>

            <v-btn
              color="blue darken-1"
              text
              :loading="btnLoading"
              @click="accept(application)"
            >
              {{ $t('btn.submit') }}
            </v-btn>

            <!-- <v-dialog
              v-model="dialog2"
              persistent
              max-width="600px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="blue darken-1"
                  text
                  @click="accept(application)"
                >
                  {{ $t('btn.submit') }}
                </v-btn>
              </template>

              <v-card>
                <v-container>
                  <v-card-title class="justify-center">
                    <span class="text-h5">
                      {{ $t('agreement.accepted') }}
                    </span>
                  </v-card-title>

                  <v-row>
                    <v-col cols="12">
                      <v-card-text class="text-center">
                        <strong>{{ application.applicant.name }}</strong>
                        のリクエストを承認しました！
                      </v-card-text>

                      <v-card-text class="text-center">
                        以下のIDへフレンドリクエストを送信しよう！
                      </v-card-text>

                      <v-card-text class="text-h6 text-center">
                        <v-chip
                          color="primary"
                          dark
                          outlined
                        >
                          {{ application.applicant.platform }}
                        </v-chip>
                        {{ application.applicant.game_id }}
                      </v-card-text>
                    </v-col>
                  </v-row>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      color="success"
                      text
                      @click="closeDialog2"
                    >
                      {{ $t('btn.friend_requested') }}
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog> -->
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-container>
          <v-card-title class="justify-center">
            <span class="text-h5">
              {{ $t('agreement.accepted') }}
            </span>
          </v-card-title>

          <v-row>
            <v-col cols="12">
              <v-card-text class="text-center">
                <strong>{{ application.applicant.name }}</strong>
                のリクエストを承認しました！
              </v-card-text>

              <v-card-text class="text-center">
                以下のIDへフレンドリクエストを送信しよう！
              </v-card-text>

              <v-card-text class="text-h6 text-center">
                <v-chip
                  color="primary"
                  dark
                  outlined
                >
                  {{ application.applicant.platform }}
                </v-chip>
                {{ application.applicant.game_id }}
              </v-card-text>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer />

            <v-btn
              color="success"
              text
              @click="closeDialog2"
            >
              {{ $t('btn.friend_requested') }}
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppJoinRequestButton',
  props: {
    application: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  data () {
    return {
      dialog: false,
      dialog2: false,
      message: ''
    }
  },
  computed: {
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  methods: {
    async accept (application) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$post(
        '/api/v1/agreements',
        {
          agreement: {
            body: this.message,
            room_id: application.room_id,
            applicant_id: application.user_id
          },
          application_id: application.id
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      this.closeDialog()
      this.setToaster()
      this.openDialog2()
      this.$store.dispatch('getBtnLoading', false)
    },
    requestFailure ({ response }) {
      if (response && response.status === 400) {
        const msg = response.data.errors[0]

        this.$store.dispatch('getToast', { msg })
      }
      this.$store.dispatch('getBtnLoading', false)
    },
    closeDialog () {
      this.dialog = false
      this.message = ''
    },
    openDialog2 () {
      this.dialog2 = true
    },
    closeDialog2 () {
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
      this.dialog2 = false
    },
    setToaster () {
      const msg = '参加リクエストを承諾しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
