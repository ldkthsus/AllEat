import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store, persistor} from './redux/store';
import AppNavigator from './navigation/AppNavigator'; // 네비게이터 임포트
import ReportNavigator from './features/report/components/ReportNavigator';
import {PersistGate} from 'redux-persist/integration/react';
function App() {
  return (
    <Provider store={store}>
      {/* <ReportNavigator /> */}
      <NavigationContainer>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
