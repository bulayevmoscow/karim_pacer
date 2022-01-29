import style from './TabHeaderStyle.module.pcss';
import { useContext } from 'react';
import { MyContext } from '@context';

export const TabHeader = () => {
	const { state, dispatch } = useContext(MyContext);
	const activeTab = state.appInfo.tab;
	console.log(activeTab);
	const tabs: ({ current: boolean; id: 0 | 1 | 2 | 3; cn: string; status: boolean })[] = [
		{ id: 0, cn: `${style.nav_item} ${style.green_lamp}`, status: false, current: false },
		{ id: 1, cn: `${style.nav_item} ${style.yellow_lamp}`, status: false, current: false },
		{ id: 2, cn: `${style.nav_item} ${style.brown_lamp}`, status: false, current: false },
		{ id: 3, cn: `${style.nav_item} ${style.setting}`, status: false, current: false },
	];

	tabs.forEach(tab => {
		tab.current = tab.id === activeTab;
	});

	// Dispatch({ type: 'changePage', page: 1 });
	return (
		<div className={style.nav_container}>
			{tabs.map(((tab, index) => (
				<div key={index} className={`${tab.cn} ${tab.current && style.active}`} onClick={() => {
					dispatch({ type: 'changePage', page: tab.id });
				}}>{index}</div>)))}
		</div>);
};
