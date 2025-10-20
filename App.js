import React from 'react';

// ✅ لازم يكون قبل أي import فيه Components
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (__DEV__) {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View, Text, ActivityIndicator, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import './global.css';
import Details from './components/details';
import Card from './components/Card';
import AllMatches from './components/AllMatches';

const queryClient = new QueryClient();

export default function App() {
  const items = [13, 123, 123, 12, 31, 3, 13, 1, 31, 312, 3, 123, 12, 31231, 3, 123, , 123];
  return (
    <QueryClientProvider client={queryClient}>
      <View className="flex-1 items-center justify-center bg-slate-800 px-5 py-20">
        <TextInput
          value=""
          onChange={(e) => {}}
          placeholder="Search........"
          placeholderTextColor={'white'}
          className="mb-5 w-full rounded-xl border border-white px-2"
        />
        <AllMatches />
      </View>
    </QueryClientProvider>
  );
}
