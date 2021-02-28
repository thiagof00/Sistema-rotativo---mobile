import React, {useRef, useCallback} from 'react'
import {Text} from 'react-native'
import api from '../../services/api'
import {useAuth} from '../../hooks/auth'
import {FormHandles} from '@unform/core'
import logo from '../../assets/brasao_2019.png'
import logOutImg from '../../assets/logout.png'
import {HeaderFormCars, Content, AreaButton, BackgroundFormCars, Logo,
      ButtonPark,LogOutButton, LogOutImg,FormCoinsArea,SeuSaldo, Saldo,
       InfoSaldo, InputSaldo} from './styles'
import { useNavigation } from '@react-navigation/native'
import { ToastAndroid } from 'react-native'

interface RequestProps {
    saldo: number
}

const FormCoins: React.FC = ()=>{
    const formRef = useRef<FormHandles>(null)
    const navigation = useNavigation()

    const {user, signOut} = useAuth()

      function logOut(){
        signOut()
      }
       const requestApi = useCallback(async(data:RequestProps)=>{

        try{
            const userId = user?.id
            const saldo = data.saldo
            const response = await api.post("users/saldo", {userId, saldo})

            if(response.data instanceof Array){
                ToastAndroid.showWithGravity("Saldo adicionado com sucesso!", 2, ToastAndroid.CENTER)
                navigation.navigate('Home')
            }else{
                ToastAndroid.showWithGravity(`${response.data}`, 2, ToastAndroid.CENTER)
            }
        }catch{
            
        }
       }, [])
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
        <FormCoinsArea ref={formRef} onSubmit={requestApi}>
            <SeuSaldo>Seu Saldo</SeuSaldo>
            <Saldo>R${user?.saldo}</Saldo>

            <InfoSaldo>Informe o saldo desejado:</InfoSaldo>

            <InputSaldo name="saldo"/>

        </FormCoinsArea>
    </Content>


    <AreaButton><ButtonPark onPress={()=>{formRef.current?.submitForm()}}> <Text>ENVIAR</Text></ButtonPark></AreaButton>
    </BackgroundFormCars>
   
    
    </>)
}

export default FormCoins