<template>
  <v-select
    id="favorite-weapons"
    :value="favoriteWeapons"
    :items="guns"
    label="好きな武器"
    outlined
    @change="$emit('update:favoriteWeapons', $event)"
  />
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
  }
}
</script>
