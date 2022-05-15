import { createI18n } from 'vue-i18n'
import en from './en.json'
import bn from './bn.json'

const i18n = createI18n({

    locale: localStorage.getItem('lang')==null?'bn':localStorage.getItem('lang'),
    messages: {en,bn}
})

export default i18n;