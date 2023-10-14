import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import VistaReseña from './VistaReseña';

interface ListaReseñasProps {
  scrollWrap: () => void;
  scrollUnWrap: () => void;
}

export default function ListaReseñas({ scrollWrap, scrollUnWrap }: ListaReseñasProps) {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // Calcula la diferencia entre la posición actual y la anterior
    const scrollDifference = currentY - scrollY;

    if (scrollDifference > 0) {
      // El ScrollView está bajando
      scrollWrap();
    } else if (scrollDifference < 0) {
      // El ScrollView está subiendo
      scrollUnWrap();
    } else {

    }

    setScrollY(currentY);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} onScrollEndDrag={handleScroll}>
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
      <VistaReseña />
    </ScrollView>
  );
}
