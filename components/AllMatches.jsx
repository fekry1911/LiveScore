import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React, { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTodayMatches } from '../handleApis/handleApis';
import Card from './Card';
import isEqual from 'lodash.isequal';

function AllMatches() {
  const today = new Date().toISOString().split('T')[0];
  let previousRef = useRef(null);

  let { data, isLoading, error } = useQuery({
    queryKey: ['GetAllMatches'],
    queryFn: () => getTodayMatches(today),
  });
  if (isLoading) {
    return (
      <View className="w-full items-center justify-center">
        <ActivityIndicator size={40} color={'white'} />
      </View>
    );
  }
  return (
    <View className="w-full items-center justify-center">
      <FlatList
        keyExtractor={(item) => item.fixture.id.toString()}
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
