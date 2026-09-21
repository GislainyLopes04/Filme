
import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({ route, navigation }) {
  const { filme } = route.params;

  async function salvarFavorito() {
    try {
      const salvos = await AsyncStorage.getItem('@cinefatec_favoritos');
      const listaFavoritos = salvos ? JSON.parse(salvos) : [];

      const jaExiste = listaFavoritos.some((item) => item.id === filme.id);
      if (jaExiste) {
        Alert.alert('Atenção', 'Este filme já está nos seus favoritos!');
        return;
      }

      listaFavoritos.push(filme);
      await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(listaFavoritos));

      Alert.alert('Sucesso', 'Filme salvo nos favoritos!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o filme.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{filme.titulo}</Text>
      <Text style={styles.info}> Ano: {filme.ano}</Text>
      <Text style={styles.info}> Gênero: {filme.genero}</Text>
      <Text style={styles.info}> Diretor: {filme.diretor}</Text>
      <Text style={styles.info}>Duração: {filme.duracao}</Text>
      
      <Text style={styles.subtitulo}>Sinopse:</Text>
      <Text style={styles.sinopse}>{filme.sinopse}</Text>
      
      <View style={styles.espacoBotao}>
        <Button title="Salvar nos Favoritos" onPress={salvarFavorito} color="#007bff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#222' },
  info: { fontSize: 15, color: '#555', marginBottom: 4 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 14, marginBottom: 6, color: '#333' },
  sinopse: { fontSize: 15, lineHeight: 22, color: '#666', marginBottom: 24 },
  espacoBotao: { marginTop: 10 }
});