import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FilterModal({ visible, onClose, onApplyFilters, filters }) {
  const [status, setStatus] = useState(filters.status || '');
  const [species, setSpecies] = useState(filters.species || '');
  const [gender, setGender] = useState(filters.gender || '');

  // Determine available options based on the current filter
  const getStatusOptions = () => {
    switch (filters.status) {
      case 'alive':
        return [{ label: 'Alive', value: 'alive' }];
      case 'dead':
        return [{ label: 'Dead', value: 'dead' }];
      default:
        return [
          { label: 'All', value: '' },
          { label: 'Alive', value: 'alive' },
          { label: 'Dead', value: 'dead' },
          { label: 'Unknown', value: 'unknown' },
        ];
    }
  };

  const speciesOptions = [
    { label: 'All', value: '' },
    { label: 'Human', value: 'Human' },
    { label: 'Alien', value: 'Alien' },
    { label: 'Robot', value: 'Robot' },
    { label: 'Unknown', value: 'unknown' },
    // Add more species as needed
  ];

  const genderOptions = [
    { label: 'All', value: '' },
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Genderless', value: 'Genderless' },
    { label: 'Unknown', value: 'unknown' },
  ];

  const availableStatusOptions = getStatusOptions();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Status:</Text>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            {availableStatusOptions.map(option => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>

          <Text>Species:</Text>
          <Picker
            selectedValue={species}
            onValueChange={(itemValue) => setSpecies(itemValue)}
          >
            {speciesOptions.map(option => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>

          <Text>Gender:</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            {genderOptions.map(option => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>

          <TouchableOpacity
            onPress={() => onApplyFilters({ status, species, gender })}
            style={styles.applyButton}
          >
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  applyButton: {
    backgroundColor: '#3c3e44',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#ff4c4c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
