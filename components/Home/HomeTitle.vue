<template>
  <v-row
    align-content="center"
    :style="{ height: `${imgHeight}vh` }"
    class="mx-10"
  >
    <v-col cols="12">
      <div class="d-flex flex-column align-start">
        <h1 class="text-h2 mb-3">
          {{ appName }}
        </h1>
        <h2 class="subheading mb-4">
          {{ subTitle }}
        </h2>
        <v-btn
          color="success"
          class="pa-4"
          to="/rooms"
        >
          スクワッドを探す
        </v-btn>
      </div>
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
    imgHeight: {
      type: Number
    }
  },
  data ({ $config: { appName } }) {
    return {
      appName,
      subTitle: 'Apex Legendsでスクワッドを募集・参加しよう！'
    }
  }
}
</script>
