<template>
  <validation-provider
    v-slot="{ errors }"
    name="入団までの流れ"
    rules="required|max:100"
  >
    <v-textarea
      id="joining-process"
      :value="joiningProcess"
      label="入団までの流れ"
      placeholder="戦績を見て数戦遊ぶ形で面接をします！希望の場合はこちらのツイッターアカウントまで連絡してください！@sample"
      persistent-placeholder
      hint="面接や連絡先などを記入しよう！"
      persistent-hint
      counter="100"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:joiningProcess', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormJoiningProcess',
  props: {
    joiningProcess: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
