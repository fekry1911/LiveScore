import { View, Text, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getMatchById } from '../../handleApis/getAllData';

export default function MatchDetails() {
  const { params } = useRoute();

  let { data, isLoading, error } = useQuery({
    queryFn: () => getMatchById(params.id),
    queryKey: ['GetMatchDetails'],
  });
  console.error(params.id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator color="white" size={40} />
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
  const status = data.fixture.status.short;
  const fullDate = data.fixture.date;
  const timeOnly = fullDate.split('T')[1].slice(0, 5);
  const homeId = data.teams.home.id;
  const awayId = data.teams.away.id;
  return (
    <View className="flex-1 items-center justify-start bg-slate-600 p-5">
      <View className="w-full flex-row items-center justify-center ">
        <Image resizeMode="contain" className="mr-2 h-20 w-20" source={{ uri: data.league.logo }} />
        <Text className="mr-2 text-center font-bold text-white">{data.league.name}</Text>
        <Text className="mr-2 font-bold text-red-600">{data.league.country}</Text>
      </View>
      <Text className="mr-2 font-bold text-gray-400">({data.league.round})</Text>

      <View className="w-full flex-row items-center justify-between ">
        <LogoAndNAme image={data.teams.home.logo} name={data.teams.home.name} />

        <View className="justify-between gap-y-2">
          {status === 'NS' ? (
            <Text>{timeOnly}</Text>
          ) : (
            <View className="flex-row justify-between">
              <Text>{data.goals.home}</Text>
              <Text>-</Text>
              <Text>{data.goals.away}</Text>
            </View>
          )}
          <Text className={status === 'NS' ? 'text-yellow-400' : 'text-red-600'}>
            {data.fixture.status.long}
          </Text>
        </View>
        <LogoAndNAme image={data.teams.away.logo} name={data.teams.away.name} />
      </View>
      {data.events.length > 0 ? (
        <View>
          <Text>Here Events Of Match</Text>
        </View>
      ) : null}
    </View>
  );
}

function LogoAndNAme({ image, name }) {
  return (
    <View className="items-center justify-between">
      <Image resizeMode="stretch" source={{ uri: image }} className="mb-4 mt-4 h-20 w-20" />
      <Text>{name}</Text>
    </View>
  );
}
