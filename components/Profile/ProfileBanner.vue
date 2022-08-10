<template>
  <v-card
    id="profile-banner"
    flat
  >
    <template v-if="hightestKillLegendStats">
      <v-img
        :src="hightestKillLegendStats.ImgAssets.banner"
        :max-height="maxHeight"
        :min-height="minHeight"
      />
    </template>
    <template v-else>
      <v-img
        :src="commonImageSrc"
        :max-height="maxHeight"
        :min-height="minHeight"
      />
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileBanner',
  props: {
    hightestKillLegendStats: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    commonImageSrc () {
      return this.$store.getters.commonImageSrc
    }
  },
  data () {
    return {
      maxHeight: 400,
      minHeight: 180
    }
  }
}
</script>
