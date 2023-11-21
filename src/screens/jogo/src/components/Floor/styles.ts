import { StyleSheet } from 'react-native'

export const styles = ({xBody, yBody, widthBody, heightBody, color}) => StyleSheet.create({
    Flor: {
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        backgroundColor: color,
    }
})