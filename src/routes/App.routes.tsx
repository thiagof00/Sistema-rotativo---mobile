import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '../pages/Home'
import FormCoins from '../pages/FormCoins'
import FormCars from '../pages/FormCar'
import FormCarUpdate from '../pages/FormCarUpdate'

import Notifications from '../pages/Notifications'
const App = createStackNavigator()

const AppRoutes: React.FC = ()=>(
    <App.Navigator
    screenOptions={{
        headerShown: false,
        cardStyle:{backgroundColor: '#354BAC'}
    }}
    >
        
        <App.Screen name="Home" component={Home}/>
        <App.Screen name="FormCars" component={FormCars} />
        <App.Screen name="FormCarUpdate" component={FormCarUpdate} />
        <App.Screen name="FormCoins" component={FormCoins}/>
        <App.Screen name="Notifications"  component={Notifications}/>

    </App.Navigator>
)   
export default AppRoutes