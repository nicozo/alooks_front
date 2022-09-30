<template>
  <v-radio-group
    id="search-clan-age"
    hide-details
    dense
    row
    @change="$emit('update:age', $event)"
  >
    <template v-slot:label>
      <div>{{ $t('clan.age.title') }}</div>
    </template>
    <v-radio
      v-for="age in age_list"
      :key="age.label"
      :label="age.label"
      :value="age.data"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'ClanFormSearchAge',
  props: {
    age: {
      type: String,
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
