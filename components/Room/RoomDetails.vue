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
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              プラットフォーム：
            </div>
            <div>
              {{ room.platform }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              ゲームモード：
            </div>
            <div>
              {{ room.game_mode }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              ランク帯：
            </div>
            <div>
              {{ room.rank_tier }}
            </div>
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              募集期間：
            </div>
            <div>
              {{ formattedDate }}
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
        参加リクエスト
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'

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
