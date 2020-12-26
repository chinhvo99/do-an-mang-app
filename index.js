/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/app/app';
import {name as appName} from './app.json';

YellowBox.ignoreWarnings([
  'Cannot update during an existing state transition',
]);
AppRegistry.registerComponent(appName, () => App);
