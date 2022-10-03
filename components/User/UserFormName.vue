<template>
  <validation-provider
    v-slot="{ errors }"
    name="ユーザー名"
    rules="required|max:30"
  >
    <v-text-field
      id="name"
      :value="name"
      label="ユーザー名"
      placeholder="あなたのユーザー名"
      counter="30"
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
  name: 'UserFormName',
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
