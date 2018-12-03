import I18n from 'react-native-i18n';
import cn from '../../static/lang/cn';
import en from '../../static/lang/en';

I18n.fallbacks = true;

I18n.translations = {
    cn,
    en
};
I18n.locale = "cn"
export default I18n;