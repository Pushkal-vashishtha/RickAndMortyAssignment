import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getCharacter } from '../api/rickAndMortyApi';
import { LinearGradient } from 'expo-linear-gradient';

export default function CharacterDetailScreen({ route }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { characterId } = route.params;

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    try {
      const data = await getCharacter(characterId);
      setCharacter(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching character:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <LinearGradient colors={['transparent', '#1e1e1e']} style={styles.gradient} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{character.name}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: character.status === 'Alive' ? '#55cc44' : '#d63d2e' }]} />
          <Text style={styles.statusText}>{character.status} - {character.species}</Text>
        </View>
        <Text style={styles.sectionTitle}>Info:</Text>
        <Text style={styles.detail}>Gender: {character.gender}</Text>
        <Text style={styles.detail}>Origin: {character.origin.name}</Text>
        <Text style={styles.detail}>Last known location: {character.location.name}</Text>
        {character.type && <Text style={styles.detail}>Type: {character.type}</Text>}
        
        <Text style={styles.sectionTitle}>Episodes:</Text>
        <View style={styles.episodeContainer}>
          {character.episode.map((episode, index) => (
            <View key={index} style={styles.episodeBadge}>
              <Text style={styles.episodeText}>
                Ep {episode.split('/').pop()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  imageContainer: {
    width: '100%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%', // Adjust this as needed
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    color: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 8,
  },
  episodeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  episodeBadge: {
    backgroundColor: '#3c3e44',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 3,
  },
  episodeText: {
    color: '#fff',
    fontSize: 12,
  },
});
