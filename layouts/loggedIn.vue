<template>
  <v-app>
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
            <v-list-item-title class="title">
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
          <div v-if="$auth.user.avatar_url">
            <v-list-item-avatar size="60">
              <v-img :src="$auth.user.avatar_url" alt="プロフィール画像です" />
            </v-list-item-avatar>
          </div>
          <div v-else>
            <v-list-item-avatar size="60">
              <v-img :src="defaultAvatarSrc" alt="プロフィール画像です" />
            </v-list-item-avatar>
          </div>

          <div v-if="guestLoggedIn()">
            <v-list-item-content>
              <v-list-item-subtitle>
                ゲストログイン中
              </v-list-item-subtitle>
            </v-list-item-content>
          </div>

          <div v-else>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ $auth.user.name }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </div>
        </v-list-item>

        <v-divider />
      </v-container>

      <v-list
        dense
        nav
        flat
      >
        <v-list-item
          v-for="nav_list in nav_lists"
          :key="nav_list.name"
          nuxt
          :to="{ name: `${nav_list.name}` }"
          @click="handleToggleDrawer"
        >
          <template v-if="isApplicationsLink(nav_list.name)">
            <v-badge
              :content="countNewApplications"
              :value="countNewApplications"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t(`pages.${nav_list.name}`) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-badge>
          </template>

          <template v-else>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(`pages.${nav_list.name}`) }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <div v-if="guestLoggedIn()">
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
        </div>

        <div v-else>
          <v-list-item>
            <v-list-item-content>
              <v-btn
                nuxt
                color="red"
                :to="{ name: 'logout' }"
              >
                {{ $t('pages.logout') }}
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <logged-in-header
      :drawer="drawer"
      :app-name="appName"
      @handle-toggle-drawer="handleToggleDrawer"
    />

    <logged-in-hero :route-name="routeName" />

    <v-main class="pt-3">
      <app-toaster />

      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script>
export default {
  name: 'LoggedInLayout',
  middleware: [
    'applications'
  ],
  data ({ $config: { appName } }) {
    return {
      appName,
      nav_lists: [
        { name: 'rooms' },
        { name: 'rooms-create' },
        { name: 'applications' },
        { name: 'clans' },
        { name: 'clans-create' },
        { name: 'clans-my_clan' },
        { name: 'players' }
      ],
      drawer: false,
      defaultAvatarSrc: this.$store.getters.defaultAvatarSrc
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    },
    applications () {
      return this.$store.getters['applications/applications']
    },
    countNewApplications () {
      const newApplications = this.applications.filter(application => application.is_read === false)

      return newApplications.length
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    },
    isApplicationsLink (navName) {
      return navName === 'applications'
    },
    guestLoggedIn () {
      return !this.$auth.isExistUser()
    }
  }
}
</script>
