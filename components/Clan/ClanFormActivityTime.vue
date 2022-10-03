<template>
  <validation-provider
    v-slot="{ errors }"
    name="活動時間"
    rules="required|max:50"
  >
    <v-text-field
      id="activity_time"
      :value="activityTime"
      label="活動時間"
      placeholder="主に18時から24時の間で活動することが多いです！"
      counter="50"
      :error-messages="errors"
      outlined
      clearable
      required
      @input="$emit('update:activityTime', $event)"
    />
  </validation-provider>
</template>

<script>
export default {
  name: 'ClanFormActivityTime',
  props: {
    activityTime: {
      type: String,
      require: true,
      default: ''
    }
  }
}
</script>
