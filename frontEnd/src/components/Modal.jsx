/* eslint-disable react/prop-types */
const Modal = ({onClose,onAction,modalTitle,modalText,actionButtonTitle,children})=>{

	return(<div id="large-modal" tabIndex="-1" className="flex justify-center items-center overflow-y-auto absolute overflow-x-hidden border-black border-solid border-box z-50 w-fit  h-fit ">
		<div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
			<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div className="flex rounded-t border-box dark:border-gray-600">
					<button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="large-modal"
					onClick={onClose}
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

					</button>
				</div>
				<h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
						{modalTitle}
				</h3>
				<div className="p-6 space-y-6">
					<p className="text-base text-center text-gray-500 dark:text-gray-400">
					{modalText}
					</p>
					{children}
				</div>
				<div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
					<button data-modal-toggle="large-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={onAction}
					>
						{actionButtonTitle}
					</button>
					<button data-modal-toggle="large-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
					onClick={onClose}
					>Close
					</button>
				</div>
			</div>
		</div>
	</div>
	)
}

export default Modal;