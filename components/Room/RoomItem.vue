<template>
  <v-card
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
            参加中：{{ room.current_squad_member }}人
          </v-chip>
        </div>
        <v-card-title>
          {{ room.title }}
        </v-card-title>
        <v-card-text>
          プラットフォーム：{{ room.platform.name }}
        </v-card-text>
        <v-card-text>
          ゲームモード：{{ room.game_mode.name }}
        </v-card-text>
        <v-card-text>
          ランク帯：{{ room.rank_tier.name }}
        </v-card-text>
        <v-card-text>
          募集時間：{{ room.application_deadline }}
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="success"
            class="ml-auto"
          >
            参加リクエスト
          </v-btn>
        </v-card-actions>
      </div>
    </div>
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
      current_squad_member: {
        type: Number,
        required: true
      },
      application_deadline: {
        type: Date,
        required: true
      }
    }
  }
}
</script>