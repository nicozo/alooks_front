<template>
  <v-container
    fluid
    fill-height
    class="hero-image"
  >
    <home-title />
  </v-container>
</template>

<script>
export default {
  name: 'HomeHero'
}
</script>

<style lang="scss" scoped>
.hero-image {
  background: url("../../static/HeroImage.jpeg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>
