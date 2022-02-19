import { observer } from "mobx-react-lite";
import store from "@store";
import style from "./Lane.module.scss";
import { Button } from "@modules/library/Button";
// import IconLoading from '@modules/icons/progress.png'
import { TaskUnit } from "@modules/components/lane/task/TaskUnit";
import { useEffect } from "react";

export const Lane = observer(() => {
  const { startInterval, page, laneInfo } = store;

  // if (laneInfo.isLoading) {
  //   return (
  //     <div className={style.tracks}>
  //       <div className={style.tracks_container}>
  //         <div className={style.loading_icon_container}>
  //           <img src={IconLoading} alt="" />
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  useEffect(() => {});

  const laneNumber = page.pageTag === "lane" ? page.idLine : undefined;
  console.log(laneNumber);
  if (laneNumber === undefined) {
    throw new Error("No lane Number");
  }

  return (
    <div className={style.tracks}>
      <div className={style.tracks_container}>
        <div className={style.tracks_list}>
          {laneInfo?.intervals?.map((lane, index) => (
            <TaskUnit
              key={index}
              tempo={lane.temp}
              repeat={lane.repeat}
              rest={lane.rest}
              distance={lane.distance}
              speed={lane.speed}
              name={laneInfo.name ?? "no name"}
              progress={lane.progress}
              isShutdown={false}
              onClick={() => undefined}
              isClick={true}
            />
          ))}
        </div>
      </div>

      <div className={style.tracks_buttons_container}>
        {
          <Button
            color="green"
            onClick={(e) => {
              startInterval({ id: 0, status: true });
              e.stopPropagation();
            }}
          >
            Старт
          </Button>
        }
        <Button
          color="green"
          onClick={(e) => {
            startInterval({ id: 0, status: false });
            e.stopPropagation();
          }}
        >
          Стоп
        </Button>
      </div>
    </div>
  );
});

// <div className={style.tracks_buttons_container}>
//   {lanesInfo[showButtonPanel].status ? (
//     <Button
//       color="red"
//       onClick={e => {
//         store.toggleLaneStatus(showButtonPanel, 'OFF')
//         e.stopPropagation()
//       }}
//     >
//       Отключить
//     </Button>
//   ) : (
//     <Button
//       color="green"
//       onClick={e => {
//         store.toggleLaneStatus(showButtonPanel, 'ON')
//         e.stopPropagation()
//       }}
//     >
//       Включить
//     </Button>
//   )}
//   <Button
//     color="gray"
//     onClick={e => {
//       e.stopPropagation()
//     }}
//   >
//     Редактировать
//   </Button>
// </div>
//
