<template>
  <v-list-item>
    <v-list-item-icon>
      <v-img
        :src="hightestKillLegendStats.ImgAssets.icon"
        max-width="400"
      />
    </v-list-item-icon>

    <v-list-item-content>
      <v-card-title>
        Total Stats
      </v-card-title>
      <v-row>
        <v-col
          v-for="(data, i) in totalStats"
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
          v-for="(data, i) in hightestKillLegendStats.data"
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
</template>

<script>
export default {
  name: 'ProfileTotalStats',
  props: {
    totalStats: {
      type: Object,
      default: () => {},
      require: true
    },
    hightestKillLegendStats: {
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
