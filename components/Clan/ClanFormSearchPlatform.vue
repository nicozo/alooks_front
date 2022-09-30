<template>
  <v-radio-group
    id="search-clan-platform"
    hide-details
    dense
    row
    @change="$emit('update:platform', $event)"
  >
    <template v-slot:label>
      <div>{{ $t('clan.platform.title') }}</div>
    </template>
    <v-radio
      v-for="platform in platforms"
      :key="platform"
      :label="platform"
      :value="platform"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'ClanFormSearchPlatform',
  props: {
    platform: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      platforms: [
        'PlayStation',
        'Xbox',
        'PC'
      ]
    }
  }
}
</script>
