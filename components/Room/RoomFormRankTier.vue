<template>
  <validation-provider
    v-slot="{ errors }"
    name="ランク帯"
    rules="required"
  >
    <v-select
      id="rank_tier"
      :value="rankTier"
      :items="rankTiers"
      item-text="label"
      item-value="data"
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
        { label: 'なし（カジュアル）', data: 'casual' },
        { label: 'ルーキー', data: 'rookie' },
        { label: 'ブロンズ', data: 'bronze' },
        { label: 'シルバー', data: 'silver' },
        { label: 'ゴールド', data: 'gold' },
        { label: 'プラチナ', data: 'platinum' },
        { label: 'ダイアモンド', data: 'diamond' },
        { label: 'マスター', data: 'master' },
        { label: 'プレデター', data: 'predator' }
      ]
    }
  }
}
</script>
