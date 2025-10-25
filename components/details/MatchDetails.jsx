import React, { useState, memo } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react-native';
import routes from '../../utils/routes';

function MatchDetails() {
  const { params } = useRoute();
  const data = params.match;
  const [dataType, sedData] = useState('lineups');

  const substitutes = data.substitutes || [];
  const homeNum = parseInt(data.substitutes.home);
  const awayNum = parseInt(data.substitutes.away);

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
    <ScrollView className="flex-1 bg-slate-800 p-5">
      <View className="mt-5 w-full flex-row items-center justify-center">
        <Image resizeMode="contain" className="mr-2 h-20 w-20" source={{ uri: data.league_logo }} />
        <Text className="mr-2 text-center text-lg font-bold text-white">{data.league_name}</Text>
      </View>
      <Text className="text-center font-bold text-gray-400">({data.league_round})</Text>

      <View className="mt-4 w-full flex-row items-center justify-between">
        <LogoAndName
          image={data.home_team_logo}
          name={data.event_home_team}
          id={data.home_team_key}
        />

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

        <LogoAndName
          image={data.away_team_logo}
          name={data.event_away_team}
          id={data.away_team_key}
        />
      </View>

      <View className="mt-4 w-full flex-row items-end justify-between">
        {['lineups', 'statistics', 'goalscorers'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => sedData(tab)}
            className={`w-28 items-center justify-center rounded-xl ${
              dataType === tab ? 'bg-gray-700' : 'bg-slate-500'
            }  p-3`}>
            <Text className="font-semibold text-white">{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {dataType === 'lineups' && (
        <View className="mb-6 mt-6 w-full flex-row items-start justify-between">
          {data.lineups?.home_team?.starting_lineups?.[0]?.player ? (
            <>
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
            </>
          ) : (
            <Text className="mt-6 text-center text-white">Lineups not available yet</Text>
          )}
        </View>
      )}
      {dataType === 'statistics' && (
        <View className="mt-6 w-full pb-6">
          {data.statistics ? (
            <View className="w-full rounded-2xl bg-slate-700 p-4">
              <Text className="mb-4 text-center text-lg font-bold text-white">
                Match Statistics
              </Text>

              {data.statistics.map((stat, index) => {
                const home = parseInt(stat.home) || 0;
                const away = parseInt(stat.away) || 0;

                return (
                  <View
                    key={index}
                    className="w-full flex-row items-center justify-between border-b border-slate-600 py-2">
                    <View
                      className={`h-11 w-11 items-center justify-center rounded-full ${
                        home > away ? 'bg-green-600' : 'bg-slate-500'
                      }`}>
                      <Text className="text-center text-white">{stat.home}</Text>
                    </View>

                    <Text className="mx-2 flex-1 text-center text-lg font-semibold text-gray-300">
                      {stat.type}
                    </Text>

                    <View
                      className={`h-11 w-11 items-center justify-center rounded-full ${
                        away > home ? 'bg-green-600' : 'bg-slate-500'
                      }`}>
                      <Text className="text-center text-white">{stat.away}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text className="mt-5 text-center text-gray-300">Statistics not available yet</Text>
          )}
        </View>
      )}
      {dataType === 'goalscorers' && (
        <View className="mt-6 w-full pb-6">
          {data.goalscorers && data.goalscorers.length > 0 ? (
            <View className="mb-6 w-full rounded-2xl bg-slate-700 p-4">
              <Text className="mb-4 text-center text-lg font-bold text-white">🥅 Goalscorers</Text>

              {data.goalscorers.map((goal, index) => (
                <View
                  key={index}
                  className="mb-3 w-full flex-row items-center justify-between border-b border-slate-600 pb-2">
                  {/* Home */}
                  <View className="w-[45%] items-start">
                    {goal.home_scorer ? (
                      <Text className="text-sm text-white">
                        ⚽ {goal.home_scorer}
                        {goal.home_assist ? (
                          <Text className="text-gray-400"> (assist: {goal.home_assist})</Text>
                        ) : null}
                      </Text>
                    ) : (
                      <Text className="text-transparent">_</Text>
                    )}
                  </View>

                  <View className="items-center justify-center">
                    <Text className="text-xs text-gray-300">{goal.info_time}</Text>
                    <Text className="font-semibold text-white">{goal.time}'</Text>
                    <Text className="text-gray-400">{goal.score}</Text>
                  </View>

                  <View className="w-[45%] items-end">
                    {goal.away_scorer ? (
                      <Text className="text-right text-sm text-white">
                        ⚽ {goal.away_scorer}
                        {goal.away_assist ? (
                          <Text className="text-gray-400"> (assist: {goal.away_assist})</Text>
                        ) : null}
                      </Text>
                    ) : (
                      <Text className="text-transparent">_</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="mt-5 text-center text-gray-300">No goals scored in this match</Text>
          )}

          {data.cards && data.cards.length > 0 ? (
            <View className="w-full rounded-2xl bg-slate-700 p-4">
              <Text className="mb-4 text-center text-lg font-bold text-white">🟨 Cards</Text>

              {data.cards.map((card, index) => (
                <View
                  key={index}
                  className="mb-3 w-full flex-row items-center justify-between border-b border-slate-600 pb-2">
                  <View className="w-[45%] items-start">
                    {card.home_fault ? (
                      <Text className="text-sm text-yellow-400">
                        {card.card.includes('yellow')
                          ? '🟨'
                          : card.card.includes('red')
                            ? '🟥'
                            : '⚪'}{' '}
                        {card.home_fault}
                      </Text>
                    ) : (
                      <Text className="text-transparent">_</Text>
                    )}
                  </View>

                  <View className="items-center justify-center">
                    <Text className="text-xs text-gray-300">{card.info_time}</Text>
                    <Text className="font-semibold text-white">{card.time}'</Text>
                  </View>

                  <View className="w-[45%] items-end">
                    {card.away_fault ? (
                      <Text className="text-right text-sm text-yellow-400">
                        {card.card.includes('yellow')
                          ? '🟨'
                          : card.card.includes('red')
                            ? '🟥'
                            : '⚪'}{' '}
                        {card.away_fault}
                      </Text>
                    ) : (
                      <Text className="text-transparent">_</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text className="mt-5 text-center text-gray-300">No cards in this match</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const LogoAndName = memo(function LogoAndName({ image, name, id }) {
  let navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(routes.players, { id: id })}>
      <View className="max-w-[120px] items-center justify-between">
        <Image resizeMode="stretch" source={{ uri: image }} className="mb-4 mt-4 h-20 w-20" />
        <Text className="text-center text-sm text-white">{name}</Text>
      </View>
    </TouchableOpacity>
  );
});

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

export default memo(MatchDetails);
