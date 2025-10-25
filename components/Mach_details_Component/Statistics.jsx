import { View, Text } from 'react-native';
import React from 'react';

export default function Statistics({ data }) {
  return (
    <View className="mt-6 w-full pb-6">
      {data.statistics ? (
        <View className="w-full rounded-2xl bg-slate-800 p-4">
          <Text className="mb-4 text-center text-lg font-bold text-white">Match Statistics</Text>

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
  );
}
