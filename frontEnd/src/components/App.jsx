import { Routes, Route } from 'react-router-dom';
import Page from "./Page";
import DetailPage from "./DetailPage";
function App() {
  return (
	<div className="flex h-screen w-full">
		<Routes>
			<Route index path="/"element={<Page />} />
			<Route path="/detail/:id" element={<DetailPage />} />
			<Route path="*" element={<p>There is nothing here: 404!</p>} />
		</Routes>
	</div>
  )
}

export default App
