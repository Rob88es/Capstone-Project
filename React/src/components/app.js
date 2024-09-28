import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageCarousel from './carrucel/carrucel';
import Navbar from './navigation/navbar';

import Home from './pages/home';
import MisEventos from './pages/guardados';
import CrearEvento from './pages/crear';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mis-eventos" component={MisEventos} />
          <Route path="/crear-evento" component={CrearEvento} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
