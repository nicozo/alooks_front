<template>
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
              name="一言メッセージ"
              rules="required|max:25"
            >
              <v-text-field
                v-model="message"
                label="一言メッセージ"
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
            @click="accept(application)"
          >
            {{ $t('btn.submit') }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
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
      message: ''
    }
  },
  methods: {
    async accept (application) {
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
    },
    requestFailure ({ response }) {
      if (response && response.status === 400) {
        const msg = response.data.errors[0]

        this.$store.dispatch('getToast', { msg })
      }
    },
    closeDialog () {
      this.dialog = false
      this.message = ''
    },
    setToaster () {
      const msg = '参加リクエストを承諾しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
