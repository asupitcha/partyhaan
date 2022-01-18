import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { Link, useNavigate } from "react-router-dom";
import { strapiApi } from "../../constant/constant";

async function loginUser(credentials) {
  return fetch(`${strapiApi}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

function LoginPage(props) {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.user) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      navigate('/');
      window.location.reload(false);
      return;
    }
    swal(response.error.message);
  }

  return (
    <div className="row justify-content-center h-100">
      <div className="col-11 col-sm-10 col-md-6 col-lg-4 rounded m-auto px-5">
        <div className="image text-center">
          <img src="partyhaan.png" alt="logo" width="250" className="img-fluid" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>อีเมล</label>
            <input type="text" className="form-control" {...register("identifier", { required: true })} />
            {errors.identifier && <small className="text-danger">Email is required.</small>}
          </div>
          <div className="form-group mt-3 my-5">
            <label>รหัสผ่าน</label>
            <input type="password" className="form-control" {...register("password", { required: true })} />
            {errors.password && <small className="text-danger">Password is required.</small>}
          </div>

          <button type="submit" className="btn btn-primary d-block m-auto my-3">เข้าสู่ระบบ</button>
          <Link to="/register">
            <button type="button" className="btn btn-secondary d-block m-auto my-3">สร้างบัญชีผู้ใช้</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;