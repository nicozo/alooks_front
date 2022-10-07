<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        :id="`room-${room.id}-btn`"
        v-bind="attrs"
        color="success"
        class="mb-3"
        block
        :disabled="invalid"
        v-on="on"
      >
        {{ $t('btn.invitation_request') }}
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">
            {{ $t('application.form.title') }}
          </span>
        </v-card-title>

        <v-row>
          <v-col
            cols="12"
          >
            <validation-provider
              v-slot="{ errors }"
              name="リクエストメッセージ"
              rules="required|max:25"
            >
              <v-text-field
                v-model="message"
                label="リクエストメッセージ"
                counter="25"
                :error-messages="errors"
                required
                placeholder="よろしくお願いします！"
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
            @click="apply(room)"
          >
            {{ $t('btn.submit') }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

    <app-guide-profile :profile-dialog.sync="profileDialog" />
  </v-dialog>
</template>

<script>
export default {
  name: 'AppJoinRequestButton',
  props: {
    room: {
      type: Object,
      default: () => {},
      require: true
    },
    authUser: {
      type: Object,
      default: () => {},
      require: true
    },
    invalid: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data () {
    return {
      dialog: false,
      message: '',
      profileDialog: false
    }
  },
  computed: {
    myApplications () {
      return this.$store.getters['applications/myApplications']
    },
    isAlreadyAppliedFor () {
      const result = this.myApplications.find(myApplication =>
        myApplication.room_id === this.room.id &&
        myApplication.user_id === this.authUser.id &&
        myApplication.host_id === this.room.user_id
      )

      return result
    },
    btnLoading () {
      return this.$store.getters.btnLoading
    }
  },
  mounted () {
    this.appliedForThis()
    this.isMyRoom()
  },
  methods: {
    async apply () {
      console.log('Join Request')

      if (this.$auth.profileCompleted()) {
        this.$store.dispatch('getBtnLoading', true)

        await this.$axios.$post(
          'api/v1/applies',
          {
            apply: {
              body: this.message,
              room_id: this.room.id
            }
          }
        )
          .then(res => this.requestSuccessful(res))
          .catch(e => this.requestFailure(e))
      } else {
        this.profileDialog = true
        const msg = 'まずはプロフィールを完成させましょう！'
        return this.$store.dispatch('getToast', { msg })
      }
    },
    requestSuccessful (res) {
      // console.log('res', res)
      this.$store.dispatch('applications/getMyApplication', res)
      this.appliedForThis()
      this.closeDialog()
      this.setToaster()
      this.$store.dispatch('getBtnLoading', false)
    },
    requestFailure ({ response }) {
      this.$store.dispatch('getBtnLoading', false)
      if (response && response.status === 400) {
        const msg = response.data.errors[0]

        return this.$store.dispatch('getToast', { msg })
      }
    },
    closeDialog () {
      this.dialog = false
      this.message = ''
    },
    closeProfileDialog () {
      this.profileDialog = false
    },
    appliedForThis () {
      if (this.isAlreadyAppliedFor) {
        const applyBtn = document.getElementById(`room-${this.room.id}-btn`)

        applyBtn.classList.add('v-btn--disabled')
        applyBtn.getElementsByClassName('v-btn__content')[0].innerText = 'リクエスト済み'
      }
    },
    roomIsOwn () {
      return this.authUser.id === this.room.user_id
    },
    isMyRoom () {
      if (this.roomIsOwn()) {
        const applyBtn = document.getElementById(`room-${this.room.id}-btn`)

        applyBtn.classList.add('v-btn--disabled')
      }
    },
    setToaster () {
      const msg = '参加リクエストを送信しました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
