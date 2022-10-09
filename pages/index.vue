<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      right
    >
      <v-container>
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
              nuxt
              color="primary"
              :to="{ name: 'register' }"
            >
              {{ $t('pages.register') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              nuxt
              color="success"
              :to="{ name: 'login' }"
            >
              {{ $t('pages.login') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list
          dense
          nav
          flat
        >
          <v-list-item
            v-for="(item, i) in homeItems"
            :key="i"
            nuxt
            @click="toLink(item.title)"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`items.${item.title}`) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
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
              <v-container>
                <v-card-title class="justify-center text-h4">
                  {{ $t(`items.${item.title}`) }}
                </v-card-title>
              </v-container>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-container>
              <div :is="`home-${item.title}`" />
            </v-container>
          </v-col>
        </v-row>
      </v-container>

      <home-bottom-navigation />
    </v-main>

    <app-footer />
  </div>
</template>

<script>
import HomeAbout from '../components/Home/HomeAbout'
// import HomeUsage from '../components/Home/HomeUsage'
import HomeRooms from '../components/Home/HomeRooms'
import HomeMapRotation from '../components/Home/HomeMapRotation'
import HomeNews from '../components/Home/HomeNews'

export default {
  name: 'IndexPage',
  components: {
    HomeAbout,
    // HomeUsage,
    HomeRooms,
    HomeMapRotation,
    HomeNews
  },
  middleware: [
    'logged-in-redirect'
  ],
  data ({ $config: { appName } }) {
    return {
      appName,
      homeItems: [
        { title: 'about' },
        // { title: 'usage' },
        { title: 'rooms' },
        { title: 'map-rotation' },
        { title: 'news' }
      ],
      drawer: false
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    },
    toLink (item) {
      this.$vuetify.goTo(`#${item}`)
      this.handleToggleDrawer()
    }
  }
}
</script>
