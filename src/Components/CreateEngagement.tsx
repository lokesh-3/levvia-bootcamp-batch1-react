//import React, { useState } from 'react'
import React, { useState, useEffect } from 'react';

import Header from './Header'
import Footer from './Footer'

export const CreateEngagement = () => {

  // Api Call --------------------------------------------------------------------------------------
  const [data, setData] = useState<any>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // API for country ----------------------------------------------------------------
  async function fetchData() {
    try {
      const response = await fetch('https://feature1-webappbackend.azurewebsites.net/api/Comman/GetAllCountry');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response Data:', data);
      setData(data)
      // Now you can work with the JSON data
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }
  const [selectedCountryOption, setselectedCountryOption] = useState(data);

  // API for Audit types----------------------------------------------https://feature1-webappbackend.azurewebsites.net/api/AuditMaster/GetAllAudits-----------
  const [AuditTypesdata, setAuditTypesdata] = useState<any>([]);
  async function getAuditTypesData() {
    try {
      const response = await fetch('https://feature1-webappbackend.azurewebsites.net/api/AuditMaster/GetAllAudits');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const AuditTypesdata = await response.json();
      setAuditTypesdata(AuditTypesdata)
      // Now you can work with the JSON data
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }
  const [selectedAuditTypeOption, setselectedAuditTypeOption] = useState(AuditTypesdata);

  //API call functions--------------------------------
  useEffect(() => {
    fetchData();
    getAuditTypesData();
  }, [])

  // Api Call End--------------------------------------------


  const handleselectedAuditTypeOption = (event: any) => {
    setselectedAuditTypeOption(event.target.value);
  };
  const handleSelectCountryChange = (event: any) => {
    setselectedCountryOption(event.target.value);
  };

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
              <input className='border border-black' type="text" id="clientName" name="clientName" />
            </label>
            <label htmlFor="auditType">Audit Type* :
              <select className='border border-black ml-5' value={selectedAuditTypeOption} onChange={handleselectedAuditTypeOption}>
                {AuditTypesdata.map((item: any, index: any) => (
                  <option key={index} value={item?.id}>
                    {item?.auditName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/* Audit Timelines */}
          <label>Audit Timelines: </label>
          <div>
            <label htmlFor="startDate">StartDate* : </label>
            <input className='border border-black' type="date" id="startDate" name="Start" />
            <label htmlFor="endDate" className='ml-5'>EndDate* : </label>
            <input className='border border-black' type="date" id="endDate" name="End" />
          </div>
          {/* country */}
          <div>
            <label htmlFor="country">Country: </label>
            <select className='border border-black ml-5' value={selectedCountryOption} onChange={handleSelectCountryChange}>
              {data.map((item: any, index: any) => (
                <option key={index} value={item?.id}>
                  {item?.countyName}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className='flex gap-2'>
          <label htmlFor="auditors">Auditors*: </label>
          <textarea className='border border-black' placeholder="Enter text here..." rows={10} cols={50}></textarea>
        </section>
      </main>
      <Footer />
    </>
  )
}