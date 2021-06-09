import './App.css';
import { Provider } from 'react-redux';
import ContactTable from './components/table';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <ContactTable />
    </Provider>
  );
}

export default App;
