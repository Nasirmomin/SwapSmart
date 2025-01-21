import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainNavbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <MainNavbar />
      <Toaster position="top-right" />
      {/* Rest of your app content */}
    </BrowserRouter>
  );
}

export default App;