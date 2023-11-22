import { StyleSheet } from 'react-native'

export const styles = ({xBody, yBody, widthBody, heightBody}) => StyleSheet.create({
    Obstacle: {
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        resizeMode: 'cover'
    }
})