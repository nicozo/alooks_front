<template>
  <validation-provider
    v-slot="{ errors }"
    name="性別"
    rules="required"
  >
    <v-select
      id="sex"
      :value="sex"
      :items="gender"
      item-text="label"
      item-value="data"
      label="性別"
      :error-messages="errors"
      outlined
      @change="$emit('update:sex', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'UserFormSex',
  props: {
    sex: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      gender: [
        { label: '男性', data: 'male' },
        { label: '女性', data: 'female' }
      ]
    }
  }
}
</script>
