<template>
  <v-container
    fluid
    fill-height
  >
    <v-row>
      <v-col
        v-for="(room, i) in rooms"
        :key="i"
        cols="6"
      >
        <v-card
          rounded-xl
          hover
          raised
          to="/"
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
              <v-card-title>
                {{ room.title }}
              </v-card-title>

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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RoomsIndex',
  async asyncData ({ $axios }) {
    const rooms = await $axios.$get(
      'api/v1/rooms'
    )
    return { rooms }
  }
}
</script>
