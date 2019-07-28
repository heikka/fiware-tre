import React from 'react';
import './App.css';
import { Layout } from './hoc/Layout/Layout';
import CityVision from './views/CityVision/CityVision';

const App: React.FunctionComponent = (): JSX.Element => {

  return (
    <div className="App">
      <Layout>
        <CityVision />
      </Layout>
    </div>
  );
}

export default App;

