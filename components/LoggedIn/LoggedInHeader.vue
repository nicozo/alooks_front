<template>
  <v-app-bar
    id="logged-in-header"
    app
    flat
    class="px-2"
    :height="headerHeight"
    :dark="!isScrollPoint"
    :color="appBarStyle.color"
    :elevation="appBarStyle.elevation"
  >
    <v-toolbar-title>
      {{ appName }}
    </v-toolbar-title>

    <v-spacer />

    <v-app-bar-nav-icon @click="$emit('handle-toggle-drawer')" />
  </v-app-bar>
</template>

<script>
export default {
  name: 'LoggedInHeader',
  props: {
    drawer: {
      type: Boolean,
      require: true
    },
    appName: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      headerHeight: this.$store.getters.headerHeight,
      scrollY: 0
    }
  },
  computed: {
    isScrollPoint () {
      const pixelImgHeight = window.document.getElementById('logged-in-hero')
      if (this.scrollY && pixelImgHeight) {
        return this.scrollY > (pixelImgHeight.clientHeight - this.headerHeight)
      } else {
        return false
      }
    },
    appBarStyle () {
      const color = this.isScrollPoint ? 'white' : 'transparent'
      const elevation = this.isScrollPoint ? 4 : 0
      return { color, elevation }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.scrollY = window.scrollY
    }
  }
}
</script>
