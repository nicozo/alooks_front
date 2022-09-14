<template>
  <v-row
    dense
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="6"
    >
      <v-img :src="imgSrc" />
    </v-col>

    <v-col
      cols="12"
      sm="6"
      md="6"
      lg="6"
    >
      <div class="text-h5 font-weight-bold mb-4 text-center">
        手軽に「Apex Legends」を遊ぶ仲間を募集・検索できるサービスです。
      </div>

      <div class="text-center mb-4">
        エペスクでは、自身のアカウントIDを登録することで簡易戦績が公開されるため<br>
        ミスマッチを防いで理想に近いユーザーとApex Legendsを楽しむことができます。<br>
        無駄なやり取りをせずボタン一つで簡単にスクワッド募集・参加することができます。
      </div>

      <div align="center">
        <v-btn
          color="success"
          class="pa-5"
          nuxt
          to="/rooms"
        >
          {{ $t('btn.to_rooms_page') }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomeAbout',
  data () {
    return {
      imgSrc: require('@/static/undraw_Content_team_re_6rlg.png')
    }
  }
}
</script>
