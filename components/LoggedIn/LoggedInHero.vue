<template>
  <v-img
    id="logged-in-hero"
    :src="commonImageSrc"
    max-height="350"
    dark
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
  props: {
    routeName: {
      type: String,
      require: true,
      default: ''
    }
  },
  computed: {
    commonImageSrc () {
      return this.$store.getters.commonImageSrc
    }
  }
}
</script>
