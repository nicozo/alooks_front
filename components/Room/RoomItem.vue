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
      :to="`rooms/${room.id}`"
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
              <img :src="defaultAvatarSrc" alt="プロフィール画像です">
            </v-avatar>
          </template>
        </v-layout>

        <v-card-text>
          {{ $t('room.platform') }}：{{ room.platform }}
        </v-card-text>
        <v-card-text>
          {{ $t('room.game_mode') }}：{{ room.game_mode }}
        </v-card-text>
        <v-card-text>
          {{ $t('room.rank_tier') }}：{{ room.rank_tier }}
        </v-card-text>
        <v-card-text>
          {{ $t('room.application_deadline') }}：{{ timeToDeadline }}
        </v-card-text>
      </v-container>
    </v-card>

    <v-card-actions>
      <app-join-request-button
        :room="room"
        :auth-user="authUser"
        :invalid="invalid"
      />
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
    }
  },
  data () {
    return {
      timeToDeadline: '',
      invalid: false
    }
  },
  computed: {
    defaultAvatarSrc () {
      return this.$store.getters.defaultAvatarSrc
    },
    authUser () {
      return this.$auth.user
    }
  },
  mounted () {
    this.changeDateFormat()
  },
  methods: {
    changeDateFormat () {
      const roomDeadline = this.room.application_deadline
      const minutesToDeadline = this.$dayjs(roomDeadline).fromNow()
      this.timeToDeadline = this.replaceFormat(minutesToDeadline)
      console.log('締め切り', this.timeToDeadline)
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
      const now = new Date()
      const deadline = this.$dayjs(roomDeadline).$d
      return deadline < now
    }
  }
}
</script>
