import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
