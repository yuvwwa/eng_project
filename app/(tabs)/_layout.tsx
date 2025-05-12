import { Tabs } from 'expo-router';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ReactNode } from 'react';

import HomeSvg from '../../assets/panel/home.svg';
import MapSvg from '../../assets/panel/map.svg';
import VocabularySvg from '../../assets/panel/vocabulary.svg';
import ProfileSvg from '../../assets/panel/profile.svg';
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic';

const { width } = Dimensions.get('window');

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  useBackgroundMusic(true);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#ECEC97',
        tabBarInactiveTintColor: '#000000',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <HomeSvg width={32} height={32} />
            </TabBarIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <MapSvg width={32} height={32} />
            </TabBarIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="vocabulary"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <VocabularySvg width={32} height={32} />
            </TabBarIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused}>
              <ProfileSvg width={32} height={32} />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}

type TabBarIconProps = {
  children: ReactNode;
  focused: boolean;
};

const tabWidth = 358 / 4;

function TabBarIcon({ children, focused }: TabBarIconProps) {
  return (
    <View
      style={[
        styles.iconWrapper,
        { width: tabWidth, height: 95 },
        focused ? styles.activeTab : styles.inactiveTab,
      ]}>
      <View style={styles.iconInner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 57,
    width: 358,
    height: 67,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#000',
    padding: 0,
    marginLeft: 18,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  iconWrapper: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    height: 32,
    justifyContent: 'center',
    marginTop: 25,
  },
  activeTab: {
    backgroundColor: '#ECEC97',
  },
  inactiveTab: {
    backgroundColor: 'white',
  },
});
