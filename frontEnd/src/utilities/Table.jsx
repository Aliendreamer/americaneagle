/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const Table = ({ columns,caption,editBike,downloadResponses,deleteBike, rows }) => {
  return (
    <div className='my-10 flex-row basis-full'>
	<h2 className='text-xl underline text-center mb-2'>{caption}</h2>
	<div className="overflow-x-auto relative shadow-md sm:rounded-lg">

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
        <thead className='className="text-xs text-gray-700 uppercase dark:text-gray-400'>
          <tr>
            {columns.map((column) => (<th key={column.accessor}  scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
						<span className='text-center'>{column.label}</span>
				</th>
			))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
                {columns.map((column) => {
					const isActions = column.label=="Actions";
					const isLink = column.label=="Link";
					if(isActions){
						return <td className="py-4 px-6"  key={column.accessor}>
						<button className="mx-1 my-1 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>editBike(row)}>edit survey </button>
						<button className="inline-block mx-1 my-1 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>deleteBike(row.id)}>delete survey </button>
						<button className="inline-block mx-1 my-1 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>downloadResponses(row.id)}>download responses</button>
						</td>
					}
					if(isLink){
						return <td className="py-4 px-6"  key={column.accessor}>
							<Link style={{ textDecoration:"underline",textColor:"text-blue-60"}} to={{ pathname: `/detail/${row.id}` }}>{`${row.name}`}</Link>
						</td>
					}
                  return <td className='py-4 px-6" truncate' key={column.accessor}>{row[column.accessor]}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
	</div>
    </div>
  )
}