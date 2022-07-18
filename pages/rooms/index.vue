<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
        v-for="(room, i) in rooms"
        :key="i"
      >
        <RoomItem :room="room" />
      </v-col>

      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          right
          fab
          style="z-index: 10;"
          nuxt
          to="/rooms/create"
          x-large
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
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
  async asyncData ({ $axios }) {
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
