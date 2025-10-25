import { View, Text, FlatList } from 'react-native';
import React from 'react';

export default function Lineups({ data }) {
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

  return (
    <View className="mb-6 mt-6 w-full flex-row items-start justify-between">
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
  );
}
const NameAndNumber = memo(function NameAndNumber({ name, number, end, isIn, isOut }) {
  return (
    <View className={`mb-3 flex-row items-start ${end ? 'justify-end' : 'justify-start'}`}>
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
});

const TeamLineups = memo(function TeamLineups({ team, end, isSubIn, isSubOut }) {
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
});
