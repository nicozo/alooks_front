<template>
  <validation-provider
    v-slot="{ errors }"
    name="自己紹介"
    rules="required|max:50"
  >
    <v-textarea
      id="self_introduction"
      :value="selfIntroduction"
      label="自己紹介"
      placeholder="よろしくお願いします！"
      :error-messages="errors"
      outlined
      clearable
      counter="50"
      @input="$emit('update:selfIntroduction', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'UserFormSelfIntroduction',
  props: {
    selfIntroduction: {
      type: String,
      default: 'よろしくお願いします！'
    }
  }
}
</script>
