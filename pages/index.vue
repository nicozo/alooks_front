<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      fixed
      right
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-pistol
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ appName }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              color="success"
              to="/login"
            >
              {{ $t('pages.login') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              color="primary"
              to="/register"
            >
              {{ $t('pages.register') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in homeItems"
          :key="i"
          link
        >
          <v-list-item-content @click="toLink(item.title)">
            <v-list-item-title>
              {{ $t(`items.${item.title}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <home-header
      :drawer="drawer"
      :app-name="appName"
      @handle-toggle-drawer="handleToggleDrawer"
    />

    <home-hero />

    <v-main>
      <v-container fluid>
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
                {{ $t(`items.${item.title}`) }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div
              :is="`home-${item.title}`"
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
  components: {
    HomeAbout,
    HomeUsage
  },
  middleware: [
    'logged-in-redirect'
  ],
  data ({ $config: { appName } }) {
    return {
      appName,
      homeItems: [
        { title: 'about' },
        { title: 'usage' }
      ],
      drawer: false
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    },
    toLink (item) {
      // console.log(item)
      this.$vuetify.goTo(`#${item}`)
      this.handleToggleDrawer()
    }
  }
}
</script>
