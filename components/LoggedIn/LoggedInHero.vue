<template>
  <v-img
    :src="imgSrc"
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
        <h1>{{ title }}</h1>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: 'LoggedInHero',
  data () {
    return {
      title: 'スクワッド一覧',
      imgSrc: require('@/static/CommonImage.jpg')
    }
  }
}
</script>
