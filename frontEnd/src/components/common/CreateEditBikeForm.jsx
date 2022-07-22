/* eslint-disable react/prop-types */

import { useContext } from "react";
import { BikeContext } from "../contexts/bikeContext";

const CreateEditBikeForm = ()=>{
	const [values, setValues] = useContext(BikeContext);
	return (
		<form>
				<input
                    key={"size"}
                    type="search"
					value={values.name}
					onChange={(event) => {
						event.persist();
						setValues({...values,name:event.target.value});

					}}
					className="text-left text-sm w-full border-black border-2 border-solid"
                    placeholder={`name`}
                  />
				<input
                    key={`description`}
                    type="search"
					value={values.description}
					onChange={(event) => {
						event.persist();
						setValues({...values,description:event.target.value});

					}}
					className="text-left text-sm w-full border-black border-2 border-solid"
                    placeholder={`description`}
                  />
		</form>
	)
}

export default CreateEditBikeForm;