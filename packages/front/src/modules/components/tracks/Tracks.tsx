import { observer } from 'mobx-react-lite';
import { useTracks } from '@modules/components/tracks/useTracks';
import BodyTemplate from '@modules/library/templates/bodyTemplate/BodyTemplate';
import { Button } from '@modules/library/Button';
import React from 'react';
import { TrackUnit } from '@modules/components/tracks/unit/TrackUnit';
import { Loader } from '@modules/library/Loader';
import { useNavigate } from 'react-router-dom';
import { routerList } from '@modules/components/Index';

type TLinkCreator = {
  pageName: keyof typeof routerList;
  params?: { [key: string]: string };
};

const linkCreator = ({ pageName, params }: TLinkCreator) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const url = new URL(routerList[pageName], window.location);
  if (params) {
    Object.keys(params).forEach((keyParams) => {
      url.searchParams.append(keyParams, params[keyParams]);
    });
    // url.searchParams.append("1", "2");
  }

  return url;
  // url
};

export const Tracks = observer(() => {
  const { data, isLoading, setShowButtonPanel, showButtonPanel, eventStart, manageInterval } = useTracks();
  const navigate = useNavigate();

  return (
    <BodyTemplate.Container>
      <BodyTemplate.Main>
        {data &&
          data?.length > 0 &&
          data.map((lane) => (
            <TrackUnit
              key={lane.id}
              name={lane.name ?? 'No track name'}
              isDiconnected={lane.status === 'DISCONNECT'}
              {...lane.intervals[0]}
              progress={lane.progress}
              onClick={eventStart(() => (showButtonPanel === lane.id ? undefined : setShowButtonPanel(lane.id)))}
              isClick={lane.id === showButtonPanel}
            />
          ))}
        {!data && isLoading && <Loader />}
      </BodyTemplate.Main>
      <BodyTemplate.Buttons show={showButtonPanel !== false}>
        <Button
          color="red"
          show={data && data[Number(showButtonPanel)].status === 'PROGRESS'}
          onClick={(e) => {
            manageInterval();
            e.stopPropagation();
          }}
        >
          Стоп
        </Button>
        <Button
          color="green"
          show={data && data[Number(showButtonPanel)].status === 'IDLE'}
          onClick={(e) => {
            manageInterval();
            e.stopPropagation();
          }}
        >
          Старт
        </Button>
        <Button
          color="gray"
          disabled={true}
          show={data && data[Number(showButtonPanel)].status === 'DISCONNECT'}
          onClick={(e) => {
            manageInterval();
            e.stopPropagation();
          }}
        >
          Подключить
        </Button>
        <Button
          color="blue"
          onClick={(e) => {
            navigate(routerList.lane + '/' + showButtonPanel);
            e.stopPropagation();
          }}
        >
          Редактировать тренировку
        </Button>
      </BodyTemplate.Buttons>
    </BodyTemplate.Container>
  );
});
