<template>
  <v-select
    id="favorite-weapons"
    :value="favoriteWeapons"
    :items="guns"
    label="好きな武器"
    outlined
    @change="$emit('update:favoriteWeapons', $event)"
  >
    <!-- <template v-slot:prepend-item>
      <v-list-item
        ripple
        @mousedown.prevent
        @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="favoriteWeapons.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            全て選択
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template> -->
  </v-select>
</template>

<script>
export default {
  props: {
    favoriteWeapons: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      guns: [
        'ハボック',
        'フラットライン',
        'ヘムロック',
        'R-301',
        'オルタネーター',
        'プラウラー',
        'R-99',
        'ボルト',
        'C.A.R.',
        'ディヴォーション',
        'L-Star',
        'スピットファイア',
        'ランページ',
        'G7',
        'トリプルテイク',
        'リピーター',
        'ボセック',
        'チャージライフル',
        'ロングボウ',
        'クレーバー',
        'センチネル',
        'EVA-8',
        'マスティフ',
        'モザンビーク',
        'ピースキーパー',
        'RE-45',
        'P2020',
        'ウィングマン'
      ]
    }
  },
  computed: {
    likesAllGuns () {
      return this.favoriteWeapons.length === this.guns.length
    },
    likesSomeGuns () {
      return this.favoriteWeapons.length > 0 && !this.likesAllGuns
    },
    icon () {
      if (this.likesAllGuns) { return 'mdi-close-box' }
      if (this.likesSomeGuns) { return 'mdi-minus-box' }
      return 'mdi-checkbox-blank-outline'
    }
  },
  methods: {
    toggle () {
      this.$nextTick(() => {
        if (this.likesAllGuns) {
          this.favoriteWeapons = []
        } else {
          this.favoriteWeapons = this.guns.slice()
        }
      })
    }
  }
}
</script>
