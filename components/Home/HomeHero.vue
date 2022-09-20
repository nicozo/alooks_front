<template>
  <v-img
    id="home-hero"
    :src="imgSrc"
    :style="{ height: `${imgHeight}vh` }"
    :position="mobilePosition"
  >
    <home-title :img-height="imgHeight" />
  </v-img>
</template>

<script>
export default {
  name: 'HomeHero',
  data () {
    return {
      imgHeight: 100,
      imgSrc: require('@/static/HeroImage.jpeg')
    }
  },
  computed: {
    isBreakPoint () {
      return this.$vuetify.breakpoint.xs
    },
    mobilePosition () {
      const position = this.isBreakPoint ? '70% 50%' : 'center center'
      return position
    }
  }
}
</script>
