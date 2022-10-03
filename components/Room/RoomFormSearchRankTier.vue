<template>
  <v-radio-group
    id="search-rank_tier"
    hide-details
    dense
    row
    @change="$emit('update:rankTier', $event)"
  >
    <template #label>
      <div>-{{ $t('room.rank_tier.title') }}-</div>
    </template>
    <v-radio
      v-for="rank_tier in rankTiers"
      :key="rank_tier.label"
      :label="rank_tier.label"
      :value="rank_tier.data"
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
