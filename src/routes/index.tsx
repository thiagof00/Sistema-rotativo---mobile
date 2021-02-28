import React from 'react'
import {ActivityIndicator, View} from 'react-native'
import {useAuth} from '../hooks/auth'
import InitialsRoutes from './auth.routes'
import AppRoutes from './App.routes'
import SupervisorRoutes from './sup.routes'

const Routes: React.FC = ()=>{

    const {loading, isSup, user, sup} = useAuth()

    if(loading){
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#354bac'}}>
            <ActivityIndicator size='large' color='#FFF'/>
        </View>
    }
    if(isSup){
        return <SupervisorRoutes/>
    }

     if(!!user){         
        return <AppRoutes/>
     }else{
         return <InitialsRoutes/>
     }

        
}

export default Routes

