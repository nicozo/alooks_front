<template>
  <v-radio-group
    id="search-platform"
    hide-details
    class="mt-2"
    dense
    row
    @change="$emit('update:platform', $event)"
  >
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
