<template>
  <v-list-item>
    <template v-for="(data, i) in rankStatsData">
      <v-list-item-content :key="i">
        <v-list-item-title v-show="isThisArenaRankData(data)">
          Arena
        </v-list-item-title>
        <v-list-item-title v-show="!isThisArenaRankData(data)">
          BR
        </v-list-item-title>

        <v-list-item-icon>
          <v-img :src="data.rankImg" />
        </v-list-item-icon>

        <v-list-item-subtitle>
          {{ data.rankScore }}RP
        </v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'ProfileRankStats',
  props: {
    rankStatsData: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    isThisArenaRankData (data) {
      return !data.rankedSeason.indexOf('arena')
    }
  }
}
</script>
