<template>
  <v-app-bar
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
  name: 'HomeHeader',
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
      // console.log('スクロールされた')
      const pixelImgHeight = window.document.getElementById('logged-in-hero')
      if (this.scrollY && pixelImgHeight) {
        // console.log(pixelImgHeight.clientHeight)
        return this.scrollY > (pixelImgHeight.clientHeight - this.headerHeight)
      } else {
        // console.log('高さはないよ！')
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
