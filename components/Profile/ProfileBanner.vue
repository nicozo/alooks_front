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
  data () {
    return {
      commonImageSrc: require('@/static/CommonImage.jpg'),
      maxHeight: 400,
      minHeight: 180
    }
  }
}
</script>
