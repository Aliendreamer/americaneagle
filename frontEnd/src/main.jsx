import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './components/App'
import { BikeProvider } from './components/contexts/bikeContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<BrowserRouter>
	<BikeProvider>
		<App />
		</BikeProvider>
	</BrowserRouter>
  </React.StrictMode>
)
