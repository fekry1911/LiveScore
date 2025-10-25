import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import MatchDetails from '../components/details/MatchDetails';
import routes from '../utils/routes';
import MyTabs from './MyTaps';
import MatchesLeague from '../components/details/MatchesLeague';
import ChooseData from '../components/Leaguea/ChooseData';
import TeamsOfLeaguea from '../components/Leaguea/TeamsOfLeaguea';
import Players from '../components/players/Players';
import Topscorers from '../components/Leaguea/Topscorers';
import PlayerData from '../components/players/PlayerData.';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name={routes.taps} component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen
        name={routes.matchsLeague}
        component={MatchesLeague}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.matchDetails}
        component={MatchDetails}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.chooseData}
        component={ChooseData}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.teamsOfLeaguea}
        component={TeamsOfLeaguea}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.players}
        component={Players}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.TopScores}
        component={Topscorers}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name={routes.playerData}
        component={PlayerData}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}
