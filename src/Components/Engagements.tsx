import { useState } from "react";
import { CreateEngagement } from "./CreateEngagement";
import { useNavigate } from "react-router-dom";

interface IEngagement {
    tableArray: any
}

export const Engagements = (props: IEngagement) => {
    const [showCreateEngagementsComponent, setshowCreateEngagementsComponent] = useState(false);
    const navigate = useNavigate();
    const toggleCreateEngagementsComponent = () => {
        navigate("/createEngagement")
    };
    return (
        <>
            <div className="mb-8">
                <button className="border-2 text-black font-bold p-1 border-black drop-shadow-2xl" onClick={toggleCreateEngagementsComponent}>Create Engagements</button>
            </div>
            <span>Engagements:</span>
            <table>
                <thead>
                    <tr>
                        <th className="border-2">Engagement ID</th>
                        <th className="border-2">Client Name</th>
                        <th className="border-2">Audit Type</th>
                        <th className="border-2">Status</th>
                        <th className="border-2">Start Date</th>
                        <th className="border-2">End Date</th>
                    </tr>
                </thead>
                <tbody>
                {props?.tableArray?.map((item:any,index:any) => (
            <tr key={index}>
            <td className="border-2">{item.clientId}</td>
            <td className="border-2">{item.clientName}</td>
            <td className="border-2">Loading..</td>
            <td className="border-2">Loading..</td>
            <td className="border-2">{item.engagementStartDate}</td>
            <td className="border-2">{item.engagementEndDate}</td>
            {/* Add more cells based on your data structure */}
          </tr>
        ))}
                </tbody>
            </table>

            {showCreateEngagementsComponent && <CreateEngagement />} {/* Conditionally render ChildComponent */}
        </>
    )
}



