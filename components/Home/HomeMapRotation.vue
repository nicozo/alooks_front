<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="7"
      md="7"
      lg="7"
    >
      <v-card
        id="current-map"
        :loading="loading"
      >
        <template v-if="isMapDataExist">
          <v-img
            :src="currentMap.asset"
            max-height="300"
            dark
          >
            <v-card-subtitle>
              {{ $t('home.map_rotation.current_map') }}
            </v-card-subtitle>

            <v-card-title class="text-h4">
              {{ currentMap.map }}
            </v-card-title>

            <v-row
              align="center"
              justify="center"
            >
              <v-col>
                <div class="text-center text-h4">
                  {{ timeMin }}:{{ timeSec }}
                </div>
              </v-col>
            </v-row>
          </v-img>
        </template>

        <template v-else>
          <v-card-subtitle>
            {{ $t('home.map_rotation.current_map') }}
          </v-card-subtitle>

          <v-card-title class="text-h4">
            {{ $t('message.no_data') }}
          </v-card-title>
        </template>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      sm="1"
      md="1"
      lg="1"
      class="text-center"
    >
      <div v-show="isBreakPoint">
        <v-icon>
          mdi-chevron-triple-up
        </v-icon>
      </div>

      <div v-show="!isBreakPoint">
        <v-icon>
          mdi-chevron-triple-left
        </v-icon>
      </div>
    </v-col>

    <v-col
      cols="12"
      sm="4"
      md="4"
      lg="4"
    >
      <v-card
        id="next-map"
        :loading="loading"
      >
        <template v-if="isMapDataExist">
          <v-img
            :src="mapSrc"
            max-height="150"
            dark
          >
            <v-card-subtitle>
              {{ $t('home.map_rotation.next_map') }}
            </v-card-subtitle>

            <v-card-title>
              {{ nextMap.map }}
            </v-card-title>
          </v-img>
        </template>

        <template v-else>
          <v-card-subtitle>
            {{ $t('home.map_rotation.next_map') }}
          </v-card-subtitle>

          <v-card-title>
            {{ $t('message.no_data') }}
          </v-card-title>
        </template>
      </v-card>
    </v-col>

    <div
      align="center"
      class="mt-5"
    >
      <v-btn
        color="success"
        class="pa-5"
        nuxt
        :to="{ name: 'rooms' }"
      >
        {{ $t('btn.to_rooms_page') }}
      </v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'HomeMapRotation',
  data () {
    return {
      timeMin: '00',
      timeSec: '00',
      kingsCanyonSrc: require('@/static/kings_canyon.jpg'),
      worldEdgeSrc: require('@/static/world_edge.jpg'),
      olympusSrc: require('@/static/olympus.jpg'),
      stormPointSrc: require('@/static/storm_point.jpg'),
      brokenMoonSrc: require('@/static/broken_moon.png')
    }
  },
  computed: {
    isBreakPoint () {
      return this.$vuetify.breakpoint.xs
    },
    data () {
      return this.$game.data
    },
    currentMap () {
      return this.$game.currentMap
    },
    nextMap () {
      return this.$game.nextMap
    },
    loading () {
      return this.$game.loading
    },
    isMapDataExist () {
      return this.data !== ''
    },
    mapSrc () {
      let src = ''

      switch (this.nextMap.map) {
        case 'Olympus':
          src = this.olympusSrc
          break

        case "World's Edge":
          src = this.worldEdgeSrc
          break

        case 'Storm Point':
          src = this.stormPointSrc
          break

        case 'Kings Canyon':
          src = this.kingsCanyonSrc
          break

        case 'Broken Moon':
          src = this.brokenMoonSrc
          break

        default:
          break
      }

      return src
    }
  },
  created () {
    this.mapRotation()
  },
  methods: {
    async mapRotation () {
      try {
        await this.$game.getMapData()
        this.runTimer()
      } catch (error) {
        console.log(error)
      }
    },
    runTimer () {
      setInterval(() => {
        this.countDown()
      }, 1000)
    },
    countDown () {
      const now = new Date()
      const end = new Date(this.currentMap.end * 1000)
      const remainTime = end - now

      if (remainTime < 0) {
        this.$router.push('/')
      }

      this.timeMin = Math.floor(remainTime / 1000 / 60) % 60
      this.timeSec = Math.floor(remainTime / 1000) % 60

      this.timeMin = this.timeMin < 10 ? '0' + this.timeMin : this.timeMin
      this.timeSec = this.timeSec < 10 ? '0' + this.timeSec : this.timeSec
    }
  }
}
</script>
