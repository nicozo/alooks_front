import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend
} from 'vee-validate'

import {
  required,
  email,
  confirmed,
  image,
  integer
} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('email', {
  ...email,
  message: 'メールアドレスの形式で入力してください'
})

extend('required', {
  ...required,
  message: '{_field_}は必須項目です'
})

extend('min', {
  validate (value, { length }) {
    return value.length >= length
  },
  params: ['length'],
  message: '{_field_}は{length}文字以上で入力してください'
})

extend('max', {
  validate (value, { length }) {
    return value.length <= length
  },
  params: ['length'],
  message: '{_field_}は{length}文字以下で入力してください'
})

extend('confirmed', {
  ...confirmed,
  message: 'パスワードと一致しません'
})

extend('image', {
  ...image,
  message: '{_field_}は画像形式で入力してください'
})

extend('integer', {
  ...integer,
  message: '{_field_}は整数で入力してください'
})
