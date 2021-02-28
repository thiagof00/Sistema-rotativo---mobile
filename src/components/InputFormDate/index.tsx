import React from 'react'
import Input from '../Input'

import {Label, Container} from './styles'

interface TextLabel {
    text:string
    nameOfInput:string
}
const InputFormDate: React.FC <TextLabel>= ({text, nameOfInput,...rest})=>{
    return(
        <Container>
        <Label>{text}</Label>
        <Input name={nameOfInput} {...rest} />   
        </Container>
    )
}  



export default InputFormDate