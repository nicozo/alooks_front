<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <validation-provider
        v-slot="{ errors }"
        name="生年月日"
        rules="required"
      >
        <v-text-field
          id="date_of_birth"
          :value="dateOfBirth"
          label="生年月日"
          :error-messages="errors"
          outlined
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </validation-provider>
    </template>

    <v-date-picker
      :value="dateOfBirth"
      no-title
      locale="jp-ja"
      :day-format="date => new Date(date).getDate()"
      :active-picker.sync="activePicker"
      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
      min="1950-01-01"
      @change="save(dateOfBirth, $event)"
    />
  </v-menu>
</template>

<script>
export default {
  name: 'UserFormDateOfBirth',
  props: {
    dateOfBirth: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activePicker: null,
      menu: false
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date, event) {
      this.$refs.menu.save(date)
      this.$emit('update:dateOfBirth', event)
    }
  }
}
</script>
