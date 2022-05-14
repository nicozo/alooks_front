<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集人数"
    rules="required"
  >
    <v-select
      :items="recruitmentNumbers"
      :value="recruitmentNumber"
      label="募集人数"
      :error-messages="errors"
      outlined
      required
      @input="$emit('update:recruitmentNumber', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'RoomFormRecruitmentNumbers',
  props: {
    recruitmentNumber: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      recruitmentNumbers: [
        '1人',
        '2人'
      ]
    }
  }
}
</script>
