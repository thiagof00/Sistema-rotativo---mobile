import React from 'react'
import Input from '../Input'
import {TextInputProps} from 'react-native'

import {Label, Container} from './styles'

interface TextLabel extends TextInputProps{
    text:string
    nameOfInput:string
    defaultV?: string;
}
const InputForm: React.FC <TextLabel>= ({text,defaultV, nameOfInput, ...rest})=>{
    return(
        <Container>
        <Label>{text}</Label>
        <Input name={nameOfInput} {...rest} defaultV={defaultV}/>   
        </Container>
    )
}  



export default InputForm