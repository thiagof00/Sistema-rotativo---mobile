import React, {useRef, useState, useEffect} from 'react'
import {Image, Text, ToastAndroid} from 'react-native'

import moment from 'moment'
import api from '../../services/api'
import {useAuth} from '../../hooks/auth'
import logo from '../../assets/brasao_2019.png'
import logOutImg from '../../assets/logout.png'
import info from '../../assets/info.png'
import danger from '../../assets/danger.png'
import { useNavigation } from '@react-navigation/native';

import {HeaderHome, Content, BackgroundHome, Logo, LogOutButton, LogOutImg, Notification, TextNotification} from './styles'

interface notificationsProps{
  id: number  
  createdAt: string;
  nomeSupervisor: string
}
interface FinesProps{
  id: number;
  nomeSupervisor: string;
  motivo: string;
  createdAt: string;

}

const Notifications: React.FC = ()=>{
    const {user, signOut, Notificated} = useAuth()
    const [notifications, setnotifications] = useState<notificationsProps[]>([])
    const navigation = useNavigation()
    const [placa, setPlaca] = useState('')
    const [fines, setFines] = useState<FinesProps[]>([])
    



      useEffect(()=>{

        async function getAll2(){
          Notificated(false)


            const response = await api.get(`users/pushcarwithnotifications/${user?.id}`)
            
            if(response.data instanceof Array || response.data instanceof Object){
              const notifications = response.data

              setnotifications(notifications.findCarWithNotifications)
              setFines(response.data.findCarsWithFines)
            }
            if(response.data instanceof String){
              ToastAndroid.showWithGravity(`${response.data}`, 4, ToastAndroid.CENTER)

            }
        }

        getAll2()
    },[])

      function logOut(){
        signOut()
      }


    return(
    <>
    <BackgroundHome>
    <HeaderHome>
        

        <Logo source={logo} style={{width:80, height: 80}}/>
        <LogOutButton onPress={()=>{navigation.goBack()}}>
            <LogOutImg source={logOutImg}/>
        </LogOutButton>
    </HeaderHome>
    <Content>
      {fines.map((fine)=>(
        <Notification key={fine.id}>
        <Image source={danger} style={{width:40, height: 60, margin: 16}}/>
        <TextNotification>
          <Text style={{fontSize: 22, fontWeight: '700'}}>Você recebeu uma multa! Tome cuidado.</Text>
          <Text style={{fontSize:16, width:'60%' }}>Verifque se o tempo do seu veículo não passou do prazo
ou se você realmente estacionou.Supervisor: {fine.nomeSupervisor}</Text>

          <Text style={{paddingLeft:'40%', color: '#d8d8d8'}}>{moment(fine.createdAt).format('DD/MM/yy - HH:mm')}</Text>
        </TextNotification>
      </Notification>
      ))}

      { notifications?.map((notification)=>(
        <Notification key={notification.id}>
          <Image source={info} style={{width:40, height: 60, margin: 16}}/>
          <TextNotification>
            <Text style={{fontSize: 22, fontWeight: '700'}}>Você foi notificado!</Text>
            <Text style={{fontSize:16, width:'60%' }}>Verifque se o tempo do seu veículo não passou do prazo
 ou se você realmente estacionou.Supervisor: {notification.nomeSupervisor}</Text>

            <Text style={{paddingLeft:'40%', color: '#d8d8d8'}}>{moment(notification.createdAt).format('DD/MM/yy - HH:mm')}</Text>
          </TextNotification>
        </Notification>
              ))}
        
    </Content>
    </BackgroundHome>
        

    
    
    </>)
}

export default Notifications