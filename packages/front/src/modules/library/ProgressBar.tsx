import style from './ProgressBar.module.pcss'

export const ProgressBar = () => {
  return (
    <div className={style.progress}>
      <div className={style.progress_container}>
        <div>Загрузка</div>
        <div className={style.progress_bar}>
          <div className={style.shadow} />
        </div>
      </div>
    </div>
  )
}
