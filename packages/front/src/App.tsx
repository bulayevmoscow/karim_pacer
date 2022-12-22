import './App.css';
import 'normalize.css';
import { Index } from '@modules/components/Index';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Modal } from '@modules/components/modal/Modal';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@utils/QueryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Index />
        <Modal />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
