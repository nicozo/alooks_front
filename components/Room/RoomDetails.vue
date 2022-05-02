<template>
  <v-card rounded-xl>
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
            <div />
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              ゲームモード：
            </div>
            <div />
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              ランク帯：
            </div>
            <div />
          </div>
          <div class="d-flex align-center py-3">
            <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
              募集時間：
            </div>
            <div>
              {{ room.application_deadline }}
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-btn
        color="success"
        class="mx-auto mb-6 pa-6"
      >
        参加リクエスト
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
  }
}
</script>
