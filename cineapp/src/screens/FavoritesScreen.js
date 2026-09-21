
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // Atualiza a tela ao voltar nela

export default function FavoritesScreen() {
  const [favoritos, setFavoritos] = useState([]);
  const isFocused = useIsFocused();

  async function carregarFavoritos() {
    try {
      const dados = await AsyncStorage.getItem('@cinefatec_favoritos');
      if (dados) {
        setFavoritos(JSON.parse(dados));
      } else {
        setFavoritos([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os favoritos.');
    }
  }

  useEffect(() => {
    if (isFocused) {
      carregarFavoritos();
    }
  }, [isFocused]);


  async function removerFavorito(id) {
    try {
      const novaLista = favoritos.filter((item) => item.id !== id);
      setFavoritos(novaLista);
      await AsyncStorage.setItem('@cinefatec_favoritos', JSON.stringify(novaLista));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o filme.');
    }
  }


  async function limparTodos() {
    Alert.alert('Confirmação', 'Deseja limpar todos os favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Sim', 
        onPress: async () => {
          await AsyncStorage.removeItem('@cinefatec_favoritos');
          setFavoritos([]);
        } 
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.contador}>
          {favoritos.length > 0 ? `Total: ${favoritos.length} filme(s) salvo(s)` : 'Nenhum favorito'}
        </Text>
        
        {favoritos.length > 0 && (
          <TouchableOpacity style={styles.btnLimparTudo} onPress={limparTodos}>
            <Text style={styles.txtBtnLimpar}>Limpar Tudo</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.vazioContainer}>
            <Text style={styles.vazio}>Sua lista de favoritos está vazia</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.ano}>Ano: {item.ano}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.btnRemover} 
              onPress={() => removerFavorito(item.id)}
            >
              <Text style={styles.txtRemover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  contador: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  btnLimparTudo: { backgroundColor: '#dc3545', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  txtBtnLimpar: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
  titulo: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  ano: { fontSize: 13, color: '#666', marginTop: 2 },
  btnRemover: { backgroundColor: '#ffc107', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  txtRemover: { color: '#333', fontSize: 12, fontWeight: 'bold' },
  vazioContainer: { marginTop: 60, alignItems: 'center' },
  vazio: { color: '#666', fontSize: 16 }
});