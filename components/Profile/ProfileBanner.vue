<template>
  <v-card
    flat
    id="profile-banner"
  >
    <template v-if="targetLegend">
      <v-img
        :src="targetLegend.ImgAssets.banner"
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
    targetLegend: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      commonImageSrc: require('@/static/CommonImage.jpg')
    }
  }
}
</script>
