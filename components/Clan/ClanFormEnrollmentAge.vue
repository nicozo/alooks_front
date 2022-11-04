<template>
  <validation-provider
    v-slot="{ errors }"
    name="年齢層"
    rules="max:50"
  >
    <v-text-field
      id="enrollment_age"
      :value="enrollmentAge"
      label="年齢層"
      placeholder="現在の年齢層は２０代が多いです！"
      counter="50"
      :error-messages="errors"
      outlined
      clearable
      @input="$emit('update:enrollmentAge', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormEnrollmentAge',
  props: {
    enrollmentAge: {
      type: String,
      default: ''
    }
  }
}
</script>
