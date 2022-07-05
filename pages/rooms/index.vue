<template>
  <v-container>
    <v-row>
      <v-col align="end">
        <v-btn
          color="success"
          class="pa-5"
          to="/rooms/create"
        >
          <v-icon class="mr-2">
            mdi-human-greeting-variant
          </v-icon>
          スクワッドを募集する
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(room, i) in displayRooms"
        :key="i"
        cols="6"
      >
        <RoomItem :room="room" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          :length="length"
          @input="pageChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RoomsIndexPage',
  async asyncData ({ $axios, $auth }) {
    const rooms = await $axios.$get(
      'api/v1/rooms'
    )
    // console.log('部屋情報:', rooms)
    return { rooms }
  },
  data () {
    return {
      page: 1,
      length: 0,
      pageSize: 10,
      displayRooms: []
    }
  },
  mounted () {
    this.length = Math.ceil(this.rooms.length / this.pageSize)
    this.displayRooms = this.rooms.slice(0, this.pageSize)
  },
  methods: {
    pageChange (pageNumber) {
      this.displayRooms = this.rooms.slice(this.pageSize * (pageNumber - 1), this.pageSize * pageNumber)
      this.returnTop()
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
