<template>
  <v-container>
    <room-back-previous-page-button />

    <div class="text-h3 my-7 text-center">
      ホスト
    </div>
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

    <div class="text-h3 my-7 text-center">
      募集内容
    </div>
    <v-sheet
      color="primary"
      max-width="1000"
      class="mx-auto"
    >
      <RoomDetails :room="room" />
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'RoomIdIndex',
  async asyncData ({ $axios, params }) {
    const room = await $axios.$get(
      'api/v1/rooms/' + params.id
    )
    return { room }
  }
}
</script>
