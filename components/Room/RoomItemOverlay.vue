<template>
  <div v-show="isRoomClosing(applicationDeadline)">
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
</template>

<script>
export default {
  name: 'RoomItemOverlay',
  props: {
    applicationDeadline: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    isRoomClosing (roomDeadline) {
      if (roomDeadline) {
        const now = new Date()
        const deadline = this.$dayjs(roomDeadline).$d
        return deadline < now
      } else {
        return true
      }
    }
  }
}
</script>
