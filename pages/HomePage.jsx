import { View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import AllMatches from '../components/AllMatches';
import { useNavigation } from '@react-navigation/native';
import routes from '../utils/routes';
import LeaguesCard from '../components/Leagues';
import AllLeagues from '../components/AllLeagues';

export default function HomePage() {
  const navigate = useNavigation();
  return (
    <View className="flex-1 items-center justify-center bg-slate-800 px-5">
      <AllLeagues />
    </View>
  );
}
