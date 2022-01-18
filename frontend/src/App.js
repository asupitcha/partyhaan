import './App.scss';
import { Route, Routes, Outlet, useNavigate, Link } from 'react-router-dom';
import PartiesPage from './pages/party/PartiesPage';
import NavDropdown from 'react-bootstrap/NavDropdown';
import swal from 'sweetalert';
import PartyForm from './pages/party/PartyForm';
import MyPartyPage from './pages/party/MyPartyPage';

function Main() {
  const navigate = useNavigate();

  function logout() {
    swal("ยืนยันการออกจากระบบ", {
      buttons: ['ยกเลิก', 'ยืนยัน']
    }).then((value) => {
      if (value) {
        navigate('/login');
        localStorage.removeItem('currentUser');
      }
    });
  }

  return (
    <div className="d-flex flex-column h-100">
      <div className="row nav-color py-2 px-1 px-lg-4">
        <div className="col-2 text-start m-auto">
          <NavDropdown
            title="Menu"
            menuVariant="light"
          >
            <NavDropdown.Item className="d-block d-md-none" href="/create">สร้างปาร์ตี้</NavDropdown.Item>
            <NavDropdown.Item href="/my-parties">ปาร์ตี้ของฉัน</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logout}>ออกจากระบบ</NavDropdown.Item>
          </NavDropdown>
        </div>
        <div className="col h5 m-auto main">
          <Link to="/">
            ปาร์ตี้ทั้งหมด
          </Link>
        </div>
        <div className="col-2 text-end">
          <Link to="create" className="d-none d-md-block">
            <button className="btn btn-secondary">
              สร้างปาร์ตี้
          </button>
          </Link>
        </div>
      </div>
      <div className="container py-5 overflow-auto h-100">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="parties" element={<PartiesPage />} />
          <Route path="create" element={<PartyForm />} />
          <Route path="my-parties" element={<MyPartyPage />} />
          <Route path="my-parties/:id" element={<PartyForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
