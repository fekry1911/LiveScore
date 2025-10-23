import { View, Text, Image, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function MatchDetails() {
  const { params } = useRoute();
  const data = params.match;

  const substitutes = data.substitutes || [];

  const getLastName = (name) => {
    if (!name) return '';

    const normalizedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim()
      .toLowerCase();
    const parts = normalizedName.split(' ');
    return parts[parts.length - 1];
  };

  const isSubIn = (playerName) => {
    const last = getLastName(playerName);
    return substitutes.some((sub) => {
      const homeIn = getLastName(sub.home_scorer?.in);
      const awayIn = getLastName(sub.away_scorer?.in);
      return homeIn === last || awayIn === last;
    });
  };

  const isSubOut = (playerName) => {
    const last = getLastName(playerName);
    return substitutes.some((sub) => {
      const homeOut = getLastName(sub.home_scorer?.out);
      const awayOut = getLastName(sub.away_scorer?.out);
      return homeOut === last || awayOut === last;
    });
  };

  const status = data.event_final_result;
  const timeOnly = data.event_time;

  return (
    <ScrollView className="flex-1 bg-slate-600 p-5 ">
      <View className="mt-5 w-full flex-row items-center justify-center">
        <Image resizeMode="contain" className="mr-2 h-20 w-20" source={{ uri: data.league_logo }} />
        <Text className="mr-2 text-center text-lg font-bold text-white">{data.league_name}</Text>
      </View>
      <Text className="text-center font-bold text-gray-400">({data.league_round})</Text>

      <View className="mt-4 w-full flex-row items-center justify-between">
        <LogoAndName image={data.home_team_logo} name={data.event_home_team} />

        <View className="items-center gap-y-2">
          {status === '-' ? (
            <Text className="text-white">{timeOnly}</Text>
          ) : (
            <Text className="text-xl font-bold text-white">{data.event_final_result}</Text>
          )}
          <Text className={status === '-' ? 'text-yellow-400' : 'text-red-500'}>
            {data.event_status}
          </Text>
        </View>

        <LogoAndName image={data.away_team_logo} name={data.event_away_team} />
      </View>

      {data.lineups?.home_team?.starting_lineups?.[0]?.player ? (
        <View className="mb-6 mt-6 w-full flex-row justify-between">
          <TeamLineups
            team={data.lineups.home_team}
            substitutes={substitutes}
            isSubIn={isSubIn}
            isSubOut={isSubOut}
          />
          <TeamLineups
            team={data.lineups.away_team}
            substitutes={substitutes}
            isSubIn={isSubIn}
            isSubOut={isSubOut}
            end
          />
        </View>
      ) : (
        <Text className="mt-6 text-center text-white">Lineups not available yet</Text>
      )}
    </ScrollView>
  );
}

function LogoAndName({ image, name }) {
  return (
    <View className="max-w-[120px] items-center justify-between">
      <Image resizeMode="stretch" source={{ uri: image }} className="mb-4 mt-4 h-20 w-20" />
      <Text className="text-center text-sm text-white">{name}</Text>
    </View>
  );
}

function NameAndNumber({ name, number, end, isIn, isOut }) {
  return (
    <View className={`mb-3 flex-row items-center ${end ? 'justify-end' : 'justify-start'}`}>
      {!end && (
        <View className="h-7 w-7 items-center justify-center rounded-3xl bg-slate-950">
          <Text className="text-white">{number}</Text>
        </View>
      )}

      <View className="mx-1 flex-row items-center gap-x-1">
        <Text className="text-sm text-gray-300">{name}</Text>

        {isIn && <ArrowUpCircle color="lime" size={16} />}
        {isOut && <ArrowDownCircle color="red" size={16} />}
      </View>

      {end && (
        <View className="h-7 w-7 items-center justify-center rounded-3xl bg-slate-950">
          <Text className="text-white">{number}</Text>
        </View>
      )}
    </View>
  );
}

function TeamLineups({ team, end, substitutes, isSubIn, isSubOut }) {
  return (
    <View className={`${end ? 'items-end' : 'items-start'} w-[48%]`}>
      <Text className="my-2 text-center font-bold text-white">Starting XI</Text>
      <FlatList
        data={team.starting_lineups}
        scrollEnabled={false}
        keyExtractor={(item) => item.player_key.toString()}
        renderItem={({ item }) => (
          <NameAndNumber
            name={item.player}
            number={item.player_number}
            end={end}
            isIn={isSubIn(item.player)}
            isOut={isSubOut(item.player)}
          />
        )}
      />

      <Text className="my-2 text-center font-bold text-white">Substitutes</Text>
      <FlatList
        data={team.substitutes}
        scrollEnabled={false}
        keyExtractor={(item) => item.player_key.toString()}
        renderItem={({ item }) => (
          <NameAndNumber
            name={item.player}
            number={item.player_number}
            end={end}
            isIn={isSubIn(item.player)}
            isOut={isSubOut(item.player)}
          />
        )}
      />
    </View>
  );
}
