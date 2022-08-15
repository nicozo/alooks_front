<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :id="`room-${room.id}-btn`"
        v-bind="attrs"
        v-on="on"
        color="success"
        class="ml-auto"
        :disabled="invalid"
        >
        {{ $t('btn.invitation_request') }}
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-card-title>
          <span class="text-h5">
            リクエストフォーム
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
            @click="apply(room)"
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
    room: {
      type: Object,
      default: () => {},
      require: true
    },
    myApplications: {
      type: Array,
      default: () => [],
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
  mounted () {
    this.appliedForThis()
    this.isMyRoom()
  },
  data () {
    return {
      dialog: false,
      message: ''
    }
  },
  methods: {
    async apply () {
      console.log('Join Request')

      await this.$axios.$post(
        'api/v1/applies',
        {
          apply: {
            body: this.message,
            user_id: this.authUser.id,
            room_id: this.room.id
          }
        }
      )
        .then(res => this.requestSuccessful(res))
        .catch(e => this.requestFailure(e))
    },
    requestSuccessful (res) {
      console.log('res', res)
      this.appliedForThis()
      this.closeDialog()
      this.setToaster()
    },
    requestFailure ({ response }) {
      if (response && response.status === 400) {
        const msg = '参加リクエストに失敗しました'

        return this.$store.dispatch('getToast', { msg })
      }
      console.log(response)
    },
    closeDialog () {
      this.dialog = false
      this.message = ''
    },
    appliedForThis () {
      if (this.isAlreadyAppliedFor()) {
        const applyBtn = document.getElementById(`room-${this.room.id}-btn`)

        applyBtn.classList.add('v-btn--disabled')
        applyBtn.getElementsByClassName('v-btn__content')[0].innerText = 'リクエスト済み'
      }
    },
    isAlreadyAppliedFor () {
      const result = this.myApplications.find(myApplication =>
        myApplication.room_id === this.room.id &&
        myApplication.user_id === this.authUser.id &&
        myApplication.host_id === this.room.user_id
      )

      return result
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
      const msg = '参加リクエストしました'
      const color = 'success'
      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
