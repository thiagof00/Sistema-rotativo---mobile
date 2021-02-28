import AsyncStorage from '@react-native-community/async-storage'
import React, {createContext, useState, useCallback,useEffect, useContext, useReducer} from 'react'
import api from '../services/api'

interface SignInCredentials {
    cpf: string;
    senha: string;
  }

interface User{
  id:number;
  nome:string;
  sobrenome:string;
  cpf:string;
  senha: string;
  email:string;
  saldo?: Number;
}

interface ContextProps {
    isSup: boolean;
    sup: User | null;
    user:  User;
    loading: boolean
    signIn(credentials: SignInCredentials): Promise<any>;
    signOut():void
    userParked: boolean
    Park(): void
    GetOut(): void
    Notificated(data:boolean): void
    isNotificated: boolean
    notifications: NotificationsProps[]
    carForUpdate:CarsProps;
    setCar(car: CarsProps): void
}
interface NotificationsProps{
  id:number;
  nomeSupervisor: string;
  createdAt: string;
}interface CarsProps{
  id:number
  placa:string;
  modelo:string;
  cor:string;
  ano:string;

}
interface AuthState{
  user: User;
}
// interface AuthStateForSup{
//   sup: User | null;
// }

const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider: React.FC = ({children})=>{

    const [data, setData] = useState<AuthState>({} as AuthState)
    const [supData, setSupData] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [parked, setParked] = useState(false)
    const [isNotificated, setIsNotificated] = useState(false)
    const [notifications, setNotifications] = useState<NotificationsProps[]>([])
    const [carForUpdate, setCarForUpdate] = useState<CarsProps>({} as CarsProps)

    const setCar = useCallback((car:CarsProps)=>{
      setCarForUpdate(car)
    },[])
    useEffect(()=>{
        async function loadStorage(): Promise<void>{
            const sup = await AsyncStorage.getItem('tcc:sup')
            const user = await AsyncStorage.getItem('tcc:user')
            const parked = await AsyncStorage.getItem('tcc:parked')
            const notf = await AsyncStorage.getItem('tcc:notifications')

            if(notf){
                setNotifications(JSON.parse(notf))
            }
            if(sup){
              setSupData(JSON.parse(sup))
            }
            if(user){
                setData(JSON.parse(user))
            }
            if(parked == 'true'){
            setParked(true)
            }

            setLoading(false)
          }

        loadStorage()
    },[])

    const signIn = useCallback(async ({ cpf, senha }) => {
        const response = await api.post('/users/auth', {
          cpf,
          senha,
        });
        if(response.data instanceof Object){
          if(response.data.sup){
            await AsyncStorage.setItem('tcc:sup', JSON.stringify(response.data.sup))
  
            setSupData(response.data.sup)
          }
  
          const user = response.data
  
          await AsyncStorage.setItem('tcc:user', JSON.stringify(user))
  
          setData(user)   
        }
        else{
          return response.data
        }
             
      }, []);
    
      const signOut = useCallback(async ()=>{
        await AsyncStorage.clear()

        setData({} as AuthState)
        setSupData(null)
      }, []) 

      const Park = useCallback(async ()=>{
          setParked(true)
          await AsyncStorage.setItem('tcc:parked', 'true')    
          

          console.log("entrou")        
      }, [])
      
      const GetOut = useCallback(async()=>{
        await AsyncStorage.removeItem('tcc:parked')
          setParked(false)

          console.log("saiu")
      },[])
      const Notificated = useCallback((data:boolean)=>{
        
        setIsNotificated(data)
      },[])
     
    return(
    <AuthContext.Provider value={{isSup:!!supData, setCar,carForUpdate, sup: supData, user: data.user, signIn, signOut,loading, userParked: !!parked, Park, GetOut,Notificated,isNotificated, notifications }}>
      {children}
    </AuthContext.Provider>
    )
}
export function useAuth(): ContextProps {
    const context = useContext(AuthContext)
  
    if(!context) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
  
    return context
  }

export { AuthContext, AuthProvider };