import React, {useEffect, useRef, useState, useCallback} from 'react'
import {TextInputProps} from 'react-native'
import {useField} from '@unform/core'
import {Container, TextInput} from './styles'

interface InputsProps extends TextInputProps{
    name:string;
    defaultV?: string;
}

interface InuputReference {
    value: string
}

const Input: React.FC<InputsProps> = ({name,defaultV, ... rest}) => {
    const {registerField, defaultValue=defaultV, fieldName, error} = useField(name)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<InuputReference>({value: defaultValue})
    const handleSetFocused = useCallback(()=>{ setIsFocused(true) },[])
    const handleSetBlur = useCallback(()=>{ setIsFocused(false) },[])

    useEffect(()=>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            setValue(ref: string, value:string){
                inputRef.current.value = value
            }
        })
    },[fieldName, registerField])

    return (

    <Container isFocused={isFocused}>
    <TextInput 
    onFocus={handleSetFocused}
    onBlur={handleSetBlur}
    placeholderTextColor="#a8a6a6"
    defaultValue={defaultValue}
    onChangeText={value=> {
        inputRef.current.value = value
    }}
    {... rest} />
    </Container>)
}
export default Input