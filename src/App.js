import React from 'react';
import Footer from './components/Footer/Footer';
import Routes from './routes';

const App = () => {
  return (
    <div className="App">
      <main className="main">
        <Routes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
