import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { getCharacters } from '../api/rickAndMortyApi';
import CharacterCard from '../components/CharacterCard';
import FilterModal from '../components/FilterModal';

export default function CharacterListScreen({ navigation, route }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState(route.params.filter || {});
  const [favorites, setFavorites] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for filter button
  const { title } = route.params;

  useEffect(() => {
    navigation.setOptions({ title });
    fetchCharacters();
  }, [filters, page]);

  useEffect(() => {
    // Fade in animation for the filter button
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fetchCharacters = async () => {
    try {
      const data = await getCharacters(page, filters);
      if (page === 1) {
        setCharacters(data.results); // Reset list if fetching from page 1
      } else {
        setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset page to 1 when applying new filters
    setCharacters([]); // Clear the current list
    setFilterModalVisible(false);
  };

  const handleFavorite = (character) => {
    if (favorites.some(fav => fav.id === character.id)) {
      setFavorites(favorites.filter(fav => fav.id !== character.id));
    } else {
      setFavorites([...favorites, character]);
    }
  };

  const renderCharacterCard = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
      onFavorite={() => handleFavorite(item)}
      isFavorite={favorites.some(fav => fav.id === item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.filterButton, opacity: fadeAnim }}>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </Animated.View>

      {loading && characters.length === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacterCard}
          keyExtractor={item => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={handleApplyFilters}
        filters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 10,
  },
  filterButton: {
    backgroundColor: '#00b300',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
