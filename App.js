import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import {useState} from 'react';

export default function App() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    let URL = 'http://192.168.100.164:3000/api';
    setLoading(true)
    try {
      const page = await fetch(`${URL}/user`);
      if (!response.ok){
        throw new Error(`Erro de servidor: ${response.status}`);
      }
      const json = await page.json();
      setData(result);
    } catch (error) {
      console.log(error)
      Alert.alert(error.message)
    } finally{
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Projeto teste Coffe & Aroma</Text>
        <View>
          <Text>Dados do banco</Text>
          {
            data && data.map(item => {
              return<Text>{item.username}</Text>
            })
          }
          <Button title='buscar dados' onPress={fetchData}/>
        </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
