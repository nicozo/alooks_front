<template>
  <div>
    <home-header />

    <home-hero />

    <v-main>
      <v-container>
        <v-row
          v-for="(item, i) in homeItems"
          :key="i"
          class="mb-13"
        >
          <v-col
            :id="item.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center text-h4">
                {{ item.title }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div
              :is="`home-${item.title}`"
              :id="`${item.title}`"
            />
          </v-col>
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
