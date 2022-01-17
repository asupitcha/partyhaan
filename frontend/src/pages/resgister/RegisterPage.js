
import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useRef } from "react";

async function registerUser(credentials) {
  return fetch('http://localhost:1337/api/auth/local/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json());
}

function RegisterPage(props) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    console.log(password.current);

    const response = await registerUser(data);
    if (response.user) {
      return;
    }
    swal(response.error.message);
  }

  return (
    <div className="row justify-content-center h-100">
      <div className="col-10 col-md-6 col-lg-4 rounded m-auto px-5">
        <div className="h5 text-center mb-5">
          สร้างบัญชีผู้ใช้
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>อีเมล</label>
            <input type="text" className="form-control" {...register("email", { required: true })} />
            {errors.email && <small className="text-danger">กรุณาใส่อีเมล</small>}
          </div>
          <div className="form-group my-3">
            <label>รหัสผ่าน</label>
            <input type="password" className="form-control" {...register("password", { required: true })} />
            {errors.password && <small className="text-danger">กรุณาใส่รหัสผ่าน</small>}
          </div>
          <div className="form-group my-3">
            <label>ยืนยันรหัสผ่าน</label>
            <input type="password" className="form-control" {...register("cfPassword",
              { required: "กรุณายืนยันรหัสผ่าน", validate: value => value === password.current || 'รหัสผ่านไม่ตรงกัน' })} />
            {errors.cfPassword && <small className="text-danger">{errors.cfPassword.message}</small>}
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="terms" {...register("terms", { required: true })} />
            <label className="form-check-label" htmlFor="terms">ฉันยอมรับเงื่อนไขและข้อตกลงเกี่ยวกับการใช้งาน</label>
            {errors.terms && <small className="text-danger">กรุณากดยอมรับเงื่อนไข</small>}
          </div>
          <button type="submit" className="btn btn-primary d-block m-auto my-5 w-50">ยืนยัน</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;