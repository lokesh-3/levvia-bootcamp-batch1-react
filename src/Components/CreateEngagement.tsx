//import React, { useState } from 'react'
import React, { useState, useEffect } from 'react';

import Header from './Header'
import Footer from './Footer'

export const CreateEngagement = () => {
  const options = [
    { value: 'Financial', label: 'Financial' },
    { value: 'Compliance', label: 'Compliance' },
    { value: 'Operational', label: 'Operational' },
  ];
  // const countryOptions = [
  //   { value: 'India', label: 'India' },
  //   { value: 'USA', label: 'USA' },
  //   { value: 'Canada', label: 'Canada' },
  // ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);

// Api Call 
const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch('https://localhost:44329/api/CreateEngagement');
  
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
  useEffect(()=>{
    fetchData()
  
    },[])

    const [selectedCountryOption, setselectedCountryOption] = useState(data);

// Api Call End


  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
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
            <label htmlFor="auditType">Audit Type Hello* :
            <select className='border border-black ml-5' value={selectedOption} onChange={handleSelectChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
              {data.map((item:any,index:any) => (
                <option key={index} value={item?.countryId}>
                  {item?.countryName}
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