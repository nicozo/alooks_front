<template>
  <validation-provider
    v-slot="{ errors }"
    name="最高ランク"
    rules="required"
  >
    <v-select
      id="required_ranked"
      :value="requiredRanked"
      :items="rankedTiers"
      item-text="label"
      item-value="data"
      label="最高ランク"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:requiredRanked', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormRequiredRanked',
  props: {
    requiredRanked: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      rankedTiers: [
        { label: '制限なし', data: 'unlimited' },
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
