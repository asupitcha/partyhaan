import { useState, useEffect } from 'react';
import PartyItem from "./PartyItem";
import { strapiApi } from '../../constant/constant';

async function getParties() {
  const token = JSON.parse(localStorage.getItem('currentUser')).jwt;
  return fetch(`${strapiApi}/parties`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.json());
}

function PartiesPage(props) {
  const [loadingElement, setLoadingElement] = useState(<div className="loading">Loading...</div>)
  const [parties, setParties] = useState([]);

  async function fetchData() {
    const response = await getParties();
    setParties(response);
    setLoadingElement(null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const partiesElements = parties.map(party => <PartyItem key={party.id} party={party} />);
  const notFoundElement = <div className="text-center">ไม่พบปาร์ตี้ที่คุณเข้าร่วมได้</div>

  return (
    <div className="row justify-content-center justify-content-md-start">
      {!!!parties || partiesElements}
      {!loadingElement && parties.length === 0 && notFoundElement}
      {loadingElement}
    </div>
  );

}

export default PartiesPage;