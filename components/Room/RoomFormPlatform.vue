z<template>
  <validation-provider
    v-slot="{ errors }"
    name="プラットフォーム"
    rules="required"
  >
    <v-select
      id="platform"
      :items="platforms"
      label="プラットフォーム"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:platform', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormPlatform',
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
