<template>
  <div>
    <home-header />

    <home-hero />

    <v-main>
      <v-container>
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
  data () {
    return {
      homeItems: [
        { title: 'about' },
        { title: 'usage' }
      ]
    }
  }
}
</script>
