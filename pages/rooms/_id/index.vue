<template>
  <v-container>
    <div class="d-flex align-center">
      <v-avatar
        color="orange"
        size="150"
        class="flex-grow-0 mr-6"
      >
        <span class="white--text text-h5">アバター</span>
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
        <v-list-item width="100%">
          <v-list-item-content>
            <v-list-item-title>
              {{ room.title }}
            </v-list-item-title>
            <v-list-item-title>
              プラットフォーム：
            </v-list-item-title>
            <v-list-item-title>
              ゲームモード：
            </v-list-item-title>
            <v-list-item-title>
              ランク帯：
            </v-list-item-title>
            <v-list-item-title>
              募集時間：{{ room.application_deadline }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-sheet>

    <v-btn
      color="success"
      class="ml-auto"
    >
      参加リクエスト
    </v-btn>
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
