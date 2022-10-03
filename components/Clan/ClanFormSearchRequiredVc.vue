<template>
  <v-radio-group
    id="search-clan-required-vc"
    hide-details
    dense
    row
    @change="$emit('update:vc', $event)"
  >
    <template #label>
      <div>{{ $t('clan.required_vc.title') }}</div>
    </template>
    <v-radio
      v-for="vc in vc_list"
      :key="vc.label"
      :label="vc.label"
      :value="vc.data"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'ClanFormSearchLogin',
  props: {
    requiredVc: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      vc_list: [
        { label: 'あり', data: true },
        { label: 'なし', data: false }
      ]
    }
  }
}
</script>
