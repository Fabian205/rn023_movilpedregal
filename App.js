import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import MainStack from './navigation/MainStack';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';

function App() {
  const[mode, setMode] = useState(false);
  useEffect(() =>{
    let eventListener = EventRegister.addEventListener("changeTheme",(data) => {
      setMode(data);
    });
    return () =>{
      EventRegister.removeEventListener(eventListener);
    }
  });

  return (
    <themeContext.Provider value ={mode === true ? theme.dark : theme.light}>
      <SafeAreaView  style = {{ flex: 1, marginTop:Platform.OS === 'ios' ? -20 : 0,}}>
        <MainStack/>       
      </SafeAreaView>
    </themeContext.Provider>
  );
}

export default App;
