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
              ログイン
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn
              color="primary"
              to="/register"
            >
              新規登録
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, i) in homeItems"
          :key="i"
          link
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <home-header
      :drawer="drawer"
      :appName="appName"
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
                {{ item.title }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12">
            <div
              :is="`home-${item.title}`"
              :id="`${item.title}`"
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
  components: { HomeAbout, HomeUsage },
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
    }
  }
}
</script>
