<template>
  <validation-provider
    v-slot="{ errors }"
    name="クラン内連絡手段"
    rules="required|max:50"
  >
    <v-textarea
      id="contact_means"
      :value="contactMeans"
      label="クラン内連絡手段"
      counter="50"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:contactMeans', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormContactMeans',
  props: {
    contactMeans: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
