
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { buscarFilmes } from '../api';

export default function HomeScreen({ navigation }) {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarFilmes()
      .then((dados) => {
        setFilmes(dados);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error(erro);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <View style={styles.centralizado}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnFavoritos} 
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.txtBtn}>Ver Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Details', { filme: item })}
          >
            <Text style={styles.titulo}>{item.titulo} ({item.ano})</Text>
            <Text numberOfLines={2} style={styles.sinopse}>{item.sinopse}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  centralizado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  sinopse: { color: '#666' },
  btnFavoritos: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  txtBtn: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});