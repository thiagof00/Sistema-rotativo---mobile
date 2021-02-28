import styled from 'styled-components/native'
import Button from '../../components/Button'


export const BackgroundHome = styled.View`
width:100%;
height: 100%;

background: #e5e5e3;

align-items: center;

`
export const HeaderHome = styled.View`
width:100%;
height: 12%;

background: #354bac;

flex-direction:row;
`

export const Content = styled.ScrollView`
width:100%;
height:100%;

background:#FFF;

position: relative;
`

export const Logo = styled.Image `
margin-right: 24%;
margin-left: auto;
margin-top: 8px;
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
export const Notification = styled.View`

width: 100%;


flex-direction: row;

border-bottom-width:1px;
border-bottom-color:#e3e3e5;
`

export const TextNotification = styled.View`

padding-top: 10px;

flex-direction: column;
`