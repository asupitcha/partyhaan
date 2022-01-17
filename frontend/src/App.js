import logo from './logo.svg';
import './App.scss';
import { Link, Route, Routes, Outlet } from 'react-router-dom';
import PartyPage from './pages/party/PartyPage';
import PartiesPage from './pages/party/PartiesPage';

function Main() {
  return (
    <div>
      <div className="row bg-light py-2 px-4">
        <div className="col-2 text-start m-auto">icon</div>
        <div className="col h5 m-auto">ปาร์ตี้ทั้งหมด</div>
        <div className="col-2 text-end">
          <button className="btn btn-secondary">
            สร้างปาร์ตี้
        </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<PartiesPage />} />
          <Route path=":id" element={<PartyPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
