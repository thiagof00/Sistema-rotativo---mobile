import { Form } from '@unform/mobile'
import Input from '../../components/Input'
import styled from 'styled-components/native'
import Button from '../../components/Button'


export const BackgroundFormCars = styled.View`
width:100%;
height: 100%;

background: #e5e5e3;

align-items: center;

`
export const HeaderFormCars = styled.View`
width:100%;
height: 12%;

background: #354bac;

flex-direction:row;

`

export const Content = styled.View`
width:88%;
height:40%;

background:#FFF;

margin-top: 24px;

border-radius: 10px;


position: relative;

align-items: center;

`
export const AreaButton = styled.View `
width:100%;

align-items: center;
`
export const Logo = styled.Image `
margin-right: 24%;
margin-left: auto;
margin-top: 8px;
`
export const ButtonPark = styled(Button)`

height: 80px;

padding-top: 26px;
`
export const LogOutButton = styled(Button)`
background: transparent;

width:60px;

margin-top:24px;
`
export const LogOutImg = styled.Image`

width:40px;
height:40px;

`
export const FormCoinsArea = styled(Form)`

width:60%;
height:100%;

align-items:center;

padding-top: 24px;

`
export const SeuSaldo = styled.Text`

font-size:32px;

color:#354bac;

font-weight:bold;

margin-bottom:6px;
`
export const Saldo = styled.Text`

font-size:32px;

color:#00be65;

font-weight:bold;

margin-bottom:6px;
`
export const InfoSaldo = styled.Text`
margin-top:12px;

font-size:18px;

margin-bottom:22px;
`
export const InputSaldo = styled(Input)`
`