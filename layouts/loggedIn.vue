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
          <div v-if="$auth.user.avatar_url">
            <v-list-item-avatar>
              <img :src="$auth.user.avatar_url" alt="プロフィール画像です">
            </v-list-item-avatar>
          </div>
          <div v-else>
            <v-list-item-avatar>
              <img :src="defaultAvatarSrc" alt="プロフィール画像です">
            </v-list-item-avatar>
          </div>
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
      roomLinks: [
        { title: 'rooms' },
        { title: 'rooms-create' },
        { title: 'invitation-list' }
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
