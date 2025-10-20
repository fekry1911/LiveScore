import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import isEqual from 'lodash.isequal';

function Details() {
  const prevDataRef = React.useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['GetProduct'],
    queryFn: async () => {
      const response = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Happy'
      );
      return response.data.drinks;
    },
    refetchInterval: 5000,
    select: (newData) => {
      if (prevDataRef.current && isEqual(prevDataRef.current, newData)) {
        console.error('🔁 نفس البيانات - لن نعيد التحديث');
        return prevDataRef.current;
      } else {
        console.error('✅ بيانات جديدة - تحديث البيانات');
        prevDataRef.current = newData;
        return newData;
      }
    },
  });

  console.error('render');

  if (isLoading) return <ActivityIndicator color={'white'} />;

  if (error)
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-red-500">Something went wrong!</Text>
      </View>
    );

  return (
    <View className="flex-1 items-center justify-center bg-slate-900">
      <Text className="text-white">{data[0].strDrink}</Text>
      <Text className="text-white">{data[0].strTags}</Text>
      <Text className="text-white">{data[0].strCategory}</Text>
      <Text className="text-white">{data[0].strIBA}</Text>
      <Text className="text-white">{data[0].strGlass}</Text>
    </View>
  );
}

Details.whyDidYouRender = true;

// ✅ لازم تصدّرها بـ memo
export default memo(Details);
