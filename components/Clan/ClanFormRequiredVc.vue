<template>
  <validation-provider
    v-slot="{ errors }"
    name="VCの有無"
    rules="required"
  >
    <v-select
      id="required_vc"
      :value="requiredVc"
      :items="vc_items"
      item-text="label"
      item-value="data"
      label="VCの有無"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:requiredVc', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormRequiredVc',
  props: {
    requiredVc: {
      type: Boolean,
      require: true,
      default: true
    }
  },
  data () {
    return {
      vc_items: [
        { label: 'あり', data: 'true' },
        { label: 'なし', data: 'false' }
      ]
    }
  }
}
</script>
