<template>
  <validation-provider
    v-slot="{ errors }"
    name="コンセプト"
    rules="required|max:100"
  >
    <v-text-field
      id="concept"
      :value="concept"
      label="コンセプト"
      placeholder="お友達を増やしたい人向けのクランです！"
      hint="クラン活動の目などどんなクランなのかを簡潔に伝えよう！"
      persistent-hint
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:concept', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormConcept',
  props: {
    concept: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
