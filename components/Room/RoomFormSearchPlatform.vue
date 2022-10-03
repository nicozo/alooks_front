<template>
  <v-radio-group
    id="search-platform"
    hide-details
    dense
    row
    @change="$emit('update:platform', $event)"
  >
    <template #label>
      <div>-{{ $t('room.platform.title') }}-</div>
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
  name: 'RoomFormSearchPlatform',
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
