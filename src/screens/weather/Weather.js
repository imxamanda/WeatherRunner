import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import Api from '../../services/Api'
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';

export default function Weather({navigation, route}) {
  const latitude = route.params.latitude
  const longitude = route.params.longitude
  console.log(latitude)
  console.log(longitude)

  const [apiData, setApiData] = useState(null); 
  useEffect(() =>{
  
 Api.get(`/forecast.json?q=${latitude},${longitude}`)
 .then(res =>{ 
  console.log(res.data)
 })
   
      
   
  }, [latitude, longitude])


  
  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }


console.log(apiData)
  return (
    <View style={styles.container}>
      {/* titulos da pagina */}
     



        <View style={styles.butao}>
            <TouchableOpacity 
              onPress={()=>{ navigation.navigate('Home')}}
          
            style={styles.buttonLarge}>
              <ImageBackground
                style={styles.imagebutao}
                  source={require(`../../../assets/button.png`)}
              >
                <Text style={styles.buttonText}>Voltar</Text>
              </ImageBackground>
            </TouchableOpacity>

          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'purple',
    alignItems:'center',
    justifyContent:'center',
  },
  imagebutao:{
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  butao:{
    position: 'absolute',
    right: -30,
    bottom: -70,
  },
  buttonText:{
    color: '#fff',
    fontSize: 30,
    fontFamily: 'VT323_400Regular',
    top: -30,
    left: -1
  },
  
})