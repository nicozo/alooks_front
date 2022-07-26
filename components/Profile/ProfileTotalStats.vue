<template>
  <v-list-item>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <!-- <v-subheader class="text-center">
          {{ $t('profile.legend.title.main_legend') }}
        </v-subheader> -->
        <!-- <div class="text-h6 pt-5 text-center">
          {{ $t('profile.legend.title.main_legend') }}
        </div> -->

        <v-img
          :src="hightestKillLegendStats.ImgAssets.icon"
          :max-width="breakPointLegendImgWidth"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-card-title>
          {{ $t('profile.total_stats.title.total_stats') }}
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
            <v-list-item-subtitle class="stats-name">
              {{ data.name }}
            </v-list-item-subtitle>

            <v-list-item-title>
              {{ data.value }}
            </v-list-item-title>
          </v-col>
        </v-row>

        <v-card-title>
          {{ $t('profile.total_stats.title.legend_stats') }}
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
            <v-list-item-subtitle class="stats-name">
              {{ data.name }}
            </v-list-item-subtitle>

            <v-list-item-title>
              {{ data.value }}
            </v-list-item-title>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
  computed: {
    breakPointLegendImgWidth () {
      return this.$vuetify.breakpoint.xs ? 200 : 400
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

<style scoped>
  .stats-name {
    white-space: normal;
  }
</style>
