import { useForm } from "react-hook-form";
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";
import { strapiApi } from "../../constant/constant";
import { useEffect } from "react";

const token = JSON.parse(localStorage.getItem('currentUser'))?.jwt;
const header = {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
}

async function createParty(party) {
  return fetch(`${strapiApi}/parties`, {
    method: 'POST',
    ...header,
    body: JSON.stringify(party)
  }).then(data => data.json());
}

async function updateParty(id, party) {
  return fetch(`${strapiApi}/parties/${id}`, {
    method: 'PUT',
    ...header,
    body: JSON.stringify(party)
  }).then(data => data.json());
}

async function getParty(id) {
  return fetch(`${strapiApi}/parties/${id}`, {
    method: 'GET',
    ...header,
  }).then(data => data.json());
}

function PartyForm(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = async (data) => {
    if (!!id) {
      update(data);
      return;
    }
    create(data);
  }

  async function create(data) {
    const response = await createParty({ data: data });
    if (!!response.error) {
      swal(response.error.message);
      return;
    }
    swal('สร้างปาร์ตี้สำเร็จ').then(() => navigate('/parties'));
  }

  async function update(data) {
    const response = await updateParty(id, { data: data });
    if (!!response) {
      swal('แก้ไขปาร์ตี้สำเร็จ').then(() => navigate('/my-parties'));
      return;
    }
    swal(response.error.message);
  }

  async function fetchParty() {
    const response = await getParty(id);
    if (response.error) {
      return;
    }
    setValue('party_name', response.party_name);
    setValue('max_member', response.max_member);
  }

  useEffect(() => {
    if (!!id) {
      fetchParty();
    }
  });

  return (
    <div className="row justify-content-center h-100">
      <div className="col-11 col-sm-10 col-md-6 col-lg-4 rounded m-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group text-start">
            <label>ชื่อปาร์ตี้</label>
            <input type="text" className="form-control" {...register("party_name", { required: true })} />
            {errors.party_name && <small className="text-danger">กรุณาใส่ชื่อปาร์ตี้</small>}
          </div>
          <div className="form-group text-start mt-3 my-5">
            <label>จำนวนคนที่ขาด</label>
            <input type="text" className="form-control" {...register("max_member", { required: true })} />
            {errors.max_member && <small className="text-danger">กรุณาใส่จำนวนคน</small>}
          </div>

          <button type="submit" className="btn btn-primary d-block m-auto my-3">{id ? 'แก้ไขปาร์ตี้' : 'สร้างปาร์ตี้'}</button>
        </form>
      </div>
    </div>
  );
}

export default PartyForm;