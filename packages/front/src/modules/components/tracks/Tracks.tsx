import { observer } from "mobx-react-lite";
import { useTracks } from "@modules/components/tracks/useTracks";
import BodyTemplate from "@modules/library/templates/bodyTemplate/BodyTemplate";
import { Button } from "@modules/library/Button";
import React, { useLayoutEffect } from "react";
import { TrackUnit } from "@modules/components/tracks/unit/TrackUnit";
import { Loader } from "@modules/library/Loader";
import { useNavigate } from "react-router-dom";
import { routerList } from "@modules/components/Index";

type TLinkCreator = {
  pageName: keyof typeof routerList;
  params?: { [key: string]: string };
};

const linkCreator = ({ pageName, params }: TLinkCreator) => {
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
  const { data, isLoading, setShowButtonPanel, showButtonPanel, eventStart } =
    useTracks();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    console.log(linkCreator({ pageName: "setting", params: { kek: "2" } }));
  });

  return (
    <BodyTemplate.Container>
      <BodyTemplate.Main>
        {data &&
          data?.length > 0 &&
          data.map((lane) => (
            <TrackUnit
              key={lane.id}
              name={lane.name ?? "No track name"}
              isDiconnected={!lane.connected}
              {...lane.intervals[0]}
              progress={lane.progress}
              onClick={eventStart(() =>
                showButtonPanel === lane.id
                  ? undefined
                  : setShowButtonPanel(lane.id)
              )}
              isClick={lane.id === showButtonPanel}
            />
          ))}
        {!data && isLoading && <Loader />}
      </BodyTemplate.Main>
      <BodyTemplate.Buttons show={showButtonPanel !== false}>
        <Button
          color="red"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Отключить
        </Button>
        <Button
          color="green"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Включить
        </Button>
        <Button
          color="gray"
          onClick={(e) => {
            navigate(routerList.setting + "123");
            e.stopPropagation();
          }}
        >
          Редактировать
        </Button>
      </BodyTemplate.Buttons>
    </BodyTemplate.Container>
  );
});
