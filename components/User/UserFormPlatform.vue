<template>
  <v-row>
    <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="プラットフォーム"
        rules="required"
      >
        <v-select
          id="sex"
          :value="platform"
          :items="consoles"
          item-text="label"
          item-value="data"
          label="プラットフォーム"
          :error-messages="errors"
          outlined
          required
          @change="$emit('update:platform', $event)"
        />
      </validation-provider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'UserFormPlatform',
  props: {
    platform: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      consoles: [
        { label: 'PlayStation', data: 'PS4' },
        { label: 'PC(Steam, Origin)', data: 'PC' },
        { label: 'Xbox', data: 'X1' }
      ]
    }
  }
}
</script>
