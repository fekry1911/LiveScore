import { View, Text, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getMatchById } from '../../handleApis/getAllData';

export default function MatchDetails() {
  const { params } = useRoute();
  const data = params.match;

  const status = data.event_final_result;
  const fullDate = data.event_date;
  const timeOnly = data.event_time;
  const homeId = data.home_team_key;
  const awayId = data.away_team_key;
  return (
    <View className="flex-1 items-center justify-start bg-slate-600 p-5">
      <View className="w-full flex-row items-center justify-center ">
        <Image resizeMode="contain" className="mr-2 h-20 w-20" source={{ uri: data.league_logo }} />
        <Text className="mr-2 text-center font-bold text-white">{data.league_name}</Text>
      </View>
      <Text className="mr-2 font-bold text-gray-400">({data.league_round})</Text>

      <View className="w-full flex-row items-center justify-between ">
        <LogoAndNAme image={data.home_team_logo} name={data.event_home_team} />

        <View className="justify-between gap-y-2">
          {status === '-' ? (
            <Text>{timeOnly}</Text>
          ) : (
            <View className="flex-row justify-between">
              <Text>{data.event_final_result}</Text>
            </View>
          )}
          <Text className={status === '-' ? 'text-yellow-400' : 'text-red-600'}>
            {data.event_status}
          </Text>
        </View>
        <LogoAndNAme image={data.away_team_logo} name={data.event_away_team} />
      </View>
      {data.event_status != '' ? (
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
