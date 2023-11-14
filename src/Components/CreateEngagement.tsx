import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import axios from 'axios';
import { getAllAudityTypes, getAllCountry } from '../api';

export const CreateEngagement = () => {

  const [data, setData] = useState<any>([]);
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