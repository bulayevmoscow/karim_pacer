import { usePostSettingApi, useGetSettingApi } from '@modules/components/settings/api/useSettingApi';
import React, { useEffect, useState } from 'react';
import { TSetting } from '@modules/components/settings/types';
import { typeOfPool } from '@modules/components/settings/constants';

export const useSetting = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState<TSetting | undefined>(undefined);

  const { data, isError: isErrorLoading, refetch: refetchGetData, isLoading: isLoadingData } = useGetSettingApi({});

  const { mutate, isLoading: isMutating, isError: isErrorMutating } = usePostSettingApi();
  useEffect(() => {
    if (data) {
      setForm(JSON.parse(JSON.stringify(data))?.data);
      setIsLoading(false);
    }
  }, [data]);

  const onChangeColor =
    (key: keyof TSetting['color']): React.ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      setForm((prevState) => {
        if (prevState) {
          setForm({
            ...prevState,
            color: { ...prevState.color, [key]: event.target.value },
          });
        } else {
          return prevState;
        }
      });
    };

  const onChangeDelay: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setForm((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          delay: Number(event.target.value),
        };
      }

      return prevState;
    });
  };

  const onChangeKeyOfPool = (key: keyof TSetting['pool']) => (value: string) => {
    setForm((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          pool: {
            ...prevState.pool,
            [key]: Number(value),
          },
        };
      }

      return prevState;
    });
  };

  const poolSelectValue = typeOfPool.map((value, index) => {
    return {
      value: index.toString(),
      alias: value.alias,
    };
  });
  return {
    isLoading: isLoading && !isLoadingData,
    isErrorLoading,
    form,
    setForm,
    onChangeColor,
    onChangeDelay,
    onChangeKeyOfPool,
    poolSelectValue,
    mutate,
    isMutating,
    isErrorMutating,
    refetchGetData,
  };
};
