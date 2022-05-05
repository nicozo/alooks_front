<template>
  <v-img
    :src="imgSrc"
    max-height="350"
    dark
    id="logged-in-hero"
  >
    <v-row
      align="center"
      justify="center"
      style="height: 350px"
    >
      <v-col
        class="text-left align-center ml-8"
      >
        <h1>
          {{ $t(`pages.${routeName}`) }}
        </h1>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: 'LoggedInHero',
  data () {
    return {
      imgSrc: require('@/static/CommonImage.jpg')
    }
  },
  props: {
    routeName: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
