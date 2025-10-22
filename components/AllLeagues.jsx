import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllLeagues } from '../handleApis/getAllData';
import LeaguesCard from './Leagues';

export default function AllLeagues() {
  let { data, isLoading, error } = useQuery({
    queryKey: ['GetAllLeagues'],
    queryFn: getAllLeagues,
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  if (isLoading) {
    return (
      <View className="w-full  flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator size={40} color={'white'} />
      </View>
    );
  }
  return (
    <View className="w-full items-center justify-center bg-slate-800  pt-16">
      <FlatList
        data={data}
        renderItem={({ item }) => <LeaguesCard data={item} />}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </View>
  );
}
