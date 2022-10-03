<template>
  <v-card
    :id="`room-${room.id}`"
    rounded-xl
    hover
    raised
  >
    <div v-show="isRoomClosing(room.application_deadline)">
      <v-overlay
        absolute
        opacity="0.9"
        z-index="2"
      >
        <v-card-text class="font-weight-bold">
          {{ $t('message.now_closed') }}
        </v-card-text>
      </v-overlay>
    </div>

    <v-card
      flat
      nuxt
      :to="{ name: 'rooms-id', params: { id: room.id } }"
    >
      <v-container>
        <div class="text-right">
          <v-chip
            color="red"
            dark
          >
            あと{{ room.recruitment_number }}人募集
          </v-chip>
        </div>

        <v-card-title>
          {{ room.title }}
        </v-card-title>

        <v-divider />

        <v-layout justify-center>
          <template v-if="room.host.avatar_url">
            <v-avatar size="100" class="my-4">
              <img :src="room.host.avatar_url" alt="プロフィール画像です">
            </v-avatar>
          </template>
          <template v-else>
            <v-avatar size="100" class="my-4">
              <img :src="default_avatar_src" alt="プロフィール画像です">
            </v-avatar>
          </template>
        </v-layout>

        <v-card-text>
          {{ $t('room.platform.title') }}：
          <v-chip
            color="indigo darken-3"
            dark
            outlined
          >
            {{ $t(`room.platform.${room.platform}`) }}
          </v-chip>
        </v-card-text>

        <v-card-text>
          {{ $t('room.game_mode.title') }}：
          <v-chip
            color="deep-orange darken-3"
            dark
            outlined
          >
            {{ $t(`room.game_mode.${room.game_mode}`) }}
          </v-chip>
        </v-card-text>

        <v-card-text>
          {{ $t('room.rank_tier.title') }}：
          <v-chip
            color="teal darken-3"
            dark
            outlined
          >
            {{ $t(`room.rank_tier.${room.rank_tier}`) }}
          </v-chip>
        </v-card-text>

        <v-card-text>
          {{ $t('room.application_deadline') }}：
          <v-chip
            color="pink darken-3"
            dark
            outlined
          >
            {{ time_to_deadline }}
          </v-chip>
        </v-card-text>
      </v-container>
    </v-card>

    <v-card-actions>
      <template v-if="roomIsOwn()">
        <v-row dense>
          <v-col cols="12">
            <v-btn
              color="success"
              block
              nuxt
              :to="{ name: 'rooms-id-update', params: { id: room.id } }"
            >
              {{ $t('btn.room_edit') }}
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="error"
              block
              @click="deleteRoom"
            >
              {{ $t('btn.room_destroy') }}
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <app-join-request-button
          :room="room"
          :auth-user="authUser"
          :invalid="invalid"
        />
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RoomItem',
  props: {
    room: {
      type: Object,
      default: () => {},
      required: true,
      id: {
        type: Number,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      recruitment_number: {
        type: Number,
        required: true
      },
      application_deadline: {
        type: Date,
        required: true
      },
      host: {
        type: Object,
        default: () => {},
        required: true
      }
    },
    authUser: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      time_to_deadline: '',
      invalid: false,
      default_avatar_src: this.$store.getters.defaultAvatarSrc
    }
  },
  mounted () {
    this.changeDateFormat()
  },
  methods: {
    changeDateFormat () {
      const roomDeadline = this.room.application_deadline
      const minutesToDeadline = this.$dayjs(roomDeadline).fromNow()
      this.time_to_deadline = this.replaceFormat(minutesToDeadline)
    },
    replaceFormat (str) {
      // console.log('渡された文字列', str)
      if (str.includes('後')) {
        str = str.replace('後', '後に締め切り')
      } else {
        str = '締め切りました'
        this.isInvalid()
      }
      return str
    },
    isInvalid () {
      this.invalid = true
    },
    isRoomClosing (roomDeadline) {
      if (roomDeadline) {
        const now = new Date()
        const deadline = this.$dayjs(roomDeadline).$d
        return deadline < now
      } else {
        return true
      }
    },
    roomIsOwn () {
      return this.authUser.id === this.room.user_id
    },
    async deleteRoom () {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/rooms/${this.room.id}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
    },
    setToaster () {
      const msg = 'クランを削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
