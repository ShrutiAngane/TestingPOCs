/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Demo from './Demo';
import Mux from './Mux';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Demo);
