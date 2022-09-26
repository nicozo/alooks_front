<template>
  <v-card
    :id="'room' + room.id"
    rounded-xl
  >
    <v-list
      max-width="900"
      class="mx-auto"
    >
      <!-- Todo: v-forで省略できないか検討 -->
      <v-list-item>
        <v-list-item-content>
          <div class="text-h4">
            {{ room.title }}
          </div>
          <div class="d-flex align-center py-3">
            <div
              class="text-subtitle-1 font-weight-bold text-right"
              style="width: 150px"
            >
              {{ $t('room.platform.title') }}：
            </div>
            <div>
              {{ $t(`room.platform.${room.platform}`) }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div
              class="text-subtitle-1 font-weight-bold text-right"
              style="width: 150px"
            >
              {{ $t('room.game_mode.title') }}：
            </div>
            <div>
              {{ $t(`room.game_mode.${room.game_mode}`) }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div
              class="text-subtitle-1 font-weight-bold text-right"
              style="width: 150px"
            >
              {{ $t('room.rank_tier.title') }}：
            </div>
            <div>
              {{ $t(`room.rank_tier.${room.rank_tier}`) }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div
              class="text-subtitle-1 font-weight-bold text-right"
              style="width: 150px"
            >
              {{ $t('room.rank_tier') }}：
            </div>
            <div>
              {{ timeToDeadline }}
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn
        color="success"
        class="mx-auto mb-6 pa-6"
        :disabled="invalid"
      >
        {{ $t('btn.invitation_request') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RoomDetails',
  props: {
    room: {
      type: Object,
      default: () => {},
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      current_squad_member: {
        type: Number,
        required: true
      },
      application_deadline: {
        type: Date,
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
    }
  }
}
</script>
