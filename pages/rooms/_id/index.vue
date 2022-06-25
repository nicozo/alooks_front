<template>
  <v-container>
    <room-back-previous-page-button />

    <div class="text-h3 my-7 text-center">
      ホスト
    </div>
    <div class="d-flex align-center">
      <div v-if="room.user_avatar">
        <v-avatar
          size="100"
          class="flex-grow-0 mr-6"
        >
          <img :src="room.user_avatar" alt="プロフィール画像です">
        </v-avatar>
      </div>
      <div v-else>
        <v-avatar
          size="100"
          class="flex-grow-0 mr-6"
        >
          <img :src="defaultAvatarSrc" alt="プロフィール画像です">
        </v-avatar>
      </div>

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
  async asyncData ({ $axios, params, $auth }) {
    const room = await $axios.$get(
      'api/v1/rooms/' + params.id,
      // プリフライトリクエストの回避
      {
        headers: {
          Authorization: `Baerer ${$auth.token}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    )
    // console.log('部屋情報:', room)
    // console.log('募集主情報:', room.user)
    return { room }
  },
  data () {
    return {
      defaultAvatarSrc: require('@/static/DefaultAvatar.png')
    }
  }
}
</script>
