<template>
  <v-card id="profile-banner">
    <template v-if="targetLegendBanner">
      <v-img
        :src="targetLegendBanner"
        max-height="400"
      />
    </template>
    <template v-else>
      <v-img
        :src="commonImageSrc"
        max-height="400"
      />
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileBanner',
  props: {
    // targetLegend: {
    //   type: Object,
    //   default: () => {}
    // }
    targetLegendBanner: {
      type: String,
      default: '',
      require: true
    }
  },
  data () {
    return {
      commonImageSrc: require('@/static/CommonImage.jpg')
    }
  }
}
</script>
