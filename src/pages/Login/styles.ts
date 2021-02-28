import { Form } from '@unform/mobile'
import styled from 'styled-components/native'

export const ContainerLogin = styled.View `
width: 100%;
flex-direction:column;

align-items:center;
`
export const Logo = styled.Image `
margin-right: auto;
margin-left: auto;
margin-top: 48px;
`
export const FormLogin = styled.View`
width: 80%;
height:55%;

padding:24px;

flex-direction:column;

background: #FFF;

border-radius:8px;

margin-top:32px;

text-align:center;
align-items:center;

`
export const Formh1 = styled.Text`
font-size:24px;

margin-top:8px;
margin-bottom:46px;

color: #10299C;

`

export const RegisterOption = styled.View `
flex-direction:column;

width:100%;
margin-top:82px;
`
export const RegisterRout = styled.Text`
text-align:center;

font-size:18px;

color:#10299C;

border-bottom-width:1px;
border-bottom-color:red;

`
export const FormS = styled(Form) `
width: 100%;

align-items: center;
`
export const TextButtonLogIn = styled.Text`
font-size: 22px;
color:#FFF;

padding: 4px;
`