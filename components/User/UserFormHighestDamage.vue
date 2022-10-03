<template>
  <validation-provider
    v-slot="{ errors }"
    name="最高ダメージ"
    rules="integer"
  >
    <v-text-field
      id="highest-damage"
      :value="highestDamage"
      label="最高ダメージ"
      placeholder="4000"
      outlined
      clearable
      required
      :error-messages="errors"
      @input="$emit('update:highestDamage', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'UserFormHighestDamage',
  props: {
    highestDamage: {
      type: Number,
      default: 0
    }
  }
}
</script>
