import { useEffect, useState } from "react";
import { Engagements } from "./Engagements";
import { CreateEngagement } from "./CreateEngagement";
import { Reports } from "./Reports";

interface ITabHeader {
    tabArray: any
}
export const TabHeader = (props: ITabHeader) => {
    const [showEngagementsComponent, setshowEngagementsComponent] = useState(false);
    const toggleEngagementsComponent = () => {
        setshowEngagementsComponent(!showEngagementsComponent);
    };
    const [showReportsComponent, setshowReportsComponent] = useState(false);
    const toggleshowReportsComponent = () => {
        setshowReportsComponent(!showReportsComponent);
    };
    const [showapiConsumerComponent, setshowapiConsumerComponent] = useState(false);
    const toggleshowapiConsumerComponent = () => {
        setshowapiConsumerComponent(!showapiConsumerComponent);
    };

    const [AllEngagementdata, setAllEngagementdata] = useState<any>([]);
  async function getEngagementData() {
    try {
      const response = await fetch('https://feature1-webappbackend.azurewebsites.net/api/Engagement/GetAll');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const Engagementdata = await response.json();
      setAllEngagementdata(Engagementdata)
      // Now you can work with the JSON data
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }
  useEffect(() => {
    getEngagementData();
  }, [])
    //const [arr1, setArr1] = useState(["1234", "Deloitte", "Financial", "In Progress", " 10-10-2023", " 30-10-2023"]);

    // NEED TO CREATE ONE FUNCTION WHIC USES ROUTER TO RENDER THE DESIRED Tab COMPONENT 
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index: any) => {
        setshowEngagementsComponent(false);
        setshowReportsComponent(false);
        setActiveTab(index);
        if (index == null) {
            console.log("Null Value");
        }
        if (index == 0) {
            toggleEngagementsComponent();
        }
        if (index == 1) {
            toggleshowReportsComponent();
        }
        if (index == 2) {
            toggleshowapiConsumerComponent();
        }
    };
    const selectedTab = (item: any) => {
        if (item == 'engagement') {
            // Router.push('/engagement')
        }
    }
    const tabs = [
        { label: 'Engagements', component: <Engagements tableArray={undefined} /> },
        { label: 'Reports', component: <Reports /> },
        { label: 'Settings', component: <Reports /> },
        // Add more tab data as needed
    ];
    return (
        <>

            <div className="flex  list-none text-black gap-2  justify-between align-middle items-center">
                <ul className="flex gap-2">
                    {tabs?.map((tab, index) => {
                        return <li className="border-2 cursor-pointer hover:bg-sky-700 border-black p-2 text-black font-semibold" key={index} onClick={() => handleTabClick(index)}>{tab.label}</li>
                    })}
                </ul>
                <div className="margin-left: 10px;">
                    <h6>Notifications</h6>
                    <span className="material-symbols-outlined flex justify-center align-middle items-center ">
                        Notifications
                    </span>
                </div>

            </div>
            {showReportsComponent && <Reports />}
            {/* {showapiConsumerComponent && <ApiConsumer/>} */}
            {showEngagementsComponent && <Engagements tableArray={AllEngagementdata} />}
            {/* Conditionally render ChildComponent */}

        </>

    );
}

