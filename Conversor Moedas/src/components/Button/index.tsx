import {TouchableOpacity,TouchableOpacityProps,Text,ActivityIndicator} from "react-native"
import {Ionicons} from "@expo/vector-icons"
import {style} from "./style"

interface ButtonProps extends TouchableOpacityProps{
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
}

export function Button({title,isLoading=false,icon, ...rest}:ButtonProps){
    return(
    <TouchableOpacity style={style.container} disabled={isLoading} activeOpacity={0.8}{...rest}>
<>
  {isLoading ? <ActivityIndicator color="white" /> : null}
  <Ionicons name={icon} style={style.icon}/>
  <Text style={style.text}>{title}</Text>
</>
    </TouchableOpacity>
    )
}