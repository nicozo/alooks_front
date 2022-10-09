<template>
  <v-expansion-panels inset>
    <v-expansion-panel
      v-for="(item,i) in apexNews"
      :key="i"
    >
      <v-expansion-panel-header>
        {{ item.title }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <a :href="item.link">
          <v-img :src="item.img"/>
        </a>

        <v-card-text>
          {{ item.short_desc }}
        </v-card-text>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'HomeNews',
  computed: {
    apexNews () {
      return this.$game.news
    }
  },
  created () {
    this.news()
  },
  methods: {
    async news () {
      try {
        await this.$game.getNews()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
