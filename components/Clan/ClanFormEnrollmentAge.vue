<template>
  <validation-provider
    v-slot="{ errors }"
    name="年齢層"
    rules="required|max:25"
  >
    <v-text-field
      id="enrollment_age"
      :value="enrollmentAge"
      label="年齢層"
      placeholder="現在の年齢層は２０代が多いです！"
      counter="25"
      :error-messages="errors"
      outlined
      clearable
      required
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
      require: true,
      default: ''
    }
  }
}
</script>
