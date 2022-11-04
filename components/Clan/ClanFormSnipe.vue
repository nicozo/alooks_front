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
      placeholder="週１でスナイプを開催しています！クランメンバーとワイワイ楽しめる一大イベントです！"
      hint="スナイプや大会に関わる活動内容を設定しよう！"
      persistent-hint
      :error-messages="errors"
      outlined
      clearable
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
