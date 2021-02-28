import React, {useRef} from 'react'
import {Text} from 'react-native'
import api from '../../services/api'
import {useAuth} from '../../hooks/auth'
import InputForm from '../../components/InputForm'
import {FormHandles} from '@unform/core'
import logo from '../../assets/brasao_2019.png'
import logOutImg from '../../assets/logout.png'
import {HeaderFormCars, Content, AreaButton, BackgroundFormCars, Logo,
      ButtonPark,LogOutButton, LogOutImg,FormCar} from './styles'
import { useNavigation } from '@react-navigation/native'
import { ToastAndroid } from 'react-native'


interface CarsProps{
    placa:string;
    modelo:string;
    cor:string;
    ano:string;

}

const FormCars: React.FC= ()=>{
    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation()
    const {user, signOut, setCar} = useAuth()
    function logOut(){
        signOut()
      }
       async function requestApi(data:CarsProps) {
        const idUser = user?.id
        const response = await api.post("users/cars", {...data, idUser})

        if(response.data instanceof Object){
            ToastAndroid.showWithGravity("Carro criado com sucesso!", 3, ToastAndroid.CENTER)
            setCar(response.data)
            navigation.navigate("Home")
        }else{
            ToastAndroid.showWithGravity(`${response.data}`, 3, ToastAndroid.CENTER)
        }
      }
    return(
    <>
    <BackgroundFormCars>
    <HeaderFormCars>
        <Logo source={logo} style={{width:80, height: 80}}/>
        <LogOutButton onPress={logOut}>
            <LogOutImg source={logOutImg}/>
        </LogOutButton>
    </HeaderFormCars>

    <Content>
        <FormCar ref={formRef} onSubmit={requestApi}>
        <InputForm nameOfInput="placa" text="Placa" />
        <InputForm nameOfInput="modelo" text="modelo" />
        <InputForm nameOfInput="cor" text="cor" />
        <InputForm nameOfInput="ano" text="ano" />

        </FormCar>
    </Content>


    <AreaButton><ButtonPark onPress={()=>{formRef.current?.submitForm()}}><Text>ENVIAR</Text></ButtonPark></AreaButton>
    </BackgroundFormCars>
   
    
    </>)
}

export default FormCars