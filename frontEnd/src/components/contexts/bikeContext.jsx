/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const BikeContext = React.createContext();

const BikeProvider = ({ children }) => {
	const [values, setValues] = useState({ name: "", description: ""});
	return (
		<BikeContext.Provider value={[values, setValues]}>
			{children}
		</BikeContext.Provider >
	);
}

export { BikeContext, BikeProvider };