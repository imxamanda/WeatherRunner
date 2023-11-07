import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import { List } from 'react-native-paper';

export default function Sobrenos() {
    //link dos perfis do github
    const links = [
        { text: '- Davi Costa', url: 'https://github.com/davimcostaa' },
        { text: '- Amanda Vitória', url: 'https://github.com/Mandygando' },
        { text: '- Ruan Silva', url: 'https://github.com/Ruan227' },
        { text: '- Felipe Carvalho', url: 'https://github.com/lipestile' },
        { text: '- Amanda Vieira', url: 'https://github.com/imxamanda' }
      ];
    
      const openLink = (url) => {
        Linking.openURL(url);
      };
    
      //fonte de texto
    let [fontsLoaded] = useFonts({
        VT323_400Regular,
      });
    


      if (!fontsLoaded) {
        return null;
      }
  return (
    <View> 
      {/* Conteúdo do botão about us */}
       <Text  style={{fontFamily: 'VT323_400Regular', fontSize: 20}} >{'  '}Quem somos?</Text>
        <Text  style={{fontFamily: 'VT323_400Regular', marginTop: 10}}>
            {'      '}Bem-vindo ao nosso 'appgaming' de clima! Somos um grupo de estudantes do Instituto de Educação Superior de Brasília (IESB) apaixonados por jogos e meteorologia. Juntos, criamos este aplicativo para fornecer informações precisas e atualizadas sobre o clima em todo o mundo, combinando nossa paixão por jogos com nossas habilidades em desenvolvimento de software.
            </Text>

            {/* Seção dos links do github */}
        <List.Section>
        <List.Subheader  style={{fontFamily: 'VT323_400Regular', fontSize: 20}}>Links do Github:</List.Subheader>
        {links.map((link, index) => (
          <List.Item
            titleStyle={{fontFamily: 'VT323_400Regular', color:'blue'}}
            key={index}
            title={link.text}
            onPress={() => openLink(link.url)}
          />
        ))}
      </List.Section>

            
    </View>
  )
}

const styles = StyleSheet.create({})