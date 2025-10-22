import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getAllMatchesOfLeaguea, getMatchesByLeague } from '../../handleApis/getAllData';
import Card from '../Card';

export default function MatchesLeague() {
  let { params } = useRoute();
  let id = params.id;

  const today = (() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();
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
  let { data, isLoading, error } = useQuery({
    queryKey: ['Get Matches Of League', id, day],
    queryFn: () => getAllMatchesOfLeaguea(id, day),
  });
  console.log(data);

  if (isLoading) {
    return (
      <View className="w-full flex-1 items-center justify-center  bg-slate-800">
        <ActivityIndicator size={40} color={'white'} />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex-1 items-center justify-around bg-slate-800 ">
        <Text className="font-extrabold text-white">{error}</Text>
      </View>
    );
  }
  if (!data || data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800 ">
        <View className="mb-4 w-full flex-row justify-between p-5">
          <TouchableOpacity onPress={() => getYesterdayDate()}>
            <Text className="text-white">previous</Text>
          </TouchableOpacity>
          <Text className="font-bold text-white">{today == day ? 'Today' : day}</Text>
          <TouchableOpacity onPress={() => getTommorowDate()}>
            <Text className="text-white">next</Text>
          </TouchableOpacity>
        </View>
        <Text className="font-extrabold text-white">No Matches Today</Text>
      </View>
    );
  }
  return (
    <View className="w-full items-center justify-center  bg-slate-800 pt-16">
      <View className="mb-4 w-full flex-row justify-between p-5">
        <TouchableOpacity onPress={() => getYesterdayDate()}>
          <Text className="text-white">previous</Text>
        </TouchableOpacity>
        <Text className="font-bold text-white">{today == day ? 'Today' : day}</Text>
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
