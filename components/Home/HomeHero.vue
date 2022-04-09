<template>
  <!-- <v-container
    fluid
    fill-height
    class="hero-image"
  >
    <home-title />
  </v-container> -->
  <v-img
    :src="imgSrc"
    :height="imgHeight"
  >
    <home-title :imgHeight="imgHeight" />
  </v-img>
</template>

<script>
export default {
  name: 'HomeHero',
  data () {
    return {
      imgHeight: '100vh',
      height: 56,
      imgSrc: require('@/static/HeroImage.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
// .hero-image {
//   background: url("../../static/HeroImage.jpeg");
//   background-size: cover;
//   background-position: center center;
//   width: 100%;
//   height: 100vh;
// }
</style>
