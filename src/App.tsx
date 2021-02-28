import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import AppProvider from './hooks'

import Routes from './routes'

const App: React.FC = ()=> (
    <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#354BAC"/>
    
    <View style={{backgroundColor: '#354BAC', flex:1}}>
    <AppProvider>
        <Routes/>
    </AppProvider>
    </View>
    
    </NavigationContainer>
)

export default App