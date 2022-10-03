<template>
  <validation-provider
    v-slot="{ errors }"
    name="希望ログイン数"
    rules="required"
  >
    <v-select
      id="required_login"
      :value="requiredLogin"
      :items="login_times"
      item-text="label"
      item-value="data"
      label="希望ログイン数"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:requiredLogin', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormRequiredLogin',
  props: {
    requiredLogin: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      login_times: [
        { label: '制限なし', data: 'unlimited' },
        { label: 'ほぼ毎日', data: 'everyday' },
        { label: '週1~2日', data: 'a_couple_of_times_a_week' },
        { label: '週3~4日', data: 'three_or_four_times_a_week' }
      ]
    }
  }
}
</script>
