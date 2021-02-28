import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Supervisor from '../pages/Supervisor'
import MapForSupervisor from '../pages/Map'

const Initials = createStackNavigator()

const InitialsRoutes: React.FC = ()=>(
    <Initials.Navigator
    screenOptions={{
        headerShown: false,
        cardStyle:{backgroundColor: '#354BAC'}
    }}

    >
        
        <Initials.Screen name="Login" component={Login}/>
        <Initials.Screen name="Register" component={Register}/>
        <Initials.Screen name="Supervisor" component={Supervisor}/>
        <Initials.Screen name="MapForSupervisor" component={MapForSupervisor}/>
    </Initials.Navigator>
)   
export default InitialsRoutes