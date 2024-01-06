import {showMessage} from 'react-native-flash-message';
import translate from 'translate-google-api';

export default async function ts(text, type) {
  const result = await translate(text, {
    to: 'es',
  });
  showMessage({message: result.toString(), icon: type, type: type});
}
