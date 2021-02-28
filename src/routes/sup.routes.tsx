import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Supervisor from '../pages/Supervisor'
import MapForSupervisor from '../pages/Map'

const Sup = createStackNavigator()

const SupRoutes: React.FC = ()=>(
    <Sup.Navigator
    screenOptions={{
        headerShown: false,
        cardStyle:{backgroundColor: '#354BAC'}
    }}

    >
        <Sup.Screen name="Supervisor" component={Supervisor}/>
        <Sup.Screen name="MapForSupervisor" component={MapForSupervisor}/>
    </Sup.Navigator>
)   
export default SupRoutes