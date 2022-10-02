<template>
  <v-container>
    <v-row dense>
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            {{ $t('search_title') }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card flat>
              <form id="search-form">
                <v-container>
                  <clan-form-search-platform :platform.sync="search.platform" />

                  <clan-form-search-age :age.sync="search.age" />

                  <clan-form-search-required-login :required-login.sync="search.required_login" />

                  <clan-form-search-required-ranked :required-ranked.sync="search.required_ranked" />

                  <!-- <clan-form-search-required-vc :required-vc.sync="search.required_vc" /> -->

                  <v-row
                    dense
                    justify="end"
                  >
                    <v-btn
                      color="error"
                      @click="uncheck"
                    >
                      {{ $t('btn.uncheck') }}
                    </v-btn>
                  </v-row>
                </v-container>
              </form>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <v-row>
      <template v-if="displayClansExist">
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
      </template>

      <template v-else>
        <v-row
          justify="center"
          align="center"
        >
          <v-col>
            <v-card
              flat
              class="text-center"
            >
              <v-container>
                <v-card-text>
                  {{ $t('message.no_clans') }}
                </v-card-text>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </template>

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
export default {
  name: 'ClansIndexPage',
  middleware: ['clans'],
  data () {
    return {
      page: 1,
      pageSize: 12,
      pageNumber: 0,
      search: {
        platform: '',
        age: '',
        required_login: '',
        required_ranked: '',
        required_vc: null
      }
    }
  },
  computed: {
    clans () {
      return this.$store.getters['clans/clans']
    },
    pageLength () {
      return Math.ceil(this.filteredClans.length / this.pageSize)
    },
    filteredClans () {
      const clans = []

      for (const i in this.clans) {
        const clan = this.clans[i]

        if (clan.platform.includes(this.search.platform) &&
            clan.age.includes(this.search.age) &&
            clan.required_login.includes(this.search.required_login) &&
            clan.required_ranked.includes(this.search.required_ranked)
            // clan.required_vc.includes(this.search.required_vc)
        ) {
          clans.push(clan)
        }
      }

      return clans
    },
    displayClans () {
      this.returnTop()

      return this.pageNumber !== 0 ? this.filteredClans.slice(this.pageSize * (this.pageNumber - 1), this.pageSize * this.pageNumber) : this.filteredClans.slice(0, this.pageSize)
    },
    displayClansExist () {
      return this.displayClans.length !== 0
    }
  },
  methods: {
    setPageNumber (number) {
      this.pageNumber = number
    },
    returnTop () {
      window.scroll({ top: 0, behavior: 'smooth' })
    },
    uncheck () {
      // Todo チェックを外した後、同じラジオボタンをクリックできない。
      const activeButtons = document.querySelectorAll('v-radio.theme--light.v-item--active')
      if (activeButtons.length !== 0) {
        for (const activeButton of activeButtons) {
          const activeButtonChild = activeButton.firstChild.firstChild
          activeButtonChild.classList.remove('primary--text')
          activeButtonChild.classList.remove('mdi-radiobox-marked')
          activeButtonChild.classList.add('mdi-radiobox-blank')
        }
      }
      this.search.platform = ''
      this.search.age = ''
      this.search.required_login = ''
      this.search.required_ranked = ''
    }
    // Todo 検索機能をVuexで管理する考えだったが良策が思い浮かばないため一旦コメントアウト
    // searchClans () {
    //   this.$store.dispatch('clans/getFilteredClans', this.search)
    // },
    // uncheck () {
    //   // Todo チェックを外した後、同じラジオボタンをクリックできない。
    //   const activeButtons = document.querySelectorAll('.v-item--active')
    //   if (activeButtons.length !== 0) {
    //     for (const activeButton of activeButtons) {
    //       const activeButtonChild = activeButton.firstChild.firstChild
    //       activeButtonChild.classList.remove('primary--text')
    //       activeButtonChild.classList.remove('mdi-radiobox-marked')
    //       activeButtonChild.classList.add('mdi-radiobox-blank')
    //     }
    //   }
    //   this.search.platform = ''
    //   this.search.age = ''
    //   this.search.required_login = ''
    //   this.search.required_ranked = ''
    //   this.$store.dispatch('clans/getFilteredClans', this.search)
    // }
  }
}
</script>
