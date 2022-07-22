import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import useAxios from "../hooks/useAxios,js";
const DetailPage = ()=>{
	const [userName,setUsername]= useState("");
	const [feedback,setFeedback] = useState("");
	const navigate = useNavigate();
	const {id}=useParams();
	const axios =  useAxios();
	const saveSurveyAnswer =async()=>{
		try{
			await axios.post(`response/${parseInt(id)}`,{UserName:userName,SurveyId:parseInt(id),Feedback:feedback}, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			toast.success("Survey response saved")
		}catch(error){
			toast.error("Survey response not saved")
		}

	}

	return (<div className="w-screen">
		<div className="my-10 flex-row basis-full">
		<form>
		<div className="mb-6">
			<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
			<input type="text" onChange={e=>setUsername(e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required=""/>
		</div>
		<div className="mb-6">
			<label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your feedback</label>
			<input type="textArea" onChange={e=>setFeedback(e.target.value)} id="feedback" className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="feedback"/>
		</div>

		<button type="button" onClick={saveSurveyAnswer} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">save answer</button>
		<button type="button" onClick={()=>navigate("/")} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">back to survey list</button>
		</form>
		</div>
		<ToastContainer
			position="bottom-right"
			autoClose={2000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	</div>)
}

export default DetailPage;