import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function CharacterCard({ character, onPress, onFavorite, isFavorite }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#3c3e44', '#1e1e1e']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image source={{ uri: character.image }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.species}>{character.species}</Text>
          
          <View style={styles.bottomRow}>
            <Text style={[styles.status, { backgroundColor: getStatusColor(character.status) }]}>
              {character.status}
            </Text>
            <TouchableOpacity onPress={onFavorite}>
              <Ionicons 
                name={isFavorite ? 'star' : 'star-outline'} 
                size={24} 
                color={isFavorite ? '#f5c518' : '#ffffff'} 
                style={styles.favoriteIcon} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Alive':
      return '#55cc44';
    case 'Dead':
      return '#d63d2e';
    default:
      return '#9e9e9e';
  }
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  species: {
    color: '#9e9e9e',
    fontSize: 14,
    marginBottom: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 14,
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  favoriteIcon: {
    marginLeft: 10,
  },
});
