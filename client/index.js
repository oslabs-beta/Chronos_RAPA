import React from 'react';  
import { createRoot } from 'react-dom/client';  
import App from './App.jsx';  
import {  
  BrowserRouter  
} from "react-router-dom";  

// Create a root element  
const container = document.getElementById('root');  
const root = createRoot(container); // Create a root instance  

class ErrorBoundary extends React.Component {  
  constructor(props) {  
    super(props);  
    this.state = { hasError: false };  
  }  

  static getDerivedStateFromError(error) {  
    return { hasError: true }; // Update state to indicate error  
  }  

  componentDidCatch(error, info) {  
    console.error("Error caught by Error Boundary: ", error, info);  
  }  

  render() {  
    if (this.state.hasError) {  
        return <h1>Something went wrong.</h1>;  
    }  

    return this.props.children;   
  }  
}

// Render main application  
root.render( 
  <ErrorBoundary>
  <BrowserRouter>  
    <App />  
   </BrowserRouter>  
   </ErrorBoundary>
);