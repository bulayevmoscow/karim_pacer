import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { TSetting } from '@modules/components/settings/types';
import { queryClient } from '@utils/QueryClient';

const apiKey = 'setting';

const getSettings = () => axios.get<TSetting>('/api/settings');
const postSettings = (data: TSetting) => axios.post<TSetting>('/api/settings', data);

export const useGetSettingApi = ({ onSuccess }: { onSuccess?: (data: { data: TSetting }) => void }) => {
  return useQuery<{ data: TSetting }>(apiKey, getSettings, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
    retry: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};

export const usePostSettingApi = () => {
  return useMutation(postSettings, {
    onSuccess: (data) => {
      queryClient.setQueryData(apiKey, data);
    },
  });
};
