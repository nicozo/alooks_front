<template>
  <v-radio-group
    id="search-clan-required-login"
    hide-details
    dense
    row
    @change="$emit('update:login', $event)"
  >
    <template v-slot:label>
      <div>{{ $t('clan.required_login.title') }}</div>
    </template>
    <v-radio
      v-for="login in login_list"
      :key="login.label"
      :label="login.label"
      :value="login.data"
    />
  </v-radio-group>
</template>

<script>
export default {
  name: 'ClanFormSearchLogin',
  props: {
    requiredLogin: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      login_list: [
        { label: '制限なし', data: 'unlimited' },
        { label: 'ほぼ毎日', data: 'everyday' },
        { label: '週1~2日', data: 'a_couple_of_times_a_week' },
        { label: '週3~4日', data: 'three_or_four_times_a_week' }
      ]
    }
  }
}
</script>
