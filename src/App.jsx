import './App.css'
import { useState } from 'react';
import { AppContext } from './contexts/AppProvider';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import DropArea from './components/DropArea/DropArea';

function App() {
  const [file, setFile] = useState(null);
  const [dropping, setDropping] = useState(false);


  const store = { file: file, setFile, setDropping, dropping }
  // console.log();

  return (
    <AppContext.Provider value={store}>
      <DropArea />

      {file?.name && <ConfirmModal />}
    </AppContext.Provider>
  )
}

export default App
