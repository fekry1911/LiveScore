import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPlayersDetails } from '../../handleApis/getAllData';
import defaultImage from '../../assets/user.png';

export default function PlayerData() {
  const { params } = useRoute();
  const id = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['Get Player Data', id],
    queryFn: () => getPlayersDetails(id),
  });

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <Text className="text-red-500">Error Loading Player Data</Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-slate-800 px-5 pt-10">
      <View className="mb-6 items-center rounded-2xl bg-[#1A1A1A] p-6">
        <CustomImage uri={data.player_image} className="mb-4 h-32 w-32 rounded-full" />

        <Text className="mb-1 text-2xl font-bold text-white">{data.player_name}</Text>

        <Text className="mb-4 text-lg text-gray-400">{data.team_name}</Text>

        <View className="w-full space-y-1">
          <Stat label="Age" value={data.player_age} />
          <Stat label="Position" value={data.player_type} />
          <Stat label="Matches" value={data.player_match_played || '0'} />
          <Stat label="Goals" value={data.player_goals || '0'} />
          <Stat label="Assists" value={data.player_assists || '0'} />
          <Stat label="Shots" value={data.player_shots_total || '0'} />
          <Stat label="Passes" value={data.player_passes || '0'} />
          <Stat
            label="Pass Accuracy"
            value={data.player_passes_accuracy ? `${data.player_passes_accuracy}%` : 'N/A'}
          />
          <Stat label="Rating" value={data.player_rating || 'N/A'} />
        </View>
      </View>
    </ScrollView>
  );
}

const Stat = ({ label, value }) => (
  <View className="flex-row justify-between border-b border-gray-700 py-3">
    <Text className="text-base text-gray-400">{label}</Text>
    <Text className="text-base font-semibold text-white">{value}</Text>
  </View>
);
function CustomImage({ uri, className }) {
  const [error, setError] = useState(false);

  return (
    <Image
      source={error || !uri ? defaultImage : { uri }}
      className={className}
      onError={() => setError(true)}
    />
  );
}
