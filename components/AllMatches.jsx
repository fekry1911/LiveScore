import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import isEqual from 'lodash.isequal';
import { getAllMatches2, getTodayMatches } from '../handleApis/getAllData';

function AllMatches() {
  const today = new Date().toISOString().split('T')[0];
  const [day, setDay] = useState(today);

  function getYesterdayDate() {
    const currentDate = new Date(day);
    currentDate.setDate(currentDate.getDate() - 1);
    setDay(currentDate.toISOString().split('T')[0]);
  }

  function getTommorowDate() {
    const currentDate = new Date(day);
    currentDate.setDate(currentDate.getDate() + 1);
    setDay(currentDate.toISOString().split('T')[0]);
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['GetAllMatches', day],
    queryFn: () => getAllMatches2(day),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    refetchInterval: 60 * 1000,
  });

  if (isLoading) {
    return (
      <View className="w-full items-center justify-center">
        <ActivityIndicator size={40} color={'white'} />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <Text className="font-extrabold text-white">{error}</Text>
      </View>
    );
  }
  return (
    <View className="w-full items-center justify-center">
      <View className="mb-4 w-full flex-row justify-between p-5">
        <TouchableOpacity onPress={() => getYesterdayDate()}>
          <Text className="text-white">previous</Text>
        </TouchableOpacity>
        <Text className="font-bold text-white">{day}</Text>
        <TouchableOpacity onPress={() => getTommorowDate()}>
          <Text className="text-white">next</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item) => item.event_key}
        initialNumToRender={10}
        windowSize={5}
        className="w-full"
        data={data}
        renderItem={({ item }) => <Card match={item} />}
      />
    </View>
  );
}
export default React.memo(AllMatches);
