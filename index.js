/** @format */

import {AppRegistry} from 'react-native';
import Index from './src/router/index';
import {name as appName} from './app.json';
import "./src/common/i18n"

AppRegistry.registerComponent(appName, () => Index);
