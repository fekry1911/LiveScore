import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';
import { getTeamsOfLeague } from '../../handleApis/getAllData';
import routes from '../../utils/routes';

export default function TeamsOfLeaguea({ navigation }) {
  const { params } = useRoute();
  const id = params.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ['GetStanding', id],
    queryFn: () => getTeamsOfLeague(id),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center  bg-slate-900">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="justify-centeق flex-1 items-center  bg-slate-900">
        <Text className="text-red-500">Failed to fetch standings 🚫</Text>
      </View>
    );
  }
  const firstStageKey = data[0].fk_stage_key;

  const filteredStandings = data.filter((item) => item.fk_stage_key === firstStageKey);

  return (
    <View className="flex-1 bg-slate-900 p-3">
      <FlatList
        data={filteredStandings}
        keyExtractor={(item) => item.team_key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 w-full rounded-xl bg-slate-800 px-3 py-3"
            onPress={() => navigation.navigate(routes.players, { id: item.team_key })}>
            <View className="flex-row items-center justify-between">
              <View
                className={`mr-3 h-7 w-7 items-center justify-center rounded-full ${item.standing_place == filteredStandings.length || item.standing_place == filteredStandings.length - 1 || item.standing_place == filteredStandings.length - 2 ? 'bg-red-500' : 'bg-green-500'}`}>
                <Text className="font-bold text-white">{item.standing_place}</Text>
              </View>

              <View className="flex-1 flex-row items-center">
                <Image
                  resizeMode="contain"
                  source={{ uri: item.team_logo }}
                  className="mr-3 h-10 w-10 rounded-full"
                />
                <Text numberOfLines={1} className="flex-1 font-semibold text-white">
                  {item.standing_team}
                </Text>
              </View>

              <View className="ml-2 h-8 w-8 items-center justify-center rounded-md bg-yellow-400">
                <Text className="font-bold text-gray-900">{item.standing_PTS}</Text>
              </View>
            </View>

            <View className="mt-2 flex-row items-center justify-between">
              <Text className="text-xs text-gray-300">P: {item.standing_P}</Text>
              <Text className="text-xs text-green-400">W: {item.standing_W}</Text>
              <Text className="text-xs text-yellow-400">D: {item.standing_D}</Text>
              <Text className="text-xs text-red-400">L: {item.standing_L}</Text>
              <Text className="text-xs text-gray-300">
                GF: {item.standing_F} / GA: {item.standing_A}
              </Text>
              <Text className="text-xs text-blue-400">GD: {item.standing_GD}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
