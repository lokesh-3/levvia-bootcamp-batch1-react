import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import { createEngagement, getAllAudityTypes, getAllCountry } from '../api';
import { useNavigate } from 'react-router-dom';

export const CreateEngagement = () => {

  const Auditorsoptions = [
    { value: 0, auditName: "Risk managment", },
    { value: 1, auditName: "Compliance", },
    { value: 2, auditName: "Financial", }
  ];
  const navigate = useNavigate();
  const [selectedAuditorOption, setselectedAuditorOption] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [clientName, setclientName] = useState('');
  const [selectedStartDate, setselectedStartDate] = useState('');
  const [selectedEndDate, setselectedEndDate] = useState('');
  const [AuditTypesdata, setAuditTypesdata] = useState<any>([]);
  const [selectedCountryOption, setselectedCountryOption] = useState(data);
  const [selectedAuditTypeOption, setselectedAuditTypeOption] = useState(AuditTypesdata);

  useEffect(() => {

    getAllCountry().then((response) => {
      if (response) {
        setData(response);
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })

    getAllAudityTypes().then((response) => {
      if (response) {
        setAuditTypesdata(response);
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })
  }, [])

  const handleClientNameChange = (event: any) => {
    setclientName(event.target.value);
  };
  const handleselectedAuditTypeOption = (event: any) => {
    setselectedAuditTypeOption(event.target.value);
  };
  const handleSelectCountryChange = (event: any) => {
    setselectedCountryOption(event.target.value);
  };
  const handleSelectAuditorsChange = (event: any) => {
    setselectedAuditorOption(event.target.value);
  };
  const handleStarDateChange = (event: any) => {
    setselectedStartDate(event.target.value);
  };
  const handleEndDateChange = (event: any) => {
    setselectedEndDate(event.target.value)
  };

  async function FinalCreateEngagement() {
    let myArray = [];
    myArray.push(parseInt(selectedAuditorOption, 10));
    const formData = {
      clientId: 0,
      clientName: clientName,
      engagementStartDate: selectedStartDate,
      engagementEndDate: selectedEndDate,
      countyId: parseInt(selectedCountryOption, 10),
      auditorids: myArray,
    };

    createEngagement(formData).then((res) => {
      if (res) {
        navigate("/");
      }
    }).catch((err) => {
      throw new Error('Network response was not ok');
    })
  }

  const BackToHomeComponent = () => {
    window.location.href = '/'
    window.history.replaceState(null, 'Home', '/');
  };
  return (
    <>
      <Header />
      <div className='grid grid-cols-2 pt-2'>
        <label className='text-black font-bold text-2xl ml-4 pl-10'>Create Engagement: </label>
        <span className="material-symbols-outlined pl-150" onClick={BackToHomeComponent}>home</span>
      </div>
      {/* //////////////////////flex justify-around mr-97 items-center  max-w-md;/////////////////////////////////////////// */}
      <main className='grid grid-cols-2 mt-10 p-20'>
        <section className='flex flex-col gap-10'>
          <div className='flex flex-col gap-5'>
            <label className='flex gap-2' htmlFor="clientName">Client Name* :
              <input className='border border-black' type="text" id="clientName" name="clientName" value={clientName} onChange={handleClientNameChange} />
            </label>
            <label htmlFor="auditType">Audit Type* :
              <select className='border border-black ml-5' placeholder='Select Audit Type' value={selectedAuditTypeOption} onChange={handleselectedAuditTypeOption}>
                {AuditTypesdata.map((item: any, index: any) => (
                  <option key={index} value={item?.id}>
                    {item?.auditName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* Audit Timelines */}

          <div>
            <label>Audit Timelines: </label>
            <label htmlFor="startDate">StartDate* : </label>
            <input className='border border-black' type="date" id="startDate" name="Start" value={selectedStartDate} onChange={handleStarDateChange} />
            <label htmlFor="endDate" className='ml-5'>EndDate* : </label>
            <input className='border border-black' type="date" id="endDate" name="End" value={selectedEndDate} onChange={handleEndDateChange} />
          </div>
          {/* country */}
          <div>
            <label htmlFor="country">Country: </label>
            <select className='border border-black ml-5' placeholder='Select Country Type' value={selectedCountryOption} onChange={handleSelectCountryChange}>
              {data.map((item: any, index: any) => (
                <option key={index} value={item?.id}>
                  {item?.countyName}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className='gap-2'>
          <label htmlFor="auditors">Auditors*: </label>
          <select className='border border-black ml-5' value={selectedAuditorOption} onChange={handleSelectAuditorsChange}>
            {Auditorsoptions.map((item: any, index: any) => (
              <option key={index} value={item?.value}>
                {item?.auditName}
              </option>
            ))}
          </select>
        </section>


      </main>
      <section>
        <button className=' class="cursor-pointer float-right p-2 mr-10 border border-black text-center ' onClick={FinalCreateEngagement}>Submit</button>
      </section>
      <Footer />
    </>
  )
}