<template>
  <v-list-item>
    <template v-for="(data, i) in rankedStats">
      <v-list-item-content :key="i">
        <v-list-item-title v-show="isThisArenaRankStats(data)">
          {{ $t('profile.ranked_stats.title.arena') }}
        </v-list-item-title>
        <v-list-item-title v-show="!isThisArenaRankStats(data)">
          {{ $t('profile.ranked_stats.title.battle_royale') }}
        </v-list-item-title>

        <v-list-item-icon>
          <v-img :src="data.rankImg" />
        </v-list-item-icon>

        <v-list-item-title>
          {{ data.rankScore }}RP
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'ProfileRankStats',
  props: {
    rankedStats: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    isThisArenaRankStats (data) {
      return data.rankedSeason.includes('arena')
    }
  }
}
</script>
