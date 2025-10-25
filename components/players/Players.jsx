import { View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getPlayersOfTeam } from '../../handleApis/getAllData';
import routes from '../../utils/routes';
import defaultImage from '../../assets/user.png';

export default function Players() {
  const { params } = useRoute();
  const id = params.id;
  const navigate = useNavigation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['GetPlayers', id],
    queryFn: () => getPlayersOfTeam(id),
  });

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator className="mt-20" />
      </View>
    );
  if (error)
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <Text className="text-red-500">Error: {error.message}</Text>
      </View>
    );

  const team = data?.[0];
  const players = team?.players ?? [];
  const coaches = team?.coaches ?? [];
  const coach = coaches[0];

  return (
    <View className="flex-1 bg-slate-800 p-4">
      <View className="mb-5 items-center">
        <CustomImage uri={team?.team_logo} className="mb-3 h-32 w-32 rounded-full" />
        <Text className="text-2xl font-bold text-white">{team?.team_name}</Text>
      </View>

      <FlatList
        data={players}
        keyExtractor={(item) => item.player_key.toString()}
        ListHeaderComponent={<Text className="mb-3 text-lg font-semibold text-white">Players</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate.navigate(routes.playerData, { id: item.player_key })}>
            <View className="mb-3 flex-row items-center rounded-xl bg-slate-600 p-3">
              <CustomImage uri={item.player_image} className="mr-3 h-12 w-12 rounded-full" />
              <View>
                <Text className="text-base font-bold text-white">{item.player_name}</Text>
                <Text className="text-sm text-gray-300">{item.player_type}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          coach && (
            <View className="mt-6 rounded-2xl bg-slate-800 p-4">
              <Text className="mb-2 text-lg font-bold text-white">Coach</Text>
              <View className="flex-row items-center">
                <CustomImage uri={coach.coach_image} className="mr-3 h-14 w-14 rounded-full" />
                <View>
                  <Text className="text-base font-bold text-gray-300">{coach.coach_name}</Text>
                  <Text className="text-sm text-blue-700">{coach.coach_type}</Text>
                </View>
              </View>
            </View>
          )
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

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
