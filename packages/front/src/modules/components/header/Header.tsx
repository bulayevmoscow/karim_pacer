import { observer } from 'mobx-react-lite';
import store from '@store';
import iconAdd from '@modules/icons/h_plus.svg';
import style from './Header.module.scss';
import { TFaceHeader } from '@modules/library/Typeface';
export const Header = observer(() => {
  const { page, getTemplates } = store;
  const event =
    (page?.pageTag === 'lane' && getTemplates) || (() => console.log('empty'));
  return (
    <div className={style.header_container}>
      <TFaceHeader>{page?.title}</TFaceHeader>
      <img src={iconAdd} alt="" onClick={event} />
    </div>
  );
});
