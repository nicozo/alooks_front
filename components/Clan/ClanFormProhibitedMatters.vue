<template>
  <validation-provider
    v-slot="{ errors }"
    name="禁止事項"
    rules="required|max:100"
  >
    <v-textarea
      id="prohibited_matters"
      :value="prohibitedMatters"
      label="禁止事項"
      counter="100"
      placeholder="死体撃ち、コンバーターの使用など"
      hint="禁止事項を記載しよう！"
      persistent-hint
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:prohibitedMatters', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormProhibitedMatters',
  props: {
    prohibitedMatters: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
