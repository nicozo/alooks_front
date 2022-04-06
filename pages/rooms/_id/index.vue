<template>
  <v-container>
    <div class="d-flex align-center">
      <v-avatar
        color="orange"
        size="150"
        class="flex-grow-0 mr-6"
      >
        <span class="white--text text-h5">
          アバター
        </span>
      </v-avatar>

      <v-card
        height="200"
        width="600"
        color="red"
        class="flex-grow-1"
      >
        簡易戦績が入る
      </v-card>
    </div>

    <v-sheet
      color="primary"
      max-width="1000"
      class="mx-auto my-8"
    >
      <v-card
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
                <div></div>
              </div>
              <div class="d-flex align-center py-3">
                <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
                  ゲームモード：
                </div>
                <div></div>
              </div>
              <div class="d-flex align-center py-3">
                <div class="text-subtitle-1 font-weight-bold text-right" style="width: 150px">
                  ランク帯：
                </div>
                <div></div>
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
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'RoomIdIndex',
  async asyncData ({ $axios, params }) {
    console.log(params)
    const room = await $axios.$get(
      'api/v1/rooms/' + params.id
    )
    return { room }
  }
}
</script>
