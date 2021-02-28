import { Form } from '@unform/mobile'
import styled from 'styled-components/native'

export const ContainerRegister = styled.ScrollView `
width: 100%;
height:100%;

flex-direction:column;

margin-bottom:24px;
`
export const Logo = styled.Image `
margin-right: auto;
margin-left: auto;
margin-top: 48px;
`
export const FormRegister = styled.View `

background: #FFF;

width:88%;
height:80%;

margin-right:auto;
margin-left:auto;
margin-top:32px;

justify-content:space-between;

flex-direction:row;
flex-wrap:wrap;

align-items:center;

padding:16px;

border-radius:8px;
`
export const Legend = styled.Text`

font-size:22px;
color:#354BAC;
font-weight:bold;

margin-top:8px;
margin-bottom:16px;
`
export const Required = styled.Text`
color: red;
margin-bottom:8px;
`
export const ViewButton = styled.View`
width:100%;
align-items:center;
`
export const FormS = styled(Form)`
width: 100%;

justify-content:space-between;

flex-direction:row;
flex-wrap:wrap;

align-items:center;

`
export const TextButtonRegister = styled.Text`
font-size: 22px;
color: #FFF;
`