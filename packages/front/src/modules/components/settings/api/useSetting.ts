import axios from 'axios'
import { useQuery } from 'react-query'
import { TSetting } from '@modules/components/settings/types'
import { timeout } from '@utils/timeout'

const initialData: { data: TSetting } = {
  data: {
    color: {
      pace: "#a15050",
      wait: "#FF5858",
      delay: "#43FF01",
    },
    delay: 5,
    pool: {
      type: 0,
      L: 25.0,
      L1: 5.6,
      L2: 15.0,
      L3: 4.0,
      H1: 1.8,
      H2: 6.0,
    },
  },
};

const getSettings = () => axios.get<TSetting>("/api/settings");

const mockSettings = async () => {
  await timeout(500);
  console.log('fetch!')
  return initialData;
};

const postSettings = (data: TSetting) =>
  axios.post<TSetting>("/api/settings", data);

export const useSetting = ({
  onSuccess,
}: {
  onSuccess?: (data: { data: TSetting }) => void;
}) => {
  return useQuery<{ data: TSetting }>("settings", mockSettings, {
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data)
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
