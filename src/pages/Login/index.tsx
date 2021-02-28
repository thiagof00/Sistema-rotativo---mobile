import React, {useCallback, useContext, useRef} from 'react'
import { Text, ToastAndroid } from 'react-native'

import logo from '../../assets/brasao_2019.png'
import { FormHandles } from '@unform/core'
import Button from '../../components/Button'
import Input from '../../components/Input'
import {useAuth} from '../../hooks/auth'

import {useNavigation} from '@react-navigation/native'
import {ContainerLogin, Logo, FormLogin, Formh1,RegisterRout,RegisterOption, FormS,
    TextButtonLogIn} from './styles'


interface SignInFormData {
    cpf:string
    senha: string
}

const Login: React.FC = () =>{
    const navigation = useNavigation() 
    const formRef = useRef<FormHandles>(null)
    const {signIn, user} = useAuth()

    const handleLogIn = useCallback(
        async(data: SignInFormData)=>{
        
    try{
         const response = await signIn({
            cpf:data.cpf,
            senha:data.senha
        })
        
        if(response){
            ToastAndroid.showWithGravity(response, 6, ToastAndroid.CENTER)
        }

    }catch(err){
        ToastAndroid.showWithGravity('Não foi possível conectar ao servidorm, por favor tente mais tarde', 4, ToastAndroid.CENTER)
    }

    }, [ signIn])

return (
    

    <ContainerLogin>
        
        <Logo source={logo} style={{width:160, height: 160}}/>
        
    <FormLogin>
    
        <Formh1>ESTACIONATCHÊ</Formh1>

    <FormS onSubmit={handleLogIn} ref={formRef}>  
    <Input name="cpf" placeholder="CPF" maxLength={11} keyboardType="default"/>
    <Input name="senha" placeholder="senha" secureTextEntry/>
 

    <Button style={{marginTop:0, width:'100%'}}  onPress={()=>{
        formRef.current?.submitForm()
    }}><TextButtonLogIn>ENTRAR</TextButtonLogIn></Button>
    <RegisterOption>
    <RegisterRout onPress={()=>{navigation.navigate("Register")}}>Registre-se</RegisterRout>
</RegisterOption>
    </FormS>

    </FormLogin>
    
    </ContainerLogin>
    
)
}   
    export default Login