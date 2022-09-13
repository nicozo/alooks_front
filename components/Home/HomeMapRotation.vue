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
              Current Map
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
            Current Map
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
      <div v-show="this.isBreakPoint">
        <v-icon>
          mdi-chevron-triple-up
        </v-icon>
      </div>

      <div v-show="!this.isBreakPoint">
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
          <!-- <v-img
            src="#"
            max-height="150"
            dark
          >
            <v-card-subtitle>
              Next Map
            </v-card-subtitle>

            <v-card-title>
              {{ nextMap.map }}
            </v-card-title>
          </v-img> -->
          <v-card-subtitle>
            Next Map
          </v-card-subtitle>

          <v-card-title>
            {{ nextMap.map }}
          </v-card-title>
        </template>

        <template v-else>
          <v-card-subtitle>
            Next Map
          </v-card-subtitle>

          <v-card-title>
            {{ $t('message.no_data') }}
          </v-card-title>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeMapRotation',
  data () {
    return {
      timeMin: '00',
      timeSec: '00'
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

      // if (remainTime < 0) { return false }

      if (remainTime < 0) {
        console.log('cont end')
        // clearInterval(this.countDown())
        this.$game.getMapData()
      }

      this.timeMin = Math.floor(remainTime / 1000 / 60) % 60
      this.timeSec = Math.floor(remainTime / 1000) % 60

      this.timeMin = this.timeMin < 10 ? '0' + this.timeMin : this.timeMin
      this.timeSec = this.timeSec < 10 ? '0' + this.timeSec : this.timeSec

      // if (remainTime < 0) {
      //   console.log('cont end')
      //   // clearInterval(this.countDown())
      //   this.$game.getMapData()
      // }
    }
  }
}
</script>
