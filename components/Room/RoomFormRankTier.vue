<template>
  <validation-provider
    v-slot="{ errors }"
    name="ランク帯"
    rules="required"
  >
    <v-select
      id="rank_tier"
      :items="rankTiers"
      label="ランク帯"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:rankTier', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormRankTier',
  props: {
    rankTier: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rankTiers: [
        'ルーキー',
        'ブロンズ',
        'シルバー',
        'ゴールド',
        'プラチナ',
        'ダイアモンド',
        'マスター',
        'プレデター',
        'なし（カジュアル）'
      ]
    }
  }
}
</script>
