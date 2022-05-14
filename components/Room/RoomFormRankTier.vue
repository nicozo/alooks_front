<template>
  <validation-provider
    v-slot="{ errors }"
    name="ランク帯"
    rules="required"
  >
    <v-select
      :items="rankTiers"
      :value="rankTier"
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
        'プレデター'
      ]
    }
  }
}
</script>
