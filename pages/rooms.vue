<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      absolute
      temporary
      dark
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
            <v-list-title>
              {{ appName }}
            </v-list-title>
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
            <v-list-subtitle>
              TEST1でログイン中
            </v-list-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(link, i) in roomLinks"
          :key="i"
          link
        >
          <v-list-item-content>
            <v-list-title>
              {{ link.title }}
            </v-list-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content class="text-center">
            <v-btn
              color="red"
            >
              ログアウト
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <logged-in-header
      :drawer="drawer"
      :appName="appName"
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
        {
          title: '参加リクエスト一覧'
        }
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
