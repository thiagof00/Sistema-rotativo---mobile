import React, { useState, useRef }from 'react'
import {View, Text, Image, ToastAndroid} from 'react-native'
import api from '../../services/api'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native'
import {useAuth} from '../../hooks/auth'
import {FormHandles} from '@unform/core'
import map from '../../assets/map.png'
import {Modalize} from 'react-native-modalize'
import MapView, {Marker, Callout} from 'react-native-maps';
import { ContentSup, BackgroundSup, Logo} from './styles'


interface CarsEstProps {
    id: number;
    placa:string;
    cor:string;
    modelo:string;
    ano:string;
    notf:number;
    multa:number
    tempo:string
    latitude: any;
    longitude: any;
}

const MapForSupervisor: React.FC = ()=>{

    const navigation = useNavigation()
    const {signOut} = useAuth()
    const [cars, setCars] = useState<CarsEstProps[]>()
    const [empty, setEmpty] = useState(false)
    const modalizeRef = useRef<Modalize>(null)
    const formRef = useRef<FormHandles>(null)


    function ConfirmNotf(){
         ToastAndroid.showWithGravity("Usuário notificado com sucesso!",2,ToastAndroid.CENTER)
    }
    function NotfHasBeenFailed(){
        ToastAndroid.showWithGravity("Ocorreu um erro ao notificar o usuário", 2, ToastAndroid.CENTER)
    }
 
    function logOut(){
        signOut()
      }


    setTimeout(()=>{
        async function LoadData(){

        const response = await api.get("supervisor")

        if(response.data instanceof Object){
            setCars(response.data) 
        }
        if(response.data instanceof String){
            setEmpty(true)
        }}

        LoadData()
    },10000)
    
    async function notifyTheUser(id:number){

        try{
            const response = await api.get(`supervisor/notify/${id}`)

        if(response){
            ConfirmNotf()
        }else{
            NotfHasBeenFailed()
        }
        }catch{
            console.log("nao foi")
        }
        
    }

    return (
        <>
        <StatusBar backgroundColor='#FFF' translucent/>
        <ContentSup>
        <MapView
        style={{height: 1080, width:'100%'}}
        loadingEnabled={true}
        mapType='standard'
        showsUserLocation={true}
        toolbarEnabled={true}
        initialRegion={{
            longitude:-57.0841114,
            latitude:-29.776829,
            latitudeDelta: 0.0005,
        longitudeDelta: 0.08,
        }}
        >

        {cars?.map(car=>(
            <Marker pinColor='#354bac' coordinate={{latitude: parseFloat(car.latitude),longitude:parseFloat(car.longitude)}} key={car.id}>
            <Callout>
                    <View style={{flex:1, backgroundColor: '#FFF'}}>
                        <Text>
                            {car.placa}
                        </Text>
                        <Text>{car.tempo}</Text>
                    </View>
                    </Callout>
            </Marker>
        ))}

      </MapView>
        

        </ContentSup>
        </>   
    )
}

export default MapForSupervisor