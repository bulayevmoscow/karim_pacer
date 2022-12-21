import './App.css';
import 'normalize.css';
import { Index } from '@modules/components/Index';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Modal } from '@modules/components/modal/Modal';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Index />
      <Modal />
    </QueryClientProvider>
  );
};

export default App;
