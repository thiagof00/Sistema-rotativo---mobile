import React, { useState, useRef, useEffect, useCallback }from 'react'
import {View, Text, Image, ToastAndroid} from 'react-native'
import api from '../../services/api'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native'
import {useAuth} from '../../hooks/auth'
import { Form } from '@unform/mobile'
import {FormHandles} from '@unform/core'
import logo from '../../assets/brasao_2019.png'
import logOutImg from '../../assets/logout.png'
import location from '../../assets/location.png'
import notf from '../../assets/notf.png'
import notf1 from '../../assets/notify1.png'
import notf2 from '../../assets/notify2.png'
import map from '../../assets/map.png'
import {Modalize} from 'react-native-modalize'
import MapView, {Callout, Marker} from 'react-native-maps';
import {HeaderSup, ContentSup, BackgroundSup, Logo, InfoSup,
     NameSup, Sup, Name, DateAndHour, Date, Hour, LocalButton, MultButton,
      NotfButton, CarView, InfoCar, Board,LogOutButton,LogOutImg, FilterCars,
    SubmitFilter, InputFilter} from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import InputForm from '../../components/InputForm';
import Input from '../../components/Input';
import Button from '../../components/Button';

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
    createdAt: any;
    updatedAt: any;
}
interface dataProps{
    nome: string;
    motivo:string;
    placa:string;
}

const Supervisor: React.FC = ()=>{

    const navigation = useNavigation()
    const {signOut, sup} = useAuth()
    const [cars, setCars] = useState<CarsEstProps[]>()
    const [carForExposed, setCarForExposed] = useState<CarsEstProps>({} as CarsEstProps)
    const [empty, setEmpty] = useState(false)
    const modalizeRef = useRef<Modalize>(null)
    const modalizeRef2 = useRef<Modalize>(null)
    const formRef = useRef<FormHandles>(null)
    function ConfirmNotf(){
         ToastAndroid.showWithGravity("Usuário notificado com sucesso!",2,ToastAndroid.CENTER)
    }
    function NotfHasBeenFailed(){
        ToastAndroid.showWithGravity("Ocorreu um erro ao notificar o usuário", 2, ToastAndroid.CENTER)
    }
    function NotFine(){
        ToastAndroid.showWithGravity("Esse veículo ainda está dentro do seu horário, não é possível multar",5, ToastAndroid.CENTER)
    }
    function FineButtons(car:CarsEstProps){
        if(car.notf > 3 && moment(car.updatedAt).add(Number(car.tempo), 'minute').isBefore(moment())){
          return  <View style={{flexDirection: 'row', width: 60}}>
        <LocalButton onPress={()=>{onOpen(car)}}>
            <Image source={location} style={{height: 30, width: 30}}/>
        </LocalButton>
        <MultButton onPress={()=>{OpenModalForFine(car.placa)}}><Text>MULTAR</Text></MultButton>

        </View>
        }
        if(car.notf > 3 && moment(car.updatedAt).add(Number(car.tempo), 'minute').isAfter(moment())){
   return <View style={{flexDirection: 'row', width: 60}}>
        <LocalButton onPress={()=>{onOpen(car)}}>
            <Image source={location} style={{height: 30, width: 30}}/>
        </LocalButton>
        <MultButton onPress={()=>{NotFine()}}><Text>MULTAR</Text></MultButton>

        </View>
        }
        if(car.notf < 3 && moment(car.updatedAt).add(Number(car.tempo), 'minute').isAfter(moment())){
            return <View style={{flexDirection: 'row', width: 60}}>
            <LocalButton onPress={()=>{onOpen(car)}}>
                <Image source={location} style={{height: 30, width: 30}}/>
            </LocalButton>
            <NotfButton onPress={()=>{notifyTheUser(car.id)}}> 
            {car.notf == 0 && <Image source={notf} style={{height: 30, width: 30}}/>}
            {car.notf == 1 && <Image source={notf1} style={{height: 30, width: 30}}/>}
            {car.notf == 2 && <Image source={notf2} style={{height: 30, width: 30}}/>}

        </NotfButton>
            </View>
        }else{
            return  <View style={{flexDirection: 'row', width: 60}}>
            <LocalButton onPress={()=>{onOpen(car)}}>
                <Image source={location} style={{height: 30, width: 30}}/>
            </LocalButton>
            <MultButton onPress={()=>{OpenModalForFine(car.placa)}}><Text>MULTAR</Text></MultButton>
    
            </View>
        }

         

    }
    function logOut(){
        signOut()
      }
    

    const onOpen = (car: CarsEstProps)=>{
        modalizeRef.current?.open()
        setCarForExposed(car)

    }
    const OpenModalForFine = (placa:string)=>{
        modalizeRef2.current?.open()
    }

    async function LoadData(){

        const response = await api.get("supervisor")

        if(response.data instanceof Object){
            setCars(response.data) 
        }
        if(response.data instanceof String){
            setEmpty(true)
        }}

    setTimeout(()=>{
        
        LoadData()
    },6000)
    
    async function notifyTheUser(id:number){
            var nome = sup?.nome
            const response = await api.post(`supervisor/notify/${id}`, nome)
        if(response){
            ConfirmNotf()
        }else{
            NotfHasBeenFailed()
        }

        
    }
    const handleFined = useCallback(async (data: dataProps )=>{

         const response = await api.post("supervisor/fined", data)

         if(response){
            console.log(response)
         }
        

    }, [])

    return (
        
        <>
        <StatusBar backgroundColor='#e5e5e3' />


        <BackgroundSup>
        <HeaderSup>
        <Logo source={logo} style={{width:80, height: 80}}/>

        <InfoSup>
            <NameSup>
              <Sup>
            Supervisor
        </Sup>
        <Name>
            {sup?.nome} {sup?.sobrenome}
        </Name>
            </NameSup>
        

        <DateAndHour>
            <Hour>
            {moment().format('HH:mm')}
        </Hour>
            <Date>
            </Date>
        
        </DateAndHour>
        <LogOutButton onPress={logOut}>
            <LogOutImg source={logOutImg}/>
        </LogOutButton>
        </InfoSup>
        </HeaderSup>

        <FilterCars>
            <TouchableOpacity style={{flexDirection:'row', alignItems:'center', backgroundColor:'#e3e5e5', borderRadius:8, flex:1, paddingLeft:'32%', paddingRight:4,
        width:400}} onPress={()=>{navigation.navigate('MapForSupervisor')}}>
                <Image source={map} style={{height: 40, width: 40, marginTop: 4}}/>

                <Text style={{color:'#e33131'}}>Veja o mapa inteiro</Text>
            </TouchableOpacity>


        </FilterCars>

        <ContentSup>
        { cars?.map(car=>(
            <CarView key={car.id}>
            <InfoCar>
            <Board>
        {car.placa}
            </Board>
            {moment(car.updatedAt).add(Number(car.tempo), 'minute').isAfter(moment()) ? <Text style={{fontSize:18, fontWeight:'600'}}>
            Saída:  {moment(car.updatedAt).add(Number(car.tempo), 'minute').format('DD/MM HH:mm')}
            </Text> : <Text style={{fontSize:18, fontWeight:'700', color:"#e33131"}}>
            Saída:  {moment(car.updatedAt).add(Number(car.tempo), 'minute').format('DD/MM HH:mm')}
            </Text>}
            
            <Text>
        {car.modelo}, {car.ano}
            </Text>           
            </InfoCar>

           {FineButtons(car)}

        
        </CarView>
        ))}

        </ContentSup>

        </BackgroundSup>

        <Modalize ref={modalizeRef} modalHeight={600} disableScrollIfPossible>
        <MapView
        style={{height: 560, width:'100%', marginTop:16}}
        loadingEnabled={true}
        mapType='terrain'
        showsUserLocation={true}
        toolbarEnabled={true}
        initialRegion={{
        latitude: parseFloat(carForExposed.latitude),
        longitude:parseFloat(carForExposed.longitude),
        latitudeDelta: 0.0005,
        longitudeDelta: 0.1,
                    }}>
                    <Marker pinColor='#354bac' coordinate={{latitude: parseFloat(carForExposed.latitude),longitude:parseFloat(carForExposed.longitude)}} key={carForExposed.id}>
                    <Callout>
                    <View style={{flex:1, backgroundColor: '#FFF'}}>
                        <Text>
                            {carForExposed.placa}
                        </Text>
                        <Text>{carForExposed.tempo}</Text>
                    </View>
                    </Callout>
                    </Marker>
        

      </MapView>

        </Modalize>
        <Modalize ref={modalizeRef2} modalHeight={400}>
        <Form ref={formRef} onSubmit={handleFined} style={{width: '100%', height: '100%', alignItems: 'center'}}>
            <View style={{alignItems:'center', justifyContent: 'center'}}>
            <View style={{flexDirection:'row', padding: 24}}>
            <InputForm text="Nome do supervisor" nameOfInput="nome" defaultV={sup?.nome} defaultValue={sup?.nome}/>
            <InputForm text="Placa do veículo" nameOfInput="placa" />
            </View>
            </View> 
                    <Input name="motivo" placeholder="Digite aqui o motivo"/>

                    <Button onPress={()=>{formRef.current?.submitForm(), modalizeRef2.current?.close()}}>
                        MULTAR
                    </Button>
        </Form>
        </Modalize>
        
        </>
    )
}

export default Supervisor