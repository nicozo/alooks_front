<template>
  <validation-provider
    v-slot="{ errors }"
    name="スナイプや大会等"
    rules="required|max:100"
  >
    <v-textarea
      id="snipe"
      :value="snipe"
      label="スナイプや大会等"
      counter="100"
      hint="スナイプや大会への参加などの活動内容を設定"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:snipe', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormSnipe',
  props: {
    snipe: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
