<template>
  <validation-provider
    v-slot="{ errors }"
    name="年齢"
    rules="required"
  >
    <v-select
      id="age"
      :value="age"
      :items="age_list"
      item-text="label"
      item-value="data"
      label="年齢"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:age', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormAge',
  props: {
    age: {
      type: String,
      require: true,
      default: ''
    }
  },
  data () {
    return {
      age_list: [
        { label: '制限なし', data: 'unlimited' },
        { label: '高校生以上', data: 'high_school_student' },
        { label: '成人以上', data: 'adult' }
      ]
    }
  }
}
</script>
