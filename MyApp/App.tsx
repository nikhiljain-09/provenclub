import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppContext} from './src/store';
import Main from './src/screens/Main';

function App() {
  return (
    <AppContext>
      <SafeAreaView>
        <Main />
      </SafeAreaView>
    </AppContext>
  );
}

export default App;
