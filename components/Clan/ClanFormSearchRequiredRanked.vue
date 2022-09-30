<template>
  <v-radio-group
    id="search-rankTier"
    hide-details
    dense
    row
    @change="$emit('update:rankTier', $event)"
  >
    <template v-slot:label>
      <div>{{ $t('clan.required_ranked.title') }}</div>
    </template>
    <v-radio
      v-for="rankTier in rankedTiers"
      :key="rankTier.label"
      :label="rankTier.label"
      :value="rankTier.data"
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
