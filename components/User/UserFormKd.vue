<template>
  <v-slider
    v-model="changedValue"
    label="今シーズンKD"
    class="align-center"
    hide-details
    step="0.1"
    :max="max"
    :min="min"
    thumb-color="red"
    thumb-label="always"
    :thumb-size="24"
  >
    <template v-slot:append>
      <v-text-field
        v-model="changedValue"
        class="mt-0 pt-0"
        hide-details
        single-line
        type="number"
        style="width: 60px"
        :error-messages="errors"
        step="0.1"
      />
    </template>
  </v-slider>
</template>

<script>
export default {
  name: 'UserFormKd',
  props: {
    kd: {
      type: Number,
      default: 0.1
    }
  },
  data () {
    return {
      min: 0.1,
      max: 15.0
    }
  },
  computed: {
    changedValue: {
      get () {
        return this.kd
      },
      set (newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>
