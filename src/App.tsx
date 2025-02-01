import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import {
  Overview,
  SharedLayout,
} from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Overview />} />
          <Route path="dashboard" element={<Overview />} />
        </Route>
        <Route path="*" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
