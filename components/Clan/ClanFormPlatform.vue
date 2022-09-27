<template>
  <validation-provider
    v-slot="{ errors }"
    name="プラットフォーム"
    rules="required"
  >
    <v-select
      id="platform"
      :value="platform"
      :items="platforms"
      item-text="label"
      item-value="data"
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
  name: 'ClanFormPlatform',
  props: {
    platform: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      platforms: [
        { label: '制限なし', data: 'unlimited' },
        { label: 'PlayStation', data: 'PlayStation' },
        { label: 'Xbox', data: 'Xbox' },
        { label: 'PC', data: 'PC' }
      ]
    }
  }
}
</script>
