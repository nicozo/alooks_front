<template>
  <v-img
    id="home-hero"
    :src="imgSrc"
    :style="{ height: `${imgHeight}vh` }"
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
  }
}
</script>
