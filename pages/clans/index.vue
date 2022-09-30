<template>
  <v-container>
    <v-row dense>
      <v-col>
        <v-card flat>
          <form
            id="search-form"
            @submit.prevent
          >
            <v-container>
              <clan-form-search-platform :platform.sync="search.platform" />

              <clan-form-search-age :age.sync="search.age" />

              <clan-form-search-required-login :required-login.sync="search.required_login" />

              <clan-form-search-required-ranked :required-ranked.sync="search.required_ranked" />

              <clan-form-search-required-vc :required-vc.sync="search.required_vc" />
            </v-container>
          </form>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="pb-5" />

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
              :to="{ name: 'clans-create' }"
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
import ClanFormSearchRequiredLogin from '~/components/Clan/ClanFormSearchRequiredLogin.vue'
export default {
  components: { ClanFormSearchRequiredLogin },
  name: 'ClansIndexPage',
  middleware: ['clans'],

  data () {
    return {
      page: 1,
      pageSize: 12,
      pageNumber: 0,
      search: {
        keyword: '',
        platform: '',
        age: '',
        required_login: '',
        required_ranked: '',
        required_vc: ''
      }
    }
  },
  computed: {
    clans () {
      return this.$store.getters['clans/clans']
    },
    pageLength () {
      return Math.ceil(this.clans.length / this.pageSize)
    },
    filteredClans () {
      const clans = []

      for (const i in this.clans) {
        const clan = this.clans[i]
        if (clan.platform.includes(this.search.platform) &&
            clan.age.includes(this.search.age) &&
            clan.required_login.includes(this.search.required_login) &&
            clan.required_ranked.includes(this.search.required_ranked) &&
            clan.required_vc.includes(this.search.required_vc)
        ) {
          clans.push(clan)
        }
      }

      return clans
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
