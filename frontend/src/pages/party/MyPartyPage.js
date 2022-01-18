import { useState, useEffect } from 'react';
import PartyItem from "./PartyItem";
import { strapiApi } from '../../constant/constant';

async function getMyParties() {
  const token = JSON.parse(localStorage.getItem('currentUser')).jwt;
  return fetch(`${strapiApi}/my_parties`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.json());
}

function MyPartyPage(props) {
  const [loadingElement, setLoadingElement] = useState(<div className="loading">Loading...</div>)
  const [parties, setParties] = useState([]);

  async function fetchData() {
    const response = await getMyParties();
    setParties(response);
    setLoadingElement(null);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const partiesElements = parties.map(party => <PartyItem key={party.id} party={party} isEdit={true} />);
  const notFoundElement = <div className="text-center">ไม่พบปาร์ตี้ของคุณ</div>

  return (
    <div className="row justify-content-center justify-content-md-start">
      {!!!parties || partiesElements}
      {!loadingElement && parties.length === 0 && notFoundElement}
      {loadingElement}
    </div>
  );

}

export default MyPartyPage;