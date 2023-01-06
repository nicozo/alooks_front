<template>
  <v-container>
    <v-row dense>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t('search_title') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <form id="search-form">
                <v-container>
                  <room-form-search-keyword :keyword.sync="search.keyword" />

                  <room-form-search-platform :platform.sync="search.platform" />

                  <room-form-search-game-mode :game-mode.sync="search.game_mode" />

                  <room-form-search-rank-tier :rank-tier.sync="search.rank_tier" />

                  <v-checkbox
                    v-model="search.opening"
                    label="募集中のみ表示"
                  />

                  <v-row
                    dense
                    justify="end"
                  >
                    <v-btn
                      color="error"
                      @click="uncheck"
                    >
                      {{ $t('btn.uncheck') }}
                    </v-btn>
                  </v-row>
                </v-container>
              </form>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row>
      <template v-if="displayRoomsExist">
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
            :auth-user="authUser"
            @child-delete-method="deleteRoom"
          />
        </v-col>
      </template>

      <template v-else>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-card
              flat
              class="text-center"
            >
              <v-container>
                <v-card-text>
                  {{ $t('message.no_rooms') }}
                </v-card-text>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </template>

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
              :to="{ name: 'rooms-create' }"
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-fab-transition>
        </template>

        <span>
          {{ $t('pages.rooms-create') }}
        </span>
      </v-tooltip>
    </v-row>

    <v-row dense>
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
  middleware: ['rooms'],
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
      },
      authUser: this.$auth.user
    }
  },
  computed: {
    rooms () {
      return this.$store.getters['rooms/rooms']
    },
    pageLength () {
      return Math.ceil(this.filteredRooms.length / this.pageSize)
    },
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
    displayRooms () {
      this.returnTop()

      return this.pageNumber !== 0 ? this.filteredRooms.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.filteredRooms.slice(0, this.pageSize)
    },
    displayRoomsExist () {
      return this.displayRooms.length !== 0
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
    },
    uncheck () {
      // Todo チェックを外した後、同じラジオボタンをクリックできない。
      const activeButtons = document.querySelectorAll('.v-radio.theme--light.v-item--active')

      if (activeButtons.length !== 0) {
        for (const activeButton of activeButtons) {
          const activeButtonChild = activeButton.firstChild.firstChild
          activeButtonChild.classList.remove('primary--text')
          activeButtonChild.classList.remove('mdi-radiobox-marked')
          activeButtonChild.classList.add('mdi-radiobox-blank')
        }
      }
      this.search.platform = ''
      this.search.game_mode = ''
      this.search.rank_tier = ''
    },
    async deleteRoom (roomId) {
      this.$store.dispatch('getBtnLoading', true)

      await this.$axios.$delete(
        `api/v1/rooms/${roomId}`
      )
        .then(res => this.deleteSuccessful(res))
    },
    deleteSuccessful (res) {
      this.$store.dispatch('rooms/deleteRoom', res)
      this.$store.dispatch('getBtnLoading', false)
      this.setToaster()
    },
    setToaster () {
      const msg = 'スクワッドを削除しました'
      const color = 'success'

      return this.$store.dispatch('getToast', { msg, color })
    }
  }
}
</script>
