import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import { any } from 'prop-types';
import axios from 'axios';
import { createEngagement, getAllAudityTypes, getAllCountry, getUsers, sendEmailNotifications } from '../api';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export const CreateEngagement = () => {

  const Auditorsoptions = [
    { value: 0, label: "Risk", auditName: "Risk managment", },
    { value: 1, label: "Compliance", auditName: "Compliance", },
    { value: 2, label: "Financial", auditName: "Financial", }
  ];
  const navigate = useNavigate();
  const [AuditorData, setAuditorData] = useState<any>([])
  const [selectedAuditorOption, setselectedAuditorOption] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [clientName, setclientName] = useState('');
  const [selectedStartDate, setselectedStartDate] = useState('');
  const [selectedEndDate, setselectedEndDate] = useState('');
  const [AuditTypesdata, setAuditTypesdata] = useState<any>([]);
  const [selectedCountryOption, setselectedCountryOption] = useState(data);
  const [selectedAuditTypeOption, setselectedAuditTypeOption] = useState(AuditTypesdata);
  const [ClientNameerror, setClientNameerror] = useState('');
  const [Dateerror, setDateerror] = useState('');
  const [AuditTypeerror, setAuditTypeerror] = useState('');
  const [Auditorerror, setAuditorerror] = useState('');
  const [ValidationFlag, setValidationFlag] = useState(true);
  const handleTypeSelect = (selectedList: any, selectedItem: any) => {
    if (selectedList.length >= selectedAuditorOption.length) {
      setselectedAuditorOption(selectedList);
    } else {
      const updatedList = selectedAuditorOption.filter(
        (item: any) => item.id !== selectedItem.id
      );
      setselectedAuditorOption(updatedList);
    }


  };

  useEffect(() => {

    getAllCountry().then((response) => {
      if (response) {
        setData(response);
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })
    getUsers().then((response) => {
      if (response) {
        setAuditorData(response);
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
    setClientNameerror(''); // Clear any previous errors when the input changes
  };
  const handleselectedAuditTypeOption = (event: any) => {
    setselectedAuditTypeOption(event.target.value);
    setAuditTypeerror(''); // Clear any previous errors when the input changes
  };
  const handleSelectCountryChange = (event: any) => {
    setselectedCountryOption(event.target.value);
  };
  const handleSelectAuditorsChange = (event: any) => {
    setselectedAuditorOption(event.target.value);
    setAuditorerror(''); // Clear any previous errors when the input changes
  };
  const handleStarDateChange = (event: any) => {
    setselectedStartDate(event.target.value);
    setDateerror(''); // Clear any previous errors when the input changes
  };
  const handleEndDateChange = (event: any) => {
    setselectedEndDate(event.target.value);
    setDateerror(''); // Clear any previous errors when the input changes
  };

  async function FinalCreateEngagement() {
    AuditorvaluesArray = null;
    if (clientName.trim() === '') {
      setClientNameerror('Client Name Field cannot be empty');
      return;
    }
    if (selectedAuditTypeOption == '') {
      setAuditTypeerror('Auditortype Field cannot be Empty')
      return;
    }
    if (selectedStartDate == '' || selectedEndDate == '') {
      setDateerror('Start and End Dates cannot be null')
      return;
    }
    if (selectedAuditorOption.length == 0) {
      setAuditorerror('Auitor field cannot be Empty')
      return;
    }
    else {
      var AuditorvaluesArray = selectedAuditorOption.map((item: any) => item.value);
    }
  
    const formData = {
      clientName: clientName,
      engagementStartDate: selectedStartDate,
      engagementEndDate: selectedEndDate,
      countryID: parseInt(selectedCountryOption, 10),
      //auditorids: AuditorvaluesArray,
      auditType: parseInt(selectedAuditTypeOption,10),
      // accountId: 0,
      // accountNumber: "",
      // accountRecievable: 0,
      // cash: 0,
      // otherExpenses: 0,
      // inventory: 0,
      // auditOutcomeId: 0,
      // auditStatus:0
    };
   
    if(new Date(selectedStartDate) > new Date(selectedEndDate)) {
      alert('End date should be greater than the start date.');
      return; 
  }


    const formBody: string[] = [];
    selectedAuditorOption.forEach((element: any) => {
      formBody.push(element.label);
    });

    const req = {
      to: formBody
    }
    createEngagement(formData).then((res) => {
      if (res) {
        sendEmailNotifications(req).then((res) => {
          console.log(res)
        }).catch(err => console.log(err))
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
            <label className='flex gap-2' htmlFor="clientName">Client Name<span className='text-red-700'>*</span> :
              <input className='border border-black' type="text" id="clientName" name="clientName" value={clientName} onChange={handleClientNameChange} />
            </label>
            {ClientNameerror && <p style={{ color: 'red' }}>{ClientNameerror}</p>}
            <label htmlFor="auditType">Audit Type<span className='text-red-700'>*</span> :
              <select className='border border-black ml-5' placeholder='Select Audit Type' value={selectedAuditTypeOption} onChange={handleselectedAuditTypeOption}>
                <option value="" disabled selected>Select Audit</option>
                {AuditTypesdata.map((item: any, index: any) => (
                  <option key={index} value={item?.id}>
                    {item?.auditName}
                  </option>
                ))}
              </select>
            </label>
            {AuditTypeerror && <p style={{ color: 'red' }}>{AuditTypeerror}</p>}
          </div>
          {/* Audit Timelines */}
          <div className='w-max'>
            <label>Audit Timelines: </label>
            <label className='ml-2' htmlFor="startDate">StartDate<span className='text-red-700'>*</span> : </label>
            <input className='border border-black ml-2' type="date" id="startDate" name="Start" value={selectedStartDate} onChange={handleStarDateChange} />
            <label htmlFor="endDate" className='ml-5'>EndDate<span className='text-red-700'>*</span> : </label>
            <input className='border border-black ml-2' type="date" id="endDate" name="End" value={selectedEndDate} onChange={handleEndDateChange} />
            {Dateerror && <p style={{ color: 'red' }}>{Dateerror}</p>}
          </div>

          {/* country */}
          <div>
            <label htmlFor="country">Country: </label>
            <select className='border border-black ml-5' value={selectedCountryOption} onChange={handleSelectCountryChange}>
              <option value="" disabled selected> Select Country</option>
              {data.map((item: any, index: any) => (
                <option key={index} value={item?.id}>
                  {item?.countyName}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className='gap-2'>
          <label htmlFor="auditors">Auditors<span className='text-red-700'>*</span> : </label>
          <Select
            isMulti
            className="w-1/2"
            options={AuditorData.map((user: any) => ({
              value: user.id,
              label: user.email,

            }))} value={selectedAuditorOption} onChange={handleTypeSelect} />
          {Auditorerror && <p style={{ color: 'red' }}>{Auditorerror}</p>}
        </section>
        <section>
          <button className=' class="cursor-pointer float-right p-2 mr-10 border border-black text-center ' onClick={FinalCreateEngagement}>Submit</button>
        </section>

      </main>

      <Footer />
    </>
  )
}