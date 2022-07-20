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
              <v-row dense>
                <v-col>
                  <v-text-field
                    id="search-keyword"
                    v-model="keyword"
                    hide-details
                    rounded
                    outlined
                    dense
                    placeholder="スクワッドを検索"
                    prepend-inner-icon="mdi-magnify"
                    type="search"
                  />
                </v-col>
              </v-row>

              <v-radio-group
                id="search-platform"
                v-model="platform"
                hide-details
                class="mt-2"
                dense
                row
              >
                <v-radio
                  v-for="platform in platforms"
                  :key="platform"
                  :label="platform"
                  :value="platform"
                />
              </v-radio-group>
              <v-radio-group
                id="search-game-mode"
                v-model="game_mode"
                hide-details
                class="mt-2"
                dense
                row
              >
                <v-radio
                  v-for="game_mode in gameModes"
                  :key="game_mode"
                  :label="game_mode"
                  :value="game_mode"
                />
              </v-radio-group>
              <v-radio-group
                id="search-rank_tier"
                v-model="rank_tier"
                hide-details
                class="mt-2"
                dense
                row
              >
                <v-radio
                  v-for="rank_tier in rankTiers"
                  :key="rank_tier"
                  :label="rank_tier"
                  :value="rank_tier"
                />
              </v-radio-group>
            </v-container>
          </form>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(room, i) in filteredRooms"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
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
      displayRooms: [],
      keyword: '',
      platform: '',
      game_mode: '',
      rank_tier: '',
      platforms: [
        'PlayStation',
        'Xbox',
        'PC'
      ],
      rankTiers: [
        'なし（カジュアル）',
        'ルーキー',
        'ブロンズ',
        'シルバー',
        'ゴールド',
        'プラチナ',
        'ダイアモンド',
        'マスター',
        'プレデター'
      ],
      gameModes: [
        'カジュアル',
        'ランク',
        'アリーナ',
        'イベント'
      ]
    }
  },
  computed: {
    filteredRooms () {
      const rooms = []

      for (const i in this.rooms) {
        const room = this.rooms[i]
        if (room.title.includes(this.keyword)) {
          if (room.platform.includes(this.platform)) {
            if (room.game_mode.includes(this.game_mode)) {
              if (room.rank_tier.includes(this.rank_tier)) {
                rooms.push(room)
              }
            }
          }
        }
      }
      return rooms
    }
  },
  mounted () {
    this.length = Math.ceil(this.rooms.length / this.pageSize)
    this.displayRooms = this.rooms.slice(0, this.pageSize)
    this.test()
  },
  methods: {
    pageChange (pageNumber) {
      this.displayRooms = this.rooms.slice(this.pageSize * (pageNumber - 1), this.pageSize * pageNumber)
      this.returnTop()
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
    test () {
      const filter = {
        keyword: '楽',
        platform: 'Xbox'
      }

      const rooms = this.rooms.filter(room =>
        room.title.includes(filter.keyword) &&
        room.platform === filter.platform
      )
      console.log(rooms)
    }
  }
}
</script>
