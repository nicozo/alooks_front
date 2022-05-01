<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
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
          link
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
              @click="logout"
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
    async logout () {
      await this.$axios.$delete(
        '/api/v1/sessions',
        // ログインしていないユーザーがページを訪れた時404エラーを表示させない（404エラーを許容する）
        { validateStatus: status => (status >= 200 && status < 300) || (status === 401) }
      )
      this.logoutSuccessful()
    },
    logoutSuccessful () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    handleToggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>
