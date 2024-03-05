import { ReactNode } from 'react';
import Navbar from './Navbar';

type ILayout = {
    children: ReactNode
};

const Layout = ({ children }: ILayout) => {
	return (
		<div>
			<Navbar />

			<div className="container">
				<div className="row">
					{children}
				</div>
			</div>          
		</div>
	);
};

export default Layout;