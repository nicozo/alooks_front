<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集文"
    rules="required|max:100"
  >
    <v-textarea
      id="body"
      :value="body"
      label="募集文"
      placeholder="お友達を増やしたい人向けのクランです！"
      hint="クラン活動の目などどんなクランなのかを簡潔に伝えよう！"
      persistent-hint
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:body', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'PlayerFormBody',
  props: {
    body: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
