<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-card flat>
          <form
            id="search-form"
            @submit.prevent
          >
            <v-container>
              <room-form-search-keyword :keyword.sync="search.keyword" />

              <room-form-search-platform :platform.sync="search.platform" />

              <room-form-search-game-mode :game-mode.sync="search.game_mode" />

              <room-form-search-rank-tier :rank-tier.sync="search.rank_tier" />

              <v-checkbox
                v-model="search.opening"
                label="募集中のみ表示"
              />
            </v-container>
          </form>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(room, i) in displayRooms"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <RoomItem
          :room="room"
          :applications="applications"
        />
      </v-col>

      <v-tooltip
        left
        color="primary"
      >
        <template #activator="{ on, attrs }">
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
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <span>{{ $t('pages.rooms-create') }}</span>
      </v-tooltip>
    </v-row>

    <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          :length="pageLength"
          @input="setPageNumber"
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

    const applications = await $axios.$get(
      'api/v1/applies/my_applications'
    )

    // console.log('部屋情報:', rooms)
    // console.log('参加リクエスト一覧:', applications)

    return { rooms, applications }
  },
  data () {
    return {
      page: 1,
      pageSize: 12,
      pageNumber: 0,
      search: {
        keyword: '',
        platform: '',
        game_mode: '',
        rank_tier: '',
        opening: ''
      }
    }
  },
  computed: {
    filteredRooms () {
      const rooms = []

      for (const i in this.rooms) {
        const room = this.rooms[i]
        if (room.title.includes(this.search.keyword) &&
            room.platform.includes(this.search.platform) &&
            room.game_mode.includes(this.search.game_mode) &&
            room.rank_tier.includes(this.search.rank_tier)
        ) {
          if (this.search.opening) {
            if (this.isOpening(room.application_deadline)) {
              rooms.push(room)
            }
          } else {
            rooms.push(room)
          }
        }
      }
      return rooms
    },
    pageLength () {
      return Math.ceil(this.filteredRooms.length / this.pageSize)
    },
    displayRooms () {
      this.returnTop()
      return this.pageNumber !== 0 ? this.filteredRooms.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.filteredRooms.slice(0, this.pageSize)
    }
  },
  methods: {
    setPageNumber (number) {
      this.pageNumber = number
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
    isOpening (roomDeadline) {
      const now = new Date()
      const deadline = this.$dayjs(roomDeadline).$d
      return now < deadline
    }
  }
}
</script>
