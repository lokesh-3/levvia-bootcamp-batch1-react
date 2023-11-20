import React, { useState, useEffect } from 'react';

import Header from './Header'
import Footer from './Footer'
import { createEngagement, getAllAuditOutcome, getAllAudityTypes, getAllCountry, getEngagmentById, updateEngagement } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

interface FormData {
  clientname: string;
  audittype: string;
  startdate: string;
  enddate: string;
  country: string;
  auditors: string;
  auditstatus: string;
  accountnumber: string;
  accountreceivables: string;
  cash: string;
  otherexpenses: string;
  inventory: string;
  auditoutcome: string;
  //dropdown: string;
  //  file: File;
}

export const ViewEngagement = () => {

  const Auditorsoptions = [
    { value: 0, auditName: "Risk managment", },
    { value: 1, auditName: "Compliance", },
    { value: 2, auditName: "Financial", }
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedAuditorOption, setselectedAuditorOption] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [clientName, setclientName] = useState('');
  const [selectedStartDate, setselectedStartDate] = useState('');
  const [selectedEndDate, setselectedEndDate] = useState('');
  const [AuditTypesdata, setAuditTypesdata] = useState<any>([]);
  const [selectedCountryOption, setselectedCountryOption] = useState(data);
  const [selectedAuditTypeOption, setselectedAuditTypeOption] = useState(AuditTypesdata);
  const [auditOutcomeData, setAuditOutcomeData] = useState<any>([]);
  const [engagementData, setEngagementData] = useState<any>();
  const [hideCountryField, setHideCountryField] = useState(true);
  const [hideStartDateField, setHideStartDateField] = useState(true);
  const [hideEndDateField, setHideEndDateField] = useState(true);
  const [hideAuditTypeField, setHideAuditTypeField] = useState(true);
  const [hideClientNameField, setHideClientNameField] = useState(true);
  const [apiResponse, setApiResponse] = useState<any>();
  const [defaultCountryLabel, setDefaultCountryLabel] = useState<any>();
  const [defaultAuditTypeLabel, setDefaultAuditTypeLabel] = useState<any>();
  const [accountNumber, setAccountNumber] = useState('');
  const [cash, setcash] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [inventory, setInventory] = useState('');
  const [auditOutcomeId, setAuditOutcomeId] = useState('');
  const [accountReceivable, setAccountReceivable] = useState('');

  let engagementDataType: any;
  let countryData: any;
  let auditTypeData: any;
  useEffect(() => {

    getAllCountry().then((response) => {
      if (response) {
        setData(response);
        countryData = response;
        // const val = response.filter(((el: any) => (
        //   el.id == selectedCountryOption
        // )))
        // setDefaultCountryLabel(val);
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })

    getAllAudityTypes().then((response) => {
      if (response) {
        setAuditTypesdata(response);
        auditTypeData = response;
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })

    getAllAuditOutcome().then((response) => {
      if (response) {
        setAuditOutcomeData(response);
      }
    }).catch((error) => {
      throw new Error('Network response was not ok');
    })

    getEngagmentById(Number(id)).then((res) => {
      if (res) {
        engagementDataType = {
          countyId: res.countyId,
          clientName: res.clientName,
          engagementStartDate: res.engagementStartDate,
          engagementEndDate: res.engagementEndDate,
          auditorids: []
        }
        setApiResponse(res);
        setclientName(res.clientName);
        setselectedStartDate(res.engagementStartDate);
        setselectedEndDate(res.engagementEndDate);
        setselectedCountryOption(res.countyId);
        setselectedAuditTypeOption(res.audittype);
        const val = countryData.filter(((el: any) => (
          el.id == res.countyId
        )))
        setDefaultCountryLabel(val[0].countyName);

        const auditType = auditTypeData.filter(((el: any) => (
          el.id == res.audittype
        )))
        setDefaultAuditTypeLabel(auditType[0].auditName);
      }
      setselectedAuditorOption(res.auditorids);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const handleClientNameChange = (event: any) => {
    setclientName(event.target.value);
  };

  const handleAccountNumberChange = (event: any) => {
    setAccountNumber(event.target.value);
  };

  const handleCashChange = (event: any) => {
    setcash(event.target.value);
  };

  const handleOtherExpencesChange = (event: any) => {
    setOtherExpenses(event.target.value);
  };

  const handleInventoryChange = (event: any) => {
    setInventory(event.target.value);
  };

  const handleAuditOutcomeIdChange = (event: any) => {
    setAuditOutcomeId(event.target.value);
  };

  const handleAccountReceivableChange = (event: any) => {
    setAccountReceivable(event.target.value);
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

  const handleShowInputFields = (inputFieldName: string) => {
    switch (inputFieldName) {
      case 'country':
        setHideCountryField(!hideCountryField);
        break;
      case 'resetCountry':
        setselectedCountryOption(apiResponse.countyId)
        setHideCountryField(!hideCountryField);
        break;
      case "startDate":
        setHideStartDateField(!hideStartDateField)
        break;
      case "resetStartDate":
        setselectedStartDate(apiResponse.engagementStartDate);
        setHideStartDateField(!hideStartDateField)
        break;
      case "endDate":
        setHideEndDateField(!hideEndDateField)
        break;
      case "resetEndDate":
        setselectedEndDate(apiResponse.engagementEndDate);
        setHideEndDateField(!hideEndDateField)
        break;
      case "clientName":
        setHideClientNameField(!hideClientNameField)
        break;
      case "resetClientName":
        setclientName(apiResponse.clientName);
        setHideClientNameField(!hideClientNameField)
        break;
      case "auditType":
        setHideAuditTypeField(!hideAuditTypeField)
        break;
      case "resetAuditType":

        setHideAuditTypeField(!hideAuditTypeField)
        break;
    }
  }

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
  async function finalupdateEngagement() {
    let myArray = [];
    if (selectedAuditorOption && selectedAuditorOption.length > 0)
      myArray.push(parseInt(selectedAuditorOption, 10));
    const formData = {
      clientId: Number(id),
      clientName: clientName,
      engagementStartDate: selectedStartDate,
      engagementEndDate: selectedEndDate,
      countyId: parseInt(selectedCountryOption, 10),
      auditorids: myArray,

      audittype: parseInt(selectedAuditTypeOption, 10).toString(),
      accountNumber: accountNumber,
      accountRecievable: Number(accountReceivable),
      cash: Number(cash),
      otherExpenses: Number(otherExpenses),
      inventory: Number(inventory),
      auditOutcomeId: Number(auditOutcomeId)
    };

    console.log(formData);
    updateEngagement(formData).then((res: any) => {
      if (res) {
        alert("Engagement is updated Successfully.")
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <Header />
      <div className='w-1/2 mx-auto flex justify-between'>
        <label className='text-black font-bold text-2xl ml-4 pl-10'>View Engagement </label>
        <span className="material-symbols-outlined pl-150" onClick={BackToHomeComponent}>home</span>
      </div>
      <hr className='border border-solid border-black w-95 mx-auto' style={{ width: '95%' }} />
      <main className='p-[30px]'>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label className='flex gap-2' htmlFor="clientName">Client Name* :</label>
              {hideClientNameField && <div className='flex'>
                <label className='mr-2'>{clientName}</label>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[20px]" onClick={() => handleShowInputFields('clientName')}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>}
              {!hideClientNameField && <div className='flex'>
                <input className='border border-black' type="text" id="clientName" name="clientName" value={clientName} onChange={handleClientNameChange} />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => handleShowInputFields('resetClientName')}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>}
            </div>

            <div>
              <label htmlFor="auditType">Audit Type* :
                {hideAuditTypeField && <div className='flex'>
                  <label className='mr-2'>{defaultAuditTypeLabel}</label>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[20px]" onClick={() => handleShowInputFields('auditType')}>
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </div>}
                {!hideAuditTypeField && <div className='flex'>
                  <select className='border border-black' placeholder='Select Audit Type' value={selectedAuditTypeOption} onChange={handleselectedAuditTypeOption}>
                    {AuditTypesdata.map((item: any, index: any) => (
                      <option key={index} value={item?.id}>
                        {item?.auditName}
                      </option>
                    ))}
                  </select>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => handleShowInputFields('resetAuditType')}>
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>}
              </label>
            </div>

          </div>
          {/* Audit Timelines */}

          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="startDate">StartDate* : </label>
              {hideStartDateField && <div className='flex'>
                <label className='mr-2'>{selectedStartDate}</label>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[20px]" onClick={() => handleShowInputFields('startDate')}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>}
              {!hideStartDateField && <div className='flex'>
                <input className='border border-black' type="date" id="startDate" name="Start" value={selectedStartDate} onChange={handleStarDateChange} />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => handleShowInputFields('resetStartDate')}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>}
            </div>

            <div>
              <label htmlFor="endDate">EndDate* : </label>
              {hideEndDateField && <div className='flex'>
                <label className='mr-2'>{selectedEndDate}</label>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[20px]" onClick={() => handleShowInputFields('endDate')}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>}
              {!hideEndDateField && <div className='flex'>
                <input className='border border-black' type="date" id="endDate" name="End" value={selectedEndDate} onChange={handleEndDateChange} />
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => handleShowInputFields('resetEndDate')}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>}
            </div>

            <div>
              <label htmlFor="country">Country: </label>
              {hideCountryField && <div className='flex'>
                <label className='mr-2'>{defaultCountryLabel}</label>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[20px]" onClick={() => handleShowInputFields('country')}>
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </div>}
              {!hideCountryField && <div className='flex'>
                <select className='border border-black' placeholder='Select Country Type' value={selectedCountryOption} onChange={handleSelectCountryChange} >
                  {data.map((item: any, index: any) => (
                    <option key={index} value={item?.id}>
                      {item?.countyName}
                    </option>
                  ))}
                </select>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" onClick={() => handleShowInputFields('resetCountry')}>
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>}
            </div>
          </div>

        </section>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="auditors">Auditors*: </label>
              <select className='border border-black ml-5' value={selectedAuditorOption} onChange={handleSelectAuditorsChange}>
                {Auditorsoptions.map((item: any, index: any) => (
                  <option key={index} value={item?.value}>
                    {item?.auditName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="auditors">Audit status: </label>
              <select className='border border-black ml-5' value={selectedAuditorOption} onChange={handleSelectAuditorsChange}>
                <option>
                  Not started
                </option>
              </select>
            </div>
          </div>
        </section>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="auditors">Account Number </label>
              <input className='border border-black' type="number" id="accountNumber" name="accountNumber" value={accountNumber} onChange={handleAccountNumberChange} />
            </div>
            <div>
              <label htmlFor="auditors">Account Receivables </label>
              <input className='border border-black' type="number" id="accountReceivables" name="accountReceivables" value={accountReceivable} onChange={handleAccountReceivableChange} />
            </div>
          </div>
        </section>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="auditors">Cash </label>
              <input className='border border-black' type="number" id="cash" name="cash" value={cash} onChange={handleCashChange} />
            </div>
            <div>
              <label htmlFor="auditors">Other expences </label>
              <input className='border border-black' type="number" id="otherExpences" name="otherExpences" value={otherExpenses} onChange={handleOtherExpencesChange} />
            </div>
          </div>
        </section>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="auditors">Inventory </label>
              <input className='border border-black' type="number" id="inventory" name="inventory" value={inventory} onChange={handleInventoryChange} />
            </div>
            <div>
              <label htmlFor="auditors">Audit Outcome </label>
              <select className='border border-black ml-5' value={auditOutcomeId} onChange={handleAuditOutcomeIdChange}>
                {auditOutcomeData.map((item: any, index: any) => (
                  <option key={index} value={item?.id}>
                    {item?.auditOutcome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <section className='w-1/2 mx-auto'>
          <div className='flex justify-between py-[20px]'>
            <div>
              <label htmlFor="attachment">Attachment
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </label>
              <input className='hidden' multiple type="file" id="attachment" name="attachment" />
            </div>
            <div>
              <button className=' class="cursor-pointer p-1 mr-10 border border-black text-center ' onClick={finalupdateEngagement}>Save</button>
            </div>
            <div>
              <button className=' class="cursor-pointer float-right p-1 mr-10 border border-black text-center '>Generate Audit Report</button>
            </div>
          </div>
        </section>
      </main >
      <Footer />
    </>
  )
}