import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTopScoreesOfLeaguea } from '../../handleApis/getAllData';
import routes from '../../utils/routes';

export default function Topscorers() {
  const { params } = useRoute();
  const id = params.id;
  let navigate = useNavigation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['GetTopScores', id],
    queryFn: () => getTopScoreesOfLeaguea(id),
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <Text className="text-red-500">Failed to fetch top scorers 🚫</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-800 p-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.player_key.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate.navigate(routes.playerData, { id: item.player_key })}>
            <View className="mb-3 flex-row items-center justify-between rounded-xl bg-slate-700 p-3">
              <View className="mr-2 h-9 w-9 items-center justify-center rounded-full bg-green-600">
                <Text className="font-bold text-white">{item.player_place}</Text>
              </View>

              <View className="mr-3 flex-1 flex-row items-center gap-x-3">
                <View>
                  <Text className="text-base font-semibold text-white">{item.player_name}</Text>
                  <Text className="text-xs text-gray-300">{item.team_name}</Text>
                </View>
              </View>

              <View className="items-end">
                <View className="flex-row items-center gap-x-1">
                  <Text className="text-lg font-bold text-white">{item.goals}</Text>
                  <Text className="text-white">⚽</Text>
                </View>

                <View className="mt-1 flex-row items-center gap-x-1">
                  <Text className="text-sm font-semibold text-gray-300">{item.assists ?? 0}</Text>
                  <Text className="text-sm text-gray-300">🎯</Text>
                </View>

                {item.penalty_goals ? (
                  <View className="mt-1 flex-row items-center gap-x-1">
                    <Text className="text-xs font-semibold text-yellow-300">
                      {item.penalty_goals}
                    </Text>
                    <Text className="text-xs text-yellow-300">🟡 (P)</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
