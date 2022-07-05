<template>
  <v-card
    flat
    id="player-stats"
  >
    <v-list-item>
      <v-list-item-icon>
        <v-img
          :src="targetLegend.ImgAssets.icon"
          max-width="400"
        />
      </v-list-item-icon>

      <v-list-item-content>
        <v-card-title>
          Total Stats
        </v-card-title>
        <v-row>
          <v-col
            v-for="(data, i) in totalStatsData"
            v-show="data.name !== 'KD'"
            :key="i"
            cols="6"
            md="4"
            lg="4"
          >
            <v-list-item-subtitle>
              {{ data.name }}
            </v-list-item-subtitle>

            <v-list-item-title>
              {{ data.value }}
            </v-list-item-title>
          </v-col>
        </v-row>

        <v-card-title>
          Legend Stats
        </v-card-title>
        <v-row>
          <v-col
            v-for="(data, i) in targetLegend.data"
            v-show="filterStatus(data)"
            :key="i"
            cols="6"
            md="4"
            lg="4"
          >
            <v-list-item-subtitle>
              {{ data.name }}
            </v-list-item-subtitle>

            <v-list-item-title>
              {{ data.value }}
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileTotalStats',
  props: {
    totalStatsData: {
      type: Object,
      default: () => {},
      require: true
    },
    targetLegend: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  methods: {
    filterStatus (data) {
      return data.name === 'BR Kills' ||
             data.name === 'BR Damage' ||
             data.name === 'BR Wins' ||
             data.name === 'BR Headshots' ||
             data.name.includes('Season')
    }
  }
}
</script>
