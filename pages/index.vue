<template>
  <div>
    <home-header :appName="appName"/>

    <v-container
      fluid
      fill-height
      class="hero-img"
    >
      <home-title :appName="appName"/>
    </v-container>

    <v-main
      class="main"
    >
      <v-container fluid>
        <v-row
          v-for="(item, i) in homeItems"
          :key="i"
          align="center"
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
