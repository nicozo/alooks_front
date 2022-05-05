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
          link
          class="py-3"
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
          :to="`${link.path}`"
          nuxt
          @click="handleToggleDrawer"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ link.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="text-center">
            <v-btn
              color="red"
              to="/logout"
            >
              ログアウト
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

    <logged-in-hero />

    <v-main>
      <v-container fluid>
        <NuxtChild />
      </v-container>
    </v-main>

    <app-footer />
  </div>
</template>

<script>
export default {
  name: 'RoomsDefaultPage',
  layout: 'rooms',
  data ({ $config: { appName } }) {
    return {
      appName,
      roomLinks: [
        { title: 'squadList', path: '/rooms' },
        { title: 'squadCreate', path: '/rooms/create' },
        { title: 'invitationList', path: '/' }
      ],
      drawer: false
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
