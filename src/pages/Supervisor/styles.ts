import styled from 'styled-components/native'
import Button from '../../components/Button'
import Input from '../../components/Input'

export const BackgroundSup = styled.View`
height:100%;
background: #e5e5e3;


align-items:center;
`

export const HeaderSup = styled.View`
background: #FFF;

width:88%;
height:14%;

border-radius: 6px;


align-items:center;
flex-direction:row;

`

export const ContentSup = styled.ScrollView`
width: 88%;
height:80%;

background: #FFF;

margin-top:24px;

border-radius: 6px;

`
export const Logo = styled.Image`
margin: 16px;
`
export const InfoSup = styled.View`
justify-content:space-between;

flex-direction: row;
`
export const NameSup = styled.View`

padding-bottom: 24px;

margin-right: 58px;
`
export const Sup = styled.Text `
font-size: 22px;
color: #354bac;
font-weight:bold;

`
export const Name = styled.Text `

`
export const DateAndHour = styled.View `
`

export const Date = styled.Text `

`
export const Hour = styled.Text `
font-size: 22px;
color: #354bac;
font-weight:bold;
`
export const MultButton = styled(Button)`
height: 46px;
background-color: #ea3131;

align-items:center;

border-radius: 24px;

`
export const LocalButton = styled(Button)`
height: 46px;


align-items:center;

border-radius: 24px;

`
export const NotfButton = styled(Button)`
height: 46px;

margin-bottom:4px;
margin-left: 4px;

align-items:center;

background: #030305;

border-radius: 24px;

`
export const CarView = styled.View` 
flex-direction:row;

width:100%;

margin-top: 12px;
`
export const InfoCar = styled.View `

justify-content: space-between;

width:60%;

margin-right: 24px;

padding:4px;
`
export const Board = styled.Text`
font-size: 22px;
color:#354bac;
font-weight: bold;
`
export const LogOutButton = styled(Button)`
background: transparent;

width:60px;

transform: translate(-60px, 40px);
`
export const LogOutImg = styled.Image`

width:40px;
height:40px;

`
export const FilterCars = styled.View`
height: 64px;
width: 100%;

background: #FFF;

margin-top: 16px;


/* flex-direction:row; */

justify-content:space-between;

align-items:center;

position:absolute;

z-index: 999;

margin-top:194%;
`
export const SubmitFilter = styled(Button)`

width: 64px;
height:40px;
`
export const InputFilter = styled(Input)`

`