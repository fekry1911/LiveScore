import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage';
import MatchDetails from '../components/details/MatchDetails';
import routes from '../utils/routes';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name={routes.home}
        component={HomePage}
        options={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTitleAlign: 'center',
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={routes.matchDetails}
        component={MatchDetails}
        options={{
          presentation: 'formSheet',
          headerShown: false,
          sheetAllowedDetents: [0.4, 0.9],
        }}
      />
    </Stack.Navigator>
  );
}
