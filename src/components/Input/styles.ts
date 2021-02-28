import styled, {css} from 'styled-components/native'


interface ContainerProps{
    isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
width: 100%;
height: 42px;

border-radius:8px;

background:#f0f0f5;

margin-bottom:16px;

${(props) => props.isFocused && css`
    border-color: #10299C;
    border-width:1px;

`}


`
export const TextInput = styled.TextInput `
flex:1;
font-size:16px;
`