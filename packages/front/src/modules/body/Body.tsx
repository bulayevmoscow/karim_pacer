import { useContext, useEffect } from 'react';
import { MyContext } from '@context';
import { TabHeader } from '@modules/body/TabHeader';

export const Body = () => {
	const { state, dispatch } = useContext(MyContext);
	useEffect(() => {
		console.log(state);
	}, [state]);
	return (<div>
		<TabHeader/>
		{state.appInfo.tab}
	</div>);
};

