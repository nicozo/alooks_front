<template>
  <v-radio-group
    id="search-rankTier"
    hide-details
    dense
    row
    @change="$emit('update:requiredRanked', $event)"
  >
    <template #label>
      <div>{{ $t('clan.required_ranked.title') }}</div>
    </template>
    <v-radio
      v-for="requiredRanked in rankedTiers"
      :key="requiredRanked.label"
      :label="requiredRanked.label"
      :value="requiredRanked.data"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'ClanFormSearchRequiredRanked',
  props: {
    requiredRanked: {
      type: String,
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
