/**
 * @format
 */
import {AppRegistry} from 'react-native';
import RNAndroidNotificationListener, { RNAndroidNotificationListenerHeadlessJsName } from 'react-native-android-notification-listener';


import App from './src/App.tsx';
import {name as appName} from './app.json';
const status = async ()=>{
    await RNAndroidNotificationListener.getPermissionStatus(); 
} ;

console.log(status);
// console.log(RNAndroidNotificationListener.getPermissionStatus());
console.log(RNAndroidNotificationListener.getPermissionStatus());

// RNAndroidNotificationListener.requestPermission();

const headlessNotificationListener = async ({ notification }) => {
    // 백그라운드 처리
    console.log(notification.text);
    console.log(notification.subText);
    console.log(notification.app);
    console.log(notification.bigText);
    console.log(notification.title);
    console.log(notification.titleBig);
}

AppRegistry.registerHeadlessTask(RNAndroidNotificationListenerHeadlessJsName,	() => headlessNotificationListener)
AppRegistry.registerComponent(appName, () => App);
