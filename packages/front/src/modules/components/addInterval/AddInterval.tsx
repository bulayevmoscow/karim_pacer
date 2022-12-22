import BodyTemplate from '@modules/library/templates/bodyTemplate/BodyTemplate';
import { ChangeEvent, FC, useState } from 'react';
import speedIcon from '@modules/icons/unit/speed.png';
import distanceIcon from '@modules/icons/unit/distance.png';
import restIcon from '@modules/icons/unit/rest.png';
import repeatIcon from '@modules/icons/unit/repeat.png';
import tempoIcon from '@modules/icons/unit/tempo.png';
import style from './AddInterval.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button } from '@modules/library/Button';
import { TRequests } from '@monorepo/types';
import axios from 'axios';
import { selectAllInput } from '@utils/events';
import React from 'react';

type TIntervalTemplate = {
  icon: string;
  title: string;
};

type TConfig = {
  intervalId: string;
  speed: string;
  distance: string;
  rest: string;
  repeat: string;
  tempo: string;
};

type TAddBodyRequest = Extract<TRequests, { url: '/api/addInterval' }>['payload'];
type TEditBodyRequest = Extract<TRequests, { url: '/api/editInterval' }>['payload'];

const IntervalTemplate: FC<TIntervalTemplate> = ({ icon, title, children }) => {
  return (
    <div className={style.add_interval_template__container}>
      <div className={style.add_interval_template__title}>
        <img src={icon} alt="" />
        <div>{title}</div>
      </div>
      <div className={style.add_interval_template__input}>{children}</div>
    </div>
  );
};

export const AddInterval: FC<{ isEdit: boolean }> = ({ isEdit }) => {
  const params = new URLSearchParams(window.location.search);
  const [config, setConfig] = useState<TConfig>({
    intervalId: params.get('intervalId') ?? '',
    speed: params.get('speed') ?? '',
    distance: params.get('distance') ?? '',
    rest: params.get('rest') ?? '',
    repeat: params.get('repeat') ?? '',
    tempo: params.get('tempo') ?? '',
  });

  const { idLane } = useParams();
  console.log('idLane', idLane);
  const navigate = useNavigate();
  const { refetch: addInterval } = useQuery(
    'addInterval',
    () => {
      const params: TAddBodyRequest = {
        // eslint-disable-next-line camelcase
        track_id: Number(idLane),
        interval: {
          id: 0,
          progress: 0,
          speed: Number(config.speed),
          distance: Number(config.distance),
          rest: Number(config.rest),
          repeat: Number(config.repeat),
          temp: Number(config.tempo),
        },
      };
      return axios.post('/api/addInterval', params);
    },
    {
      enabled: false,
      onSuccess: () => navigate(-1),
      // eslint-disable-next-line no-alert
      onError: (err) => alert(err),
      retry: false,
    }
  );

  const { refetch: editInterval } = useQuery(
    'editInterval',
    () => {
      const params: TEditBodyRequest = {
        // eslint-disable-next-line camelcase
        track_id: Number(idLane),
        interval: {
          id: Number(config.intervalId),
          progress: 0,
          speed: Number(config.speed),
          distance: Number(config.distance),
          rest: Number(config.rest),
          repeat: Number(config.repeat),
          temp: Number(config.tempo),
        },
      };
      return axios.post('/api/editInterval', params);
    },
    {
      enabled: false,
      onSuccess: () => navigate(-1),
      // eslint-disable-next-line no-alert
      onError: (err) => alert(err),
      retry: false,
    }
  );

  const changeEvent = (event: ChangeEvent<HTMLInputElement>, key: keyof TConfig) => {
    setConfig((prevState) => ({
      ...prevState,
      [key]: event.target.value === '' ? undefined : Number(event.target.value),
    }));
  };

  return (
    <>
      <BodyTemplate.Container>
        <BodyTemplate.Main>
          <div className={style.add_interval_template__wrapper}>
            <IntervalTemplate icon={speedIcon} title="100м за время (в сек)">
              <input
                type="number"
                onClick={selectAllInput}
                onChange={(e) => changeEvent(e, 'speed')}
                value={config.speed}
                placeholder={'0'}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={distanceIcon} title="Дистанция (в метрах)">
              <input
                type="number"
                onClick={selectAllInput}
                onChange={(e) => changeEvent(e, 'distance')}
                value={config.distance}
                placeholder={'0'}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={restIcon} title="Отдых (в сек)">
              <input
                type="number"
                onClick={selectAllInput}
                onChange={(e) => changeEvent(e, 'rest')}
                value={config.rest}
                placeholder={'0'}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={repeatIcon} title="Кол-во поворотов">
              <input
                type="number"
                onClick={selectAllInput}
                onChange={(e) => changeEvent(e, 'repeat')}
                value={config.repeat}
                placeholder={'0'}
              />
            </IntervalTemplate>
            <IntervalTemplate icon={tempoIcon} title="Темп (в м.сек)">
              <input
                type="number"
                onClick={selectAllInput}
                onChange={(e) => changeEvent(e, 'tempo')}
                value={config.tempo}
                placeholder={'0'}
              />
            </IntervalTemplate>
          </div>
        </BodyTemplate.Main>
      </BodyTemplate.Container>
      <BodyTemplate.Buttons show={true}>
        <Button
          color={'blue'}
          disabled={
            config.distance === '' ||
            config.tempo === '' ||
            config.repeat === '' ||
            config.rest === '' ||
            config.speed === ''
          }
          onClick={() => {
            if (isEdit) {
              editInterval();
            } else {
              addInterval();
            }
          }}
        >
          Сохранить
        </Button>
        <Button color={'red'} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </BodyTemplate.Buttons>
    </>
  );
};
