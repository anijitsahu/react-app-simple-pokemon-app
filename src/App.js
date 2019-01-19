import React from 'react';

// components 
import Title from './components/layout/Title';
import Content from './components/layout/Content';
import ErrorBoundary from './components/ErrorBoundary'

// css
import './css/style.css'

const App = () => {
  return (
    <ErrorBoundary>
	    <div className="container">
	    	{ /* including the Title as well as Content components */ }
		  		<Title />
		  		<Content />	
	  	</div>
		</ErrorBoundary>
  );
};



export default App;