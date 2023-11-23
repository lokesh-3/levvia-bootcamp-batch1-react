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
                        {/* <th className="border-2">Engagement ID</th> */}
                        <th className="border-2">Client Name</th>
                        <th className="border-2">Audit Type</th>
                        <th className="border-2">Status</th>
                        <th className="border-2">Start Date</th>
                        <th className="border-2">End Date</th>
                        <th className="border-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props?.tableArray?.map((item: any, index: any) => (
                        <tr key={index}>
                            <td className="border-2 cursor-pointer underline decoration-sky-500 text-center" onClick={() => navigate(`/viewEngagement/${item.clientId}`)}>{item.clientId}</td>
                            <td className="border-2 text-center">{item.clientName}</td>
                            <td className="border-2 text-center">Loading..</td>
                            <td className="border-2 text-center">Loading..</td>
                            <td className="border-2 text-center">{item.engagementStartDate}</td>
                            <td className="border-2 text-center">{item.engagementEndDate}</td>
                            <td className="border-2 text-center">
                                <svg onClick={() => navigate(`/viewEngagement/${item.clientId}`)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mx-auto">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </td>
                            {/* Add more cells based on your data structure */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateEngagementsComponent && <CreateEngagement />} {/* Conditionally render ChildComponent */}
        </>
    )
}



