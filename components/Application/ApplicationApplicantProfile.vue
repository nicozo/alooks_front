<template>
  <v-card>
    <v-container>
      <v-card-title>
        {{ $t('pages.profile') }}
      </v-card-title>

      <v-divider />

      <v-card-subtitle class="pb-1">
        -{{ $t('user.self_introduction') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ applicant.self_introduction }}
      </v-card-text>

      <v-card-subtitle class="pb-1 pt-0">
        -{{ $t('user.sex') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ $t(`gender.${applicant.sex}`) }}
      </v-card-text>

      <v-card-subtitle class="pb-1 pt-0">
        -{{ $t('user.date_of_birth') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ getUserAge(applicant.date_of_birth) }}歳
      </v-card-text>

      <v-card-subtitle class="pb-1 pt-0">
        -{{ $t('user.kd') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ applicant.kd }}
      </v-card-text>

      <v-card-subtitle class="pb-1 pt-0">
        -{{ $t('user.highest_damage') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ applicant.highest_damage }}
      </v-card-text>

      <v-card-subtitle class="pb-1 pt-0">
        -{{ $t('user.favorite_weapons') }}-
      </v-card-subtitle>
      <v-card-text>
        {{ applicant.favorite_weapons }}
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'ApplicationApplicantProfile',
  props: {
    applicant: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  methods: {
    getUserAge (birthday) {
      if (!birthday) { return }
      const today = new Date()
      const ymd = birthday.split('-')
      const thisYearsBirthday = new Date(today.getFullYear(), ymd[1] - 1, ymd[2])
      const age = today.getFullYear() - ymd[0]

      return today < thisYearsBirthday ? age - 1 : age
    }
  }
}
</script>
