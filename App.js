import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  Alert,
  Button, 
  StyleSheet, 
  Text, 
  TextInput, 
  View }
  from 'react-native';
import {useState} from 'react';

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("Usuario ");
  const [email, setEmail] = useState("usuario@mail.com");

  const fetchData = async () => {
    let URL = 'http://192.168.100.109:3000/api';
    setLoading(true)
    try {
      const response = await fetch(`${URL}/user`);
      if (!response.ok){
        throw new Error(`Erro de servidor: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    } finally{
      setLoading(false);
    }
  };

  const postData = async () => {
    let URL = "http://192.168.100.109:3000/api";
    setLoading(true);
    try {
      const body = {
        username: username,
        email: email,
      };
      const header = {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
      const response = await fetch(`${URL}/user`, header)
      if (response.status!=201) {
        throw new Error('Erro ao inserir dados')
      }
      const result = await response.json();
      Alert.alert("Usuario criado com codigo: "+ result.userId);
    } catch (error) {
      console.log(error);
      alert.alert("Erro ao enviar os dados: "+ error.message);      
    } finally {
      setLoading(false)
    }
  };

  const handleAdd = async () => {
    //desenvolver esse botão
  }

  return (
    <View style={styles.container}>
      <Text>Projeto teste Coffe & Aroma</Text>
      <View>
        <TextInput value={username} onChangeText={setUsername} />
        <TextInput value={email} onChangeText={setEmail} />
        <Button title="Adicionar" onPress={postData} />
      </View>
        <View>
          <Text>Dados do banco</Text>
          {
            data && data.map(item => {
              return<Text>{item.username}</Text>
            })
          }
          {loading ? (
            <ActivityIndicator />
          ):(
            <>
             <Button title="buscar dados" onPress={fetchData} />
             <Button title="limpar Dados" onPress={() => setData([])} />
            </>
          )}
          
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
