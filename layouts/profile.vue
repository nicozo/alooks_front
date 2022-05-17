<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      dark
      fixed
      right
    >
      <v-list flat>
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

        <v-list-item
          :to="{ name: 'profile' }"
          nuxt
          class="py-3"
          @click="handleToggleDrawer"
        >
          <v-list-item-avatar>
            <img src="" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(link, i) in roomLinks"
          :key="i"
          :to="{ name: `${link.title}` }"
          nuxt
          @click="handleToggleDrawer"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`pages.${link.title}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="text-center">
            <v-btn
              color="red"
              to="/logout"
            >
              {{ $t('pages.logout') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <logged-in-header
      :drawer="drawer"
      :app-name="appName"
      @handle-toggle-drawer="handleToggleDrawer"
    />

    <logged-in-hero :route-name="routeName" />

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'ProfileLayout',
  data ({ $config: { appName } }) {
    return {
      appName,
      roomLinks: [
        { title: 'rooms' },
        { title: 'rooms-create' },
        { title: 'invitation-list' }
      ],
      drawer: false
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
