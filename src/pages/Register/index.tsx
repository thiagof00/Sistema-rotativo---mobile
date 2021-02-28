import React, { useRef, useCallback } from 'react'
import {useNavigation} from '@react-navigation/native'
import logo from '../../assets/brasao_2019.png'
import InputForm from '../../components/InputForm'
import InputFormDate from '../../components/InputFormDate'
import Button from '../../components/Button'
import { FormHandles } from '@unform/core'
import {ContainerRegister, Logo, FormRegister,Legend, Required
    ,ViewButton, FormS, TextButtonRegister} from './styles'
import api from '../../services/api'
import { Text, ToastAndroid } from 'react-native'


const Register: React.FC = () =>{

    const navigation = useNavigation()

    const formRef = useRef<FormHandles>(null)
    const handleRegister = useCallback(async(data: object)=>{
        try{

        const response = await api.post("/users", data)

            if(response instanceof Object){
                ToastAndroid.showWithGravity('Usuário criado!', 3, ToastAndroid.CENTER)
                navigation.goBack()
            }
            if(response instanceof String){
                ToastAndroid.showWithGravity(`${response.data}`, 3, ToastAndroid.CENTER)
            }

            
        }

        catch(err){
            console.log(err)
        }
    }, [navigation])

return (
<>
<ContainerRegister>
<Logo source={logo} style={{width:240, height: 240}}/>
<FormRegister>
    <Legend>Informações do motorista </Legend>
   <Required>(todos os campos são obrigatórios)</Required> 

   <FormS onSubmit={handleRegister} ref={formRef}>   
   
    <InputForm text="Nome" nameOfInput="nome"/>
    <InputForm text="Sobrenome" nameOfInput="sobrenome" />
    <InputForm text="CPF" nameOfInput="cpf" maxLength={11}/>
    <InputForm text="Email" nameOfInput="email" keyboardType="email-address" autoCapitalize='none'/>
    <InputForm text="Senha" nameOfInput="senha" secureTextEntry autoCapitalize='none'/>
    <InputForm text="Repetir senha" nameOfInput="reptsenha" secureTextEntry autoCapitalize='none'/>
    <InputFormDate text="Data de Nascimento" nameOfInput="dataNasc" placeholder="dd/mm/aaaa"/>

    <Legend>Informações do veículo</Legend>
    <Required>(todos os campos são obrigatórios)</Required> 
    <InputForm text="Placa do veículo" nameOfInput="placa" autoCapitalize='none'/>
    <InputForm text="Modelo" nameOfInput="modelo" autoCapitalize='none'/>
    <InputForm text="Cor" nameOfInput="cor" autoCapitalize='none'/>
    <InputForm text="Ano" nameOfInput="ano" autoCapitalize='none'/>

    <ViewButton>
        <Button onPress={()=>{
        formRef.current?.submitForm()
    }}><TextButtonRegister>Registrar</TextButtonRegister></Button>
    </ViewButton>

</FormS>
</FormRegister>
    </ContainerRegister>
</>
    
)
}
export default Register