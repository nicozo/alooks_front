<template>
  <v-card
    :id="'room' + room.id"
    rounded-xl
    hover
    raised
    :to="`rooms/${room.id}`"
  >
    <div class="d-flex justify-space-around align-center py-6 px-6">
      <div class="flex-grow-0 mr-6">
        <v-avatar
          color="orange"
          size="100"
        >
          <span class="white--text text-h5">100</span>
        </v-avatar>
      </div>

      <div class="flex-grow-1">
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
          募集期間：{{ formattedDate }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="success"
            class="ml-auto"
            :disabled="invalid"
          >
            参加リクエスト
          </v-btn>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'

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
      formattedDate: '',
      invalid: false
    }
  },
  mounted () {
    this.changeDateFormat()
  },
  methods: {
    changeDateFormat () {
      const railsDate = this.room.application_deadline
      const momentDate = moment(railsDate)
      const momentDateFormatted = momentDate.fromNow()
      this.formattedDate = this.replaceFormat(momentDateFormatted)
      // console.log('moment.jsから取得した時刻:', momentDate)
      // console.log('moment.jsから取得した時刻:', momentDateFormatted)
      // console.log('文字の変換テスト:', momentDateFormatted.replace('後', 'で締め切り'))
      // console.log(this.formattedDate)
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
