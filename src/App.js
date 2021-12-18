import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Routes from './routes';
import { UserStrorage } from './UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <UserStrorage>
          <main className="main">
            <Routes />
          </main>
          <Footer />
        </UserStrorage>
      </div>
    </BrowserRouter>
  );
};

export default App;
