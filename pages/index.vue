<template>
  <div>
    <home-app-header
      :appName="appName"
    />

    <v-container
      fluid
      fill-height
      class="hero-img"
    >
      <div class="ml-16">
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
      </div>
    </v-container>

    <v-main
      class="main"
    >
      <v-container
        fluid
      >
        <v-row
          v-for="(item, i) in homeItems"
          :key="i"
        >
          <v-card flat>
            <v-card-title>
              {{ item.title }}
            </v-card-title>
            <v-col>
              <div
                :is="`home-${item.title}`"
                :id="`${item.title}`"
              />
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </v-main>

    <app-footer />
  </div>
</template>

<script>
import HomeAbout from '../components/Home/HomeAbout'
import HomeUsage from '../components/Home/HomeUsage'

export default {
  name: 'IndexPage',
  components: { HomeAbout, HomeUsage },
  data ({ $config: { appName } }) {
    return {
      appName,
      imgHeight: '500',
      homeItems: [
        { title: 'about' },
        { title: 'usage' }
      ]
    }
  }
}
</script>

<style>
.hero-img {
  background-image: url("../static/HeroImage.jpeg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  max-width: 1920px;
  height: 100vh;
}
</style>
