import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContinentModel } from '@/models/continents.model';
import { Colors } from '@/constants/Colors';

interface ContinentHeaderProps {
  continent: ContinentModel;
  activeButtonId: number | null;
}

const ContinentHeader: React.FC<ContinentHeaderProps> = ({ continent }) => {
  const { progress } = useMemo(() => {
    const totalButtons = continent.steps.length;
    const completedButtons = continent.steps.filter(
      button => button.isAvailble,
    ).length;
    const progress = totalButtons > 0 ? completedButtons / totalButtons : 0;

    return { progress, totalButtons, completedButtons };
  }, [continent]);

  return (
    <View
      style={[
        styles.container,
        {
          left: (continent.offsetX || 0) + (continent.headerOffsetX || 0),
          top: (continent.offsetY || 0) + (continent.headerOffsetY || 0),
        },
      ]}>
      <Text style={styles.title}>{`${continent.id} Level`}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 125,
    padding: 8,
    elevation: 5,
    width: 200,
    gap: 45,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: 'Bruno Ace',
    fontSize: 32,
    color: Colors.violetDark,
  },
  progressContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    filter: 'blur(2)',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    height: 18,
    borderRadius: 50,
    backgroundColor: Colors['coral'],
  },
});

export default ContinentHeader;
