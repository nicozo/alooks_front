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
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ $auth.user.name }}
            </v-list-item-subtitle>
          </v-list-item-content>
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
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`pages.${nav_list.name}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              nuxt
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
    'authentication'
  ],
  data ({ $config: { appName } }) {
    return {
      appName,
      nav_lists: [
        { name: 'rooms' },
        { name: 'rooms-create' },
        { name: 'invitation-list' }
      ],
      drawer: false,
      defaultAvatarSrc: require('@/static/DefaultAvatar.png')
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
      // console.log('ドロワーリンククリック！', this.drawer)
    }
  }
}
</script>
