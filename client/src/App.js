import React from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </Layout>
  );
}

export default App;
