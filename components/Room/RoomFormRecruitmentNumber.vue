<template>
  <validation-provider
    v-slot="{ errors }"
    name="募集人数"
    rules="required"
  >
    <v-select
      id="recruit_number"
      :value="recruitmentNumber"
      :items="recruitmentNumbers"
      item-text="label"
      item-value="data"
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
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      recruitmentNumbers: [
        { label: '1人', data: 1 },
        { label: '2人', data: 2 }
      ]
    }
  }
}
</script>
