<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集タイトル"
    rules="required|max:15"
  >
    <v-text-field
      id="title"
      :value="title"
      label="募集タイトル"
      placeholder="募集タイトル"
      counter="15"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:title', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
