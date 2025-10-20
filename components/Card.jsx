import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getLiveMatches, getTodayMatches } from '../handleApis/handleApis';

function Card({ match }) {
  const fullDate = match.fixture.date;
  const timeOnly = fullDate.split('T')[1].slice(0, 5);
  const leagueAll = match.league.name;
  const league = leagueAll.split(' ').slice(0, 2).join(' ');
  console.log('first Render');

  return (
    <View className="mb-5 w-full flex-row justify-around overflow-hidden rounded-2xl border border-white py-3">
      <View className="items-center justify-around">
        <Image className="mb-5 h-16 w-16" source={{ uri: match.teams.away.logo }} />
        {match.goals.away && (
          <Text className="text-xl font-semibold text-white">{match.goals.away}</Text>
        )}
      </View>
      <View className="items-center justify-between">
        <View className="flex-row items-center justify-between ">
          <Text className="line-clamp-1 text-red-500">{league}</Text>
          <Image source={{ uri: match.league.logo }} className="ml-2 h-10 w-10" />
        </View>
        <Text className="text-2xl text-white">{timeOnly}</Text>
        <View></View>
      </View>
      <View className="items-center justify-around">
        <Image className="mb-5 h-16 w-16" source={{ uri: match.teams.home.logo }} />
        {match.goals.home && (
          <Text className="text-xl font-semibold text-white">{match.goals.home}</Text>
        )}
      </View>
    </View>
  );
}
export default React.memo(
  Card,
  (prevProps, nextProps) =>
    prevProps.match.fixture.id === nextProps.match.fixture.id &&
    prevProps.match.goals.home === nextProps.match.goals.home &&
    prevProps.match.goals.away === nextProps.match.goals.away
);
