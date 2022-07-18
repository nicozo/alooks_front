<template>
  <v-card
    :id="`room-${room.id}`"
    rounded-xl
    hover
    raised
    nuxt
    :to="`rooms/${room.id}`"
  >
    <div v-show="isRoomClosing(room.application_deadline)">
      <v-overlay
        absolute
        opacity="0.9"
        z-index="2"
      >
        <v-card-text class="font-weight-bold">
          募集を締め切りました
        </v-card-text>
      </v-overlay>
    </div>

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

      <v-divider></v-divider>

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
        プラットフォーム：{{ room.platform }}
      </v-card-text>
      <v-card-text>
        ゲームモード：{{ room.game_mode }}
      </v-card-text>
      <v-card-text>
        ランク帯：{{ room.rank_tier }}
      </v-card-text>
      <v-card-text>
        募集期間：{{ timeToDeadline }}
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="success"
          class="ml-auto"
          @click.once="request()"
          :disabled="invalid"
        >
          参加リクエスト
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'RoomItem',
  props: {
    room: {
      type: Object,
      default: () => {},
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
      invalid: false,
      defaultAvatarSrc: require('@/static/DefaultAvatar.png')
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
      // console.log('渡された文字列', str)
      if (str.includes('後')) {
        str = str.replace('後', 'で締め切り')
      } else {
        str = '締め切りました'
        this.isInvalid()
      }
      return str
    },
    isInvalid () {
      this.invalid = true
    },
    request () {
      const requestBtn = event.currentTarget
      requestBtn.classList.add('v-btn--disabled')
      requestBtn.getElementsByClassName('v-btn__content')[0].innerText = 'リクエスト済み'
      alert('りくえすとしたよ！')
    },
    isRoomClosing (roomDeadline) {
      return roomDeadline < new Date()
    }
  }
}
</script>
