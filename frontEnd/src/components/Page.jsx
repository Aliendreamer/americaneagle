import { useEffect,useState,useMemo,useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Modal from "./Modal";
import { useNavigate } from "react-router";
import { Table } from "../utilities/Table";
import { BikeContext } from "./contexts/bikeContext";
import CreateEditBikeForm from "./common/CreateEditBikeForm";
import useAxios from "../hooks/useAxios,js"
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
const Page = ()=>{
	const [collection,setCollection] = useState([]);
	const [addModalOpen,setAddModalOpen]=useState(false);
	const [editModalOpen,setEditModalOpen]=useState(false);
	const [deleteModalOpen,setDeleteModalOpen]=useState(false);
	const [deleteId,setDeleteId]=useState(null);
	const [values,setValues] = useContext(BikeContext);
	const initial = useRef(false);
	const axios = useAxios();
	const navigate = useNavigate();
	const columns = useMemo(()=>([
		{ label: "id", accessor: "id"},
		{ label: "name", accessor: "name"},
		{ label: "description", accessor: "description" },
		{ label: "Link", accessor: "link" },
		{ label: "Actions", accessor: "actions"}
	]),[]);

	const setState = async()=>{
		try {
			const surveys = await  axios.get("surveys");
			const list = surveys.data;
			setCollection(list);
			toast.success("getting surveys succeded");

		} catch (error) {
			setCollection([]);
			toast.error("getting surveys failed");
		}
	}

	const createNewBike =async(event)=>{
		event.preventDefault();
		const data = new FormData();
		data.append("name",values.name);
		data.append("description",values.description);
		try{
			await axios.post("survey",data,{
				headers:{
					'Content-Type': 'multipart/form-data'
				}
			});
			const newSurvey = {
				name : values.name,
				description:values.description,
				id:collection[collection.length - 1].id+1
			}
			setCollection([...collection,newSurvey]);
			setValues({name:"",description:""});
			setAddModalOpen(false);
			toast.success("Created survey successful");
			navigate(`/detail/${newSurvey.id}`);
		}catch(error){
			setValues({id:"",name:"",description:""});
			setAddModalOpen(false);
			toast.error("creating failed");
		}
	}

	const deleteBike=(id)=>{
		setDeleteId(id);
		setDeleteModalOpen(true);
	}
	const editBike=(bike)=>{
		setValues(bike);
		setEditModalOpen(true);
	}

	const deleteBikeAction=async()=>{
		try{
			await axios.delete(`survey/${deleteId}`);
			setCollection([...collection.filter(bike=>bike.id!==deleteId)]);
			setDeleteId(null);
			setDeleteModalOpen(false);
			toast.success("Deleting successful");
		}catch(error){
			toast.error("Deleting failed");
			setDeleteModalOpen(false);
		}
	}

	const editBikeAction=async()=>{
		try{
			await axios.patch(`survey/edit/${values.id}`,values, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			const index = collection.indexOf(values);
			collection.splice(index,1,values);
			setCollection([...collection]);
			setValues({id:"",name:"",description:""});
			setEditModalOpen(false);
			toast.success("Editing successful");
		}catch(error){
			toast.error("Editing failed");
			setValues({id:"",name:"",description:""});
			setEditModalOpen(false);
		}
	}

	const downloadResponses = async (id) => {
		try{
			const file = await axios.get(`response/${id}`,null, {
				responseType:"blob"
			});
			const url = window.URL.createObjectURL(new Blob([file.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'responses.csv');
			document.body.appendChild(link);
			link.click();
			toast.success("Editing successful");
		}catch(error){
			toast.error("Downloading responses failed");
		}
	}

	useEffect(()=>{
		if(initial.current) return;
		setState();
		initial.current=true;
	},[])

	return (<div className="w-screen">
		<div className="flex justify-items-center relative w-screen border-black border-solid border-spacing-2 overflow-auto">
			<Table
			key="table"
			editBike={editBike}
			deleteBike={deleteBike}
			downloadResponses={downloadResponses}
			caption="Currently Available surveys"
			rows={collection}
			columns={columns}
			/>

		{addModalOpen && <Modal
			onClose={()=>setAddModalOpen(false)}
			onAction={createNewBike}
			modalTitle="Add Survey"
			modalText="Configure new survey"
			actionButtonTitle="Add survey"
			>
			<CreateEditBikeForm/>
		</Modal>}
		{editModalOpen && <Modal
			onClose={()=>setEditModalOpen(false)}
			onAction={editBikeAction}
			modalTitle="Edit survey"
			modalText="Change survey values"
			actionButtonTitle="Edit survey"
			>
			<CreateEditBikeForm/>
		</Modal>}
		{deleteModalOpen && <Modal
			onClose={()=>setDeleteModalOpen(false)}
			onAction={deleteBikeAction}
			modalTitle="Delete Survey"
			modalText="Are you sure you want to delete the survey"
			actionButtonTitle="Delete survey"
		/>}
		</div>
		<div className="flex row-auto">
		<ToastContainer
			position="bottom-right"
			autoClose={1000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
		<button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>setAddModalOpen(true)}>add survey </button>
		</div>
	</div>)
}

export default Page;