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
        <RoomItem :room="room"/>
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
