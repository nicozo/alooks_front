<template>
  <v-row class="ml-10">
    <v-col>
      <h1 class="text-h2 mb-3">
        {{ appName }}
      </h1>
      <h2 class="text-h5 mb-5">
        {{ subTitle }}
      </h2>
      <v-btn
        color="success"
        to="/"
      >
        スクワッドを探す
      </v-btn>
    </v-col>
  </v-row>

  <!-- <div class="ml-1">
    <div class="text-h3 mb-5">
      {{ appName }}
    </div>
    <div class="text-h5">
      Apex Legendsでスクワッドを募集・参加しよう！
    </div>
    <div class="mt-5">
      <v-btn
        color="success"
        to="/"
      >
        スクワッドを探す
      </v-btn>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'HomeTitle',
  props: {
    appName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      subTitle: 'Apex Legendsでスクワッドを募集・参加しよう！'
    }
  }
}
</script>
