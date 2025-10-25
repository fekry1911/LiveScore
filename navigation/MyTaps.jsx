import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import routes from '../utils/routes';
import AllLeagues from '../components/AllLeagues';
import AllMatches from '../components/AllMatches';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e293b',
          borderTopWidth: 0,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#64748b',
      }}>
      <Tab.Screen
        name={routes.home}
        component={AllMatches}
        options={{
          tabBarLabel: 'Matches',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/football.png')}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.leagues}
        component={AllLeagues}
        options={{
          tabBarLabel: 'Leagues',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/league.png')}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
