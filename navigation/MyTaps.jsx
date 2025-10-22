import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import routes from '../utils/routes';
import HomePage from '../pages/HomePage';
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
        sceneContainerStyle: {
          backgroundColor: '#1e293b',
        },
      }}>
      <Tab.Screen
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1e293b',
            borderTopWidth: 0,
          },
          sceneContainerStyle: {
            backgroundColor: '#1e293b',
          },
        }}
        name={routes.home}
        component={AllMatches}
      />
      <Tab.Screen
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1e293b',
            borderTopWidth: 0,
          },
          sceneContainerStyle: {
            backgroundColor: '#1e293b',
          },
        }}
        name={routes.leagues}
        component={AllLeagues}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
