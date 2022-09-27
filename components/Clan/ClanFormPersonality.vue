<template>
  <validation-provider
    v-slot="{ errors }"
    name="当クランに適切なプレイヤー"
    rules="required|max:100"
  >
    <v-textarea
      id="personality"
      :value="personality"
      label="当クランに適切なプレイヤー"
      placeholder="向上心のある人！常識のある人！"
      hint="どんな人がクランに来てほしいのかを設定"
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:personality', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormPersonality',
  props: {
    personality: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
