<template>
  <v-container fluid>
    <app-back-home-button />

    <v-row
      id="login-form"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        class="my-8 text-center"
      >
        <h1>
          {{ pageTitle }}
        </h1>
      </v-col>

      <v-card
        flat
        width="80%"
        max-width="800"
      >
        <v-card-text>
          本規約は、会社名（以下「当社」といいます。）は、当社がエペスク（以下「本サービス」といいます。）を提供するにあたり、ご利用される皆様（以下「利用者」といいます。）の個人に関する情報（以下「個人情報」といいます。）を取得します。
        </v-card-text>

        <v-card-title>
          第１条（適用範囲）
        </v-card-title>
        <v-card-text>
          本プライバシーポリシー（以下「本ポリシー」といいます。）は、当社が利用者から個人情報を取得、利用及び管理するときに適用されます。
        </v-card-text>

        <v-card-title>
          第２条（取得する情報）
        </v-card-title>
        <v-card-text>
          当社は、利用者から以下の情報を取得します。<br>
          氏名<br>
          生年月日<br>
          年齢<br>
          連絡先
        </v-card-text>

        <v-card-title>
          第３条（利用目的）
        </v-card-title>
        <v-card-text>
          当社が個人情報を収集・利用する目的は、以下のとおりです。<br>
          本サービスの提供・運営のため<br>
          本サービスの運営上必要な事項の通知のため<br>
          本サービスの会員であるお客様の管理のため<br>
          本サービスに関する新機能、更新情報をお知らせするため<br>
          メールマガジンの送信、ダイレクトメールの送付のため<br>
          本サービスの各種問合せ、アフターサービス対応のため<br>
          不正アクセス、不正利用の防止のため<br>
          本サービスその他のコンテンツの開発・改善のため
          上記の利用目的に付随する目的
        </v-card-text>

        <v-card-title>
          第４条（個人情報の第三者への提供）
        </v-card-title>
        <v-card-text>
          当社は、次に掲げる場合を除いて、あらかじめ利用者の同意を得ないで、取得した個人情報を第三者に提供することはありません。
          法令に基づく場合<br>
          人の生命、身体又は財産の保護のために必要がある場合であって、利用者の同意を得ることが困難であるとき。<br>
          公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、利用者の同意を得ることが困難であるとき。<br>
          国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、利用者の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき。<br>
          前項の定めにかかわらず、次に掲げる場合には、当該個人情報の提供先は第三者に該当しないものとします。<br>
          当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託することに伴って当該個人情報が提供される場合<br>
          合併その他の事由による事業の承継に伴って個人情報が提供される場合<br>
        </v-card-text>

        <v-card-title>
          第８条（本プライバシーポリシーの変更）
        </v-card-title>
        <v-card-text>
          当社は、法令改正への対応の必要性及び事業上の必要性に応じて、本ポリシーを変更する場合があります。本ポリシーの変更を行った場合には、本ウェブサイト上に掲載します。
        </v-card-text>

        <v-card-title>
          第１０条（お問い合わせ）
        </v-card-title>
        <v-card-text>
          お問い合わせページよりお願い致します。
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PrivacyPolicyPage',
  layout: 'signup',
  data ({ $route }) {
    return {
      pageTitle: this.$t(`pages.${$route.name}`)
    }
  }
}
</script>
