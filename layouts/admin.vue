<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Admin
            </v-list-item-title>
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
          v-for="nav in nav_lists"
          :key="nav.name"
          nuxt
          :to="{ name: `${nav.name}` }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ $t(`pages.${nav.name}`) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn
              nuxt
              color="red"
              :to="{ name: 'logout-admin' }"
            >
              {{ $t('pages.logout') }}
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <admin-header
      :drawer="drawer"
      @handle-toggle-drawer="handleToggleDrawer"
    />

    <Nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  middleware: [
    'authentication',
    'admin-authentication'
  ],
  data () {
    return {
      drawer: true,
      nav_lists: [
        { name: 'admin' },
        { name: 'admin-rooms' },
        { name: 'admin-applications' },
        { name: 'admin-clans' }
      ]
    }
  },
  methods: {
    handleToggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
