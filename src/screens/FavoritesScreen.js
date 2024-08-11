import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CharacterCard from '../components/CharacterCard';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]); // Replace with your actual favorite characters source

  const handleFavorite = (character) => {
    // Handle logic if needed
  };

  const renderCharacterCard = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
      onFavorite={() => handleFavorite(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderCharacterCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  listContent: {
    padding: 10,
  },
});
