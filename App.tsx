import React from 'react';
import GridBox from './src/components/GridBox';
import { ApiProvider } from './src/providers/apiContext';


function App(): JSX.Element {

  return (
    <ApiProvider>
      <GridBox/> 
    </ApiProvider>
  );
}

export default App;
