import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { title: 'All Characters', filter: {}, color: ['#4e54c8', '#8f94fb'], shape: 'circle' },
  { title: 'Alive Characters', filter: { status: 'alive' }, color: ['#11998e', '#38ef7d'], shape: 'circle' },
  { title: 'Dead Characters', filter: { status: 'dead' }, color: ['#eb3349', '#f45c43'], shape: 'circle' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/rick-and-morty-bg.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('CharacterList', { filter: category.filter, title: category.title })}
          >
            <LinearGradient
              colors={category.color}
              style={[styles.card, styles[category.shape]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.cardText}>{category.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 8,
  },
  curvedRectangle: {
    width: 300,
    height: 150,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  polygon: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    position: 'relative',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  polygon: {
    width: 150,
    height: 150,
    position: 'relative',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
  },
  polygonBefore: {
    position: 'absolute',
    top: -50,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 75,
    borderLeftColor: 'transparent',
    borderRightWidth: 75,
    borderRightColor: 'transparent',
    borderBottomWidth: 75,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  polygonAfter: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 75,
    borderLeftColor: 'transparent',
    borderRightWidth: 75,
    borderRightColor: 'transparent',
    borderTopWidth: 75,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  cardText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 12,
    textTransform: 'uppercase',
  },
});
