import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import routes from '../utils/routes';

function Card({ match }) {
  const navigate = useNavigation();
  const timeOnly = match.event_date;

  const league = match.league_name.split(' ').slice(0, 2).join(' ');

  const status = match.event_ft_result;
  let statusColor = 'white';
  if (status === '') statusColor = 'green';
  else statusColor = 'red';

  return (
    <TouchableOpacity onPress={() => navigate.navigate(routes.matchDetails, { match })}>
      <View className="mb-5 w-full flex-row justify-around overflow-hidden rounded-2xl border border-white py-3">
        <View className="items-center justify-around">
          <Image
            className="mb-2 h-16 w-16"
            source={{ uri: match.home_team_logo }}
            resizeMode="contain"
          />
        </View>

        <View className="items-center justify-between">
          <View className="flex-row items-center justify-between ">
            <Text className="line-clamp-1 text-red-500">{league}</Text>
            <Image
              source={{ uri: match.league_logo }}
              className="ml-2 h-10 w-10"
              resizeMode="contain"
            />
          </View>
          {match.event_status === 'Finished' ? (
            <Text className="text-2xl text-white">{match.event_ft_result}</Text>
          ) : match.event_status === '' ? (
            <Text className="text-2xl text-white">{match.event_time}</Text>
          ) : (
            <Text className="text-2xl text-white">{match.event_final_result}</Text>
          )}
          {match.event_status === '' ? (
            <Text className="text-sm font-semibold" style={{ color: statusColor }}>
              {'Not Started'}
            </Text>
          ) : match.event_status === 'Finished' ? (
            <Text className="text-sm font-semibold" style={{ color: statusColor }}>
              {match.event_status}
            </Text>
          ) : match.event_live === '0' ? (
            <Text className="text-sm font-semibold" style={{ color: statusColor }}>
              {match.event_status}
            </Text>
          ) : (
            <View className="flex-row items-center justify-center gap-x-2  rounded-lg bg-red-400 p-1">
              <Text className="text-sm font-semibold text-white">{match.event_status}</Text>
              <Text className="text-white">Live</Text>
            </View>
          )}
        </View>

        <View className="items-center justify-around">
          <Image
            className="mb-2 h-16 w-16"
            source={{ uri: match.away_team_logo }}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Card, (prevProps, nextProps) => {
  const prev = prevProps.match;
  const next = nextProps.match;

  return (
    prev.event_key === next.event_key &&
    prev.event_live === next.event_live &&
    prev.event_status === next.event_status &&
    prev.event_final_result === next.event_final_result
  );
});
