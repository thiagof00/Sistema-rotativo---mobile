import React, {useRef, useState, useEffect, useCallback} from 'react'
import {Image, Text, View, ToastAndroid} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {Modalize} from 'react-native-modalize'
import {Picker} from '@react-native-picker/picker';
import Geolocation from 'react-native-geolocation-service'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import Button from '../../components/Button'

import api from '../../services/api'
import {useAuth} from '../../hooks/auth'
import logo from '../../assets/brasao_2019.png'
import logOutImg from '../../assets/logout.png'
import addImage from '../../assets/button.png'
import notf from '../../assets/notf.png'
import notfHome from '../../assets/notfHome.png'
import edit from '../../assets/edit.png'
import trash from '../../assets/trash.png'

import { useNavigation } from '@react-navigation/native';

import {HeaderHome, Content, AreaButton, BackgroundHome, Logo,
     Veicules, ButtonPark,TextButtonPark, InfoUser, Balance, ImageIcon, YourData,
      Name, BalanceArea, YourBalance, ShowVeicules, YourVeicules,
      ContentModal, InfoForPark,HeaderModal, Times, LogOutButton,MoreButton,
       LogOutImg, AddCoins, AddCoinsButton, AddCars,HeaderCars,AddCarsImg,SelectVeicule,
    ConfirmPark, ConfirmParkButton, RecuseParkButton, Descounted, ButtonParkGetOut,CarParkedView} from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CarsProps{
    id:number;
    placa:string;
    modelo:string;
    cor:string;
    ano:string;
    createdAt: Date;
    updatedAt: Date;
    tempo: string;
    latitude: string;
    longitude:string;
}


const Home: React.FC = ()=>{
    const modalizeRef = useRef<Modalize>(null)
    const modalizeRef2 = useRef<Modalize>(null)
    const modalizeRef3 = useRef<Modalize>(null)
    const modalizeRefMap = useRef<Modalize>(null)
    const [tempo, setTempo] = useState("30");
    const [longitude, setLongitude] = useState(Number)
    const [latitude, setLatitude] = useState(Number)
    const {user, signOut, Park,GetOut, userParked, isNotificated, Notificated, notifications, setCar, carForUpdate} = useAuth()
    const [userParked2, setUserParked2] = useState<CarsProps>({} as CarsProps)
    const [carros, setCarros] = useState<CarsProps[]>([])
    const navigation = useNavigation()
    const [placa, setPlaca] = useState('')
    var timeForGetOut = moment(userParked2.updatedAt).add(userParked2.tempo, 'minute').format('HH:mm')


    const onOpen = () => {
        modalizeRef.current?.open();
      };
    const onOpen2 = () => {
        modalizeRef.current?.close();
        modalizeRef2.current?.open();
      };
      const onOpen3 = () => {
        modalizeRef3.current?.open();
      };
    const onClose = ()=>{
        modalizeRef2.current?.close();
        modalizeRef.current?.open()
    }
    const onClose2 = ()=>{
        modalizeRef3.current?.close();
    }
    const OpenMap = () => {
        modalizeRefMap.current?.open();
      };



      async function getAll(){
        await Geolocation.getCurrentPosition((info)=>{
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)

        }, err=>{console.log(err)}, { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000,showLocationDialog: true, forceRequestLocation:true })

        
        const response = await api.get(`users/getcars/${user?.id}`)
        
        if(response instanceof Object){
            const cars = response.data

        setCarros(cars)
        }else{
            return 
        }

        
    };
      useEffect(()=>{


        
        async function Teste(){
            const carParked = await AsyncStorage.getItem('tcc:carParked')
            const response = await api.get(`users/getparked/${user?.id}`)
                if(carParked){
                    
                    setUserParked2(JSON.parse(carParked))
                    
                }
                if(response.data instanceof Object){
                    setUserParked2(response.data)
                }
        }
        setTimeout(()=>{async function getNotifications() {
            const response = await api.get(`users/pushcarwithnotifications/${user?.id}`)

            
                console.log(notifications)
                if(response.data instanceof Object ){
                if(response.data.length == notifications.length){
                    return 
                }else{
                    await AsyncStorage.setItem('tcc:notifications', JSON.stringify(response.data))
                    Notificated(true)
                    console.log('é aqui')

                }}}
            getNotifications()
        }, 10000, )
        
        getAll()
        Teste()
      },[carForUpdate]);

      function logOut(){
        signOut()
      };


     async function requestApi(){

            const response = await api.post('users/park',{placa, tempo, longitude, latitude})
            const {car} = response.data

         if(response.data instanceof Object){

            await AsyncStorage.setItem('tcc:carParked', JSON.stringify(car))
            console.log("car", car)
            setUserParked2(car)
            Park()  
            ToastAndroid.showWithGravity("Carro estacionado!",2,ToastAndroid.CENTER)

            
        }
        else{
            ToastAndroid.showWithGravity(`${response.data}`,2,ToastAndroid.CENTER)

        }

    }
    async function DeleteCar(id: number) {
        
        const response = await api.delete(`users/deletecar/${id}`)

        if(response.data){
            ToastAndroid.showWithGravity(`${response.data}`, 4, ToastAndroid.CENTER)
            getAll()     
        }
    }


    async function ParkOut(){

        const response = await api.get(`users/getout/${user?.id}`)

        if(response){
            GetOut()
            await AsyncStorage.removeItem('tcc:carParked')

            setUserParked2({})
        }
                

    }

    return(
    <>
    <BackgroundHome>
    <HeaderHome>
        {isNotificated==true ? <LogOutButton onPress={()=>{navigation.navigate('Notifications')}}>
        <Image source={notfHome} style={{width:40, height: 40}}/>
        </LogOutButton> :  <LogOutButton onPress={()=>{navigation.navigate('Notifications')}}>
        <Image source={notf} style={{width:40, height: 40}}/>
        </LogOutButton>}
        

        <Logo source={logo} style={{width:80, height: 80}}/>
        <LogOutButton onPress={logOut}>
            <LogOutImg source={logOutImg}/>
        </LogOutButton>
    </HeaderHome>
    <Content>

        <View style={{width:'100%', flexDirection:'row', height: '60%'}}>

        
    <InfoUser>
    <YourData>
        Seus dados
    </YourData>
    <ImageIcon/>
    <Name>{user?.nome} {user?.sobrenome}</Name>
    <Text>{user?.cpf}</Text>
    </InfoUser>

    <BalanceArea>
    <YourBalance>
    Seu saldo
    </YourBalance>
    <Balance>
    R${user?.saldo}
    </Balance>
    <AddCoinsButton onPress={()=>{navigation.navigate('FormCoins')}}>
        <AddCoins>Adicionar saldo</AddCoins>
    </AddCoinsButton>
    </BalanceArea>
    </View>
        {userParked && <CarParkedView>
        <Text style={{fontSize:26, color:'#c10108',fontWeight: '600'}}>Carro estacionado</Text>
        <Text style={{fontSize:18}}>Usando a placa: {userParked2.placa} </Text>
        <View style={{flexDirection: 'row'}}>
        <Text>Você sai as </Text>
        <Text style={{color:'#354bac', fontWeight: '700'}}>{timeForGetOut}</Text>
        
        </View>
        <Button style={{width: '100%', height: 40, marginTop: 8, backgroundColor: '#354bac', borderRadius: 4, flexDirection: 'row', alignItems: 'center', padding:4}} onPress={()=>{OpenMap()}}><Text style={{color: '#FFF'}}>Visualizar no mapa</Text></Button>
        </CarParkedView>
        }
        
    </Content>

    <Veicules>
        <HeaderCars>
          <YourVeicules>Seus veículos</YourVeicules>
        <AddCars onPress={()=>{navigation.navigate('FormCars')}}>
            <AddCarsImg source={addImage}/>
        </AddCars>
        </HeaderCars>
        
        {carros.map((car:CarsProps) =>(
            <ShowVeicules key={car.id}>
            <Text>{car.placa}</Text>
            <Text>{car.modelo}</Text>
            <Text>{car.cor}</Text>
            <Text>{car.ano}</Text>
            <TouchableOpacity onPress={()=>{setCar(car), navigation.navigate("FormCarUpdate")}}>
                <Image source={edit} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{DeleteCar(car.id)}}>
                <Image source={trash} style={{width: 20, height: 20}}/>
            </TouchableOpacity>
            </ShowVeicules>
        ))}
    </Veicules>
        {userParked ? <AreaButton><ButtonParkGetOut onPress={()=>{onOpen3()}}><TextButtonPark>SAIR</TextButtonPark></ButtonParkGetOut></AreaButton> : <AreaButton><ButtonPark onPress={onOpen}><TextButtonPark>ESTACIONAR</TextButtonPark></ButtonPark></AreaButton>}
    </BackgroundHome>
        <Modalize ref={modalizeRef3} modalHeight={340}>

    <ConfirmPark>
    Tem certeza de que deseja sair?
    </ConfirmPark>

    <View style={{flexDirection:'row', justifyContent:'space-between', padding:12}}>
    <ConfirmParkButton onPress={()=>{ParkOut(); onClose2()}}>
    <TextButtonPark>SIM</TextButtonPark>
    </ConfirmParkButton>
    <RecuseParkButton onPress={()=>{onClose2()}}>
    <TextButtonPark>NÃO</TextButtonPark>
    </RecuseParkButton>
    </View>

    </Modalize>


    <Modalize ref={modalizeRef} modalHeight={600} >

    <ContentModal>
 <BalanceArea>
    <YourBalance>
    Seu saldo
    </YourBalance>
    <Balance>
    R${user?.saldo}
    </Balance>
    </BalanceArea>
    
    <HeaderModal>

       <View style={{paddingBottom:2, paddingTop:3, marginTop:'10%'}}>
           <SelectVeicule>
            Tempo
            </SelectVeicule>
        <Picker
        selectedValue={tempo}
        style={{height: 50, width: 140, marginLeft:16}}
        onValueChange={(itemValue, itemIndex)=>{
            const Value = String(itemValue)
            setTempo(Value)  
        }}

        >
            <Picker.Item label="30 minutos" value='30' />
            <Picker.Item label="1 hora" value="60" />
            <Picker.Item label="2 horas" value="120" />

        </Picker>

       </View>
    

    <InfoForPark>
    <SelectVeicule>
    Veículo
    </SelectVeicule>

    <Picker
        selectedValue={placa}
        style={{height: 50, width: 120, marginLeft: 60,marginRight:16}}
        onValueChange={(itemValue, itemIndex)=>{
            const Value = String(itemValue)
            setPlaca(Value)
            
        }}

        >
        <Picker.Item label='Selecione' value=''/>

            {carros.map((car:CarsProps)=>(

            <Picker.Item label={car.placa} value={car.placa} key={car.placa}/>
    ))}

        </Picker>

    </InfoForPark>
    
    </HeaderModal>

    <Descounted>Valor descontado do seu saldo: R${tempo == "30" && 1}{tempo == "60" && 3}{tempo == "120" && 6}</Descounted> 

        
    {user?.saldo == 0 &&<Text>Seu saldo está abaixo de qualquer valor setado, por favor, recarregue alguns créditos2</Text>}
    {placa == '' ? <Text> Selecione um veículo para estacionar</Text> : <ButtonPark onPress={()=>{
            onOpen2()
        }}>
        <TextButtonPark>ESTACIONAR</TextButtonPark>
        </ButtonPark>}
  

    </ContentModal>
    </Modalize>
    <Modalize ref={modalizeRef2} modalHeight={340}>

    <ConfirmPark>
        Tem certeza estacionar por {tempo} minutos com o veículo de placa {placa}?
    </ConfirmPark>

<View style={{flexDirection:'row', justifyContent:'space-between', padding:12}}>
    <ConfirmParkButton onPress={()=>{requestApi(); modalizeRef2.current?.close();}}>
    <TextButtonPark>SIM</TextButtonPark>
    </ConfirmParkButton>
    <RecuseParkButton onPress={()=>{onClose()}}>
    <TextButtonPark>NÃO</TextButtonPark>
    </RecuseParkButton>
</View>
    
    </Modalize>
    <Modalize ref={modalizeRefMap} modalHeight={600}>
    <MapView
        style={{height: 560, width:'100%', marginTop:16}}
        loadingEnabled={true}
        mapType='terrain'
        showsUserLocation={true}
        toolbarEnabled={true}
        initialRegion={{
        latitude: parseFloat(userParked2.latitude),
        longitude:parseFloat(userParked2.longitude),
        latitudeDelta: 0.0005,
        longitudeDelta: 0.004,
                    }}>
                    <Marker pinColor='#354bac' coordinate={{latitude: parseFloat(userParked2.latitude), longitude: parseFloat(userParked2.longitude)}}>
                    
                    </Marker>
        

      </MapView>

    </Modalize>



    </>)
}

export default Home