import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/context/AuthProvider';
import Loader from './components/loader/Loader';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <AuthProvider>
      <Loader>      
      <App />
      </Loader>
    </AuthProvider> 
);

reportWebVitals();
