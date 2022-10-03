<template>
  <v-row
    align-content="center"
    :style="{ height: `${imgHeight}vh` }"
    class="mx-10"
  >
    <v-col
      id="home-title"
      cols="12"
    >
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
          nuxt
          :to="{ name: 'rooms' }"
        >
          {{ $t('btn.to_rooms_page') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeTitle',
  props: {
    imgHeight: {
      type: Number,
      default: 0
    }
  },
  data ({ $config: { appName } }) {
    return {
      appName,
      subTitle: 'サクッとApex Legendsをプレイする仲間を募集・検索'
    }
  }
}
</script>
