import { ReactNode } from 'react';
import Navbar from './Navbar';

type ILayout = {
    children: ReactNode
};

const Layout = ({ children }: ILayout) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default Layout;