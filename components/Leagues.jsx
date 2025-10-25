import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import routes from '../utils/routes';

export default function LeaguesCard({ data }) {
  const [error, setError] = useState(false);
  const navigate = useNavigation();

  const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/733/733605.png';
  return (
    <TouchableOpacity onPress={() => navigate.navigate(routes.chooseData, { id: data.league_key })}>
      <View className="mb-5 w-full flex-row items-center justify-around overflow-hidden rounded-2xl border  border-white py-5">
        <Image
          resizeMode="contain"
          className=" h-20 w-20"
          source={{ uri: error ? fallbackImg : data.league_logo }}
          onError={() => setError(true)}
        />
        <Text className="font-semibold text-white">{data.league_name}</Text>
      </View>
    </TouchableOpacity>
  );
}
