import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'

import {Buttons} from './styles'

interface ButtonProps extends RectButtonProperties {
    children: any;
}


const Button: React.FC<ButtonProps> = ({children, ...rest})=>(
    <Buttons {...rest}>{children}</Buttons>
)
export default Button