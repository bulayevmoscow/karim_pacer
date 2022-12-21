import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { TRequests } from '@monorepo/types';
import { axiosInstance } from '@utils/axiosInstance';
import store from '@store';
import { AxiosError } from 'axios';
const eventStart = (func: Function) => {
  return (e: MouseEvent) => {
    func();
    e.stopPropagation();
  };
};

export const useTracks = () => {
  const [showButtonPanel, setShowButtonPanel] = useState<number | false>(0);
  const { setFetchError, fetchErrorList, clearFetchError } = store;
  const [refetchInterval, setRefetchInterval] = useState<false | 5000>(5000);
  const axios = axiosInstance;

  useEffect(() => {
    const event = () => {
      if (showButtonPanel !== false) {
        setShowButtonPanel(false);
      }
    };

    if (document.body) {
      document.body.addEventListener('click', event);
    }

    return () => {
      document.body.removeEventListener('click', event);
    };
  }, [showButtonPanel]);

  type TReq = Extract<
    TRequests,
    {
      url: 'api/shortData';
    }
  >['res'];
  const { data, isLoading, refetch, isError } = useQuery(
    'Tracks',
    () => axios.post<TReq>('/api/shortData'),
    {
      enabled: true,
      retry: false,
      refetchInterval,
      refetchOnWindowFocus: false,
      onSuccess: data => {
        if (fetchErrorList?.length !== 0) {
          clearFetchError(data.config.url ?? '');
        }

        return data;
      },
      onError: (err: AxiosError) => {
        setFetchError({
          onClick: refetch,
          err,
        });
        return Promise.reject(err);
      },
    }
  );

  useEffect(() => {
    if (isError && refetchInterval === 5000) {
      setRefetchInterval(false);
    }

    if (!isError && refetchInterval === false) {
      setRefetchInterval(5000);
    }
  }, [refetchInterval, isError]);
  return {
    data: data?.data,
    isLoading,
    showButtonPanel,
    setShowButtonPanel,
    eventStart,
  };
};
