import { strapi, strapiApi } from "../../constant/constant";
import './PartyItem.scss';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

async function deleteParty(id) {
  const token = JSON.parse(localStorage.getItem('currentUser')).jwt;
  return fetch(`${strapiApi}/parties/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

async function joinParty(id) {
  const token = JSON.parse(localStorage.getItem('currentUser')).jwt;
  return fetch(`${strapiApi}/parties/${id}/join`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

function PartyItem(props) {
  const { party, isEdit } = props;
  const navigate = useNavigate();

  function onEdit() {
    if (isEdit) {
      navigate(`/my-parties/${party.id}`);
      return;
    }
    join();
  }

  function join() {
    swal("คุณต้องการเข้าร่วมปาร์ตี้นี้ใช่หรือไม่", {
      buttons: ['ยกเลิก', 'เข้าร่วม']
    }).then(async (value) => {
      if (value) {
        const response = await joinParty(party.id);
        if (response.error) {
          swal(response.error.message);
          return;
        }
        window.location.reload(false);
      }
    });
  }

  function onDelete() {
    swal("คุณต้องการลบปาร์ตี้นี้ใช่หรือไม่", {
      buttons: ['ยกเลิก', 'ยืนยัน']
    }).then(async (value) => {
      if (value) {
        const response = await deleteParty(party.id);
        if (response.error) {
          swal(response.error.message);
          return;
        }
        window.location.reload(false);
      }
    });
  }

  return (
    <div className="col-10 col-md-6 col-lg-3 px-3 pb-5">
      <div className="party-container p-3">
        <div className="party-image">
          <div className="square">
            <img src={party.image ? strapi + party.image.url : 'partyhaan.png'} alt="party" className="img-fluid" />
          </div>
        </div>
        <div className="text-start pt-3 pb-2">
          {party.party_name}
        </div>
        <div className="d-flex justify-content-between border-top pt-2">
          <div className="my-auto">
            {party.total_member}/{party.max_member}
          </div>
          <div className="button">
            {!isEdit || <button className="btn btn-danger me-2" onClick={onDelete}>Delete</button>}
            <button className="btn btn-outline-secondary" onClick={onEdit}>{isEdit ? 'Edit' : 'Join'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyItem;