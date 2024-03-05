import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
// import DirectoryComponent from './components/DirectoryComponent';

const MainRoutes = () => {
  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Private route using PrivateRoute component */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />}>
            <Route path="directory/:id" element={<Home />} />
          </Route>
        </Route>
      </Routes>
  );
};

export default MainRoutes;
