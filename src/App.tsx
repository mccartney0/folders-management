import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';
import useRefreshToken from './hooks/useRefreshToken';
import { useEffect } from 'react';

function App() {
  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;