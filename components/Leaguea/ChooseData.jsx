import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import routes from '../../utils/routes';
import rank from '../../assets/ranking.png';
import trophy from '../../assets/trophy.png';
import team from '../../assets/football-team.png';

export default function ChooseData() {
  let { params } = useRoute();
  const navigate = useNavigation();
  const id = params.id;
  return (
    <View className="flex-1 items-center justify-center gap-10 bg-slate-800 p-5">
      <TouchableOpacity
        className="m-2 h-1/4 w-full items-center justify-center rounded-3xl border border-white"
        onPress={() => navigate.navigate(routes.teamsOfLeaguea, { id: id })}>
        <Image className="mb-4 h-1/2 w-1/2" source={rank} resizeMode="contain" />
        <Text className="font-extrabold text-white">Standing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-2 h-1/4 w-full items-center justify-center rounded-3xl border border-white"
        onPress={() => navigate.navigate(routes.matchsLeague, { id: id })}>
        <Image className="mb-4 h-1/2 w-1/2" source={team} resizeMode="contain" />

        <Text className="font-extrabold text-white">Teams</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-2 h-1/4 w-full items-center justify-center rounded-3xl border border-white"
        onPress={() => navigate.navigate(routes.TopScores, { id: id })}>
        <Image className="mb-4 h-1/2 w-1/2" source={trophy} resizeMode="contain" />

        <Text className="font-extrabold text-white">Top Scorers</Text>
      </TouchableOpacity>
    </View>
  );
}
