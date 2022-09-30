<template>
  <v-row
    dense
    justify="end"
  >
    <v-btn
      color="error"
      @click="uncheck"
    >
      {{ $t('btn.uncheck') }}
    </v-btn>
  </v-row>
</template>

<script>
export default {
  name: 'AppSearchUncheckButton',
  props: {
    search: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    uncheck () {
      // Todo チェックを外した後、同じラジオボタンをクリックできない。
      const activeButtons = document.querySelectorAll('.v-item--active')
      if (activeButtons.length !== 0) {
        for (const activeButton of activeButtons) {
          const activeButtonChild = activeButton.firstChild.firstChild
          activeButtonChild.classList.remove('primary--text')
          activeButtonChild.classList.remove('mdi-radiobox-marked')
          activeButtonChild.classList.add('mdi-radiobox-blank')
        }
      }
      this.search.platform = ''
      this.search.age = ''
      this.search.required_login = ''
      this.search.required_ranked = ''
    }
  }
}
</script>
