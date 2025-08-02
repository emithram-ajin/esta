import React ,{ lazy, Suspense }  from 'react'


const Homepage = lazy(() => import('./components/homepage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage />
    </Suspense>
  );
}

export default App;