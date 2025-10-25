import { View, Text } from 'react-native';
import React from 'react';

export default function GoalScored({ data }) {
  return (
    <View className="mt-6 w-full pb-6">
      {data.goalscorers && data.goalscorers.length > 0 ? (
        <View className="mb-6 w-full rounded-2xl bg-slate-800 p-4">
          <Text className="mb-4 text-center text-lg font-bold text-white">🥅 Goalscorers</Text>

          {data.goalscorers.map((goal, index) => (
            <View
              key={index}
              className="mb-3 w-full flex-row items-center justify-between border-b border-slate-600 pb-2">
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
                    {card.card.includes('yellow') ? '🟨' : card.card.includes('red') ? '🟥' : '⚪'}{' '}
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
                    {card.card.includes('yellow') ? '🟨' : card.card.includes('red') ? '🟥' : '⚪'}{' '}
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
  );
}
