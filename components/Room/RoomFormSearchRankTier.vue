<template>
  <v-radio-group
    id="search-rank_tier"
    hide-details
    class="mt-2"
    dense
    row
    @change="$emit('update:rankTier', $event)"
  >
    <v-radio
      v-for="rank_tier in rankTiers"
      :key="rank_tier"
      :label="rank_tier"
      :value="rank_tier"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'RoomFormSearchRankTier',
  props: {
    rankTier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rankTiers: [
        'なし（カジュアル）',
        'ルーキー',
        'ブロンズ',
        'シルバー',
        'ゴールド',
        'プラチナ',
        'ダイアモンド',
        'マスター',
        'プレデター'
      ]
    }
  }
}
</script>
