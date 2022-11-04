<template>
  <validation-provider
    v-slot="{ errors }"
    name="在籍人数"
    rules="required|max:50"
  >
    <v-text-field
      id="enrollment"
      :value="enrollment"
      label="在籍人数"
      placeholder="現在は○○人在籍しています！"
      counter="50"
      :error-messages="errors"
      outlined
      clearable
      @input="$emit('update:enrollment', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormEnrollment',
  props: {
    enrollment: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
