<template>
  <validation-provider
    v-slot="{ errors }"
    name="クランネーム"
    rules="required|max:15"
  >
    <v-text-field
      id="name"
      :value="name"
      label="クランネーム"
      placeholder="エペスククラン"
      counter="15"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:name', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormName',
  props: {
    name: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
