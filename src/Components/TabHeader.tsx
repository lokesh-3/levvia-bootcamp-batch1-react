import { useEffect, useState } from "react";
import { Engagements } from "./Engagements";
import { CreateEngagement } from "./CreateEngagement";
import { Reports } from "./Reports";
import { getAllEngagment } from "../api";

interface ITabHeader {
    tabArray: any
}
export const TabHeader = (props: ITabHeader) => {
    const [showEngagementsComponent, setshowEngagementsComponent] = useState(false);
    const [showReportsComponent, setshowReportsComponent] = useState(false);
    const [showapiConsumerComponent, setshowapiConsumerComponent] = useState(false);
    const [AllEngagementdata, setAllEngagementdata] = useState<any>([]);
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { label: 'Engagements', component: <Engagements tableArray={undefined} /> },
        { label: 'Reports', component: <Reports /> },
        { label: 'Settings', component: <Reports /> },
        // Add more tab data as needed
    ];

    useEffect(() => {
        getAllEngagment().then((response) => {
            if (response) {
                setAllEngagementdata(response)
            }
        }).catch((err) => {
            console.error('Fetch Error:', err);
        })
    }, [])

    const toggleEngagementsComponent = () => {
        setshowEngagementsComponent(!showEngagementsComponent);
    };
    const toggleshowReportsComponent = () => {
        setshowReportsComponent(!showReportsComponent);
    };
    const toggleshowapiConsumerComponent = () => {
        setshowapiConsumerComponent(!showapiConsumerComponent);
    };

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

