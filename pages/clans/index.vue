<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(clan, i) in displayClans"
        :key="i"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
      >
        <ClanItem :clan="clan" />
      </v-col>

      <v-tooltip
        left
        color="primary"
      >
        <template #activator="{ on, attrs }">
          <v-fab-transition>
            <v-btn
              color="primary"
              dark
              fixed
              bottom
              right
              fab
              style="z-index: 10;"
              nuxt
              :to="{ name: 'rooms-create' }"
              x-large
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <span>{{ $t('pages.clans-create') }}</span>
      </v-tooltip>
    </v-row>

    <v-row dense>
      <v-col>
        <v-pagination
          v-model="page"
          :length="pageLength"
          @input="setPageNumber"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ClansIndexPage',
  middleware: ['clans'],
  data () {
    return {
      page: 1,
      pageSize: 12,
      pageNumber: 0
    }
  },
  computed: {
    clans () {
      return this.$store.getters['clans/clans']
    },
    pageLength () {
      return Math.ceil(this.clans.length / this.pageSize)
    },
    displayClans () {
      this.returnTop()

      return this.pageNumber !== 0 ? this.clans.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.clans.slice(0, this.pageSize)
    }
  },
  methods: {
    setPageNumber (number) {
      this.pageNumber = number
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
