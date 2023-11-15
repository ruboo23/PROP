import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface RatingStarsProps {
  onChangeRating: (rating: number) => void;
  value: number;
}

const ValoracionEstrellas: React.FC<RatingStarsProps> = ({ onChangeRating, value }) => {  
  const [rating, setRating] = useState(value);
  const handleStarPress = (newRating: number) => {
    setRating(newRating);
    onChangeRating(newRating);
  };

  useEffect(() => {
    setRating(value);
  }
  , [value]);

  const renderStars = () => {
    const images = [];
    for (let i = 0; i < 5; i++) {
      images.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i+1)}
          style={styles.starContainer}
        >
          <Icon
            name={i < rating ? 'star' : 'star-o'}
            size={28}
            color={i < rating ? 'gold' : 'gray'}
          />
        </TouchableOpacity>
      );
    }
    return images;
  };

  return (
    <View style={styles.container}>
      {renderStars()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  starContainer: {
    padding: 5,
  },
});

export default ValoracionEstrellas;