import React from 'react';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
