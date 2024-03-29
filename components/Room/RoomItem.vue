<template>
  <v-card
    :id="`room-${room.id}`"
    rounded-xl
    hover
    raised
  >
    <room-item-overlay :application-deadline="room.application_deadline" />

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
              <img :src="defaultAvatarSrc" alt="プロフィール画像です">
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
            {{ timeToDeadline }}
          </v-chip>
        </v-card-text>
      </v-container>
    </v-card>

    <v-card-actions>
      <template v-if="roomIsOwn()">
        <room-edit-and-delete-button
          :id="room.id"
          :invalid="invalid"
          @child-delete-method="childDeleteMethod"
        />
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
      timeToDeadline: '',
      invalid: false,
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
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
    },
    replaceFormat (str) {
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
    roomIsOwn () {
      return this.authUser.id === this.room.user_id
    },
    childDeleteMethod (roomId) {
      this.$emit('child-delete-method', roomId)
    }
  }
}
</script>
