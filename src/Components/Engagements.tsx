import { useState } from "react";
import { CreateEngagement } from "./CreateEngagement";


interface IEngagement {
    tableArray: any
}

export const Engagements = (props: IEngagement) => {
    const [showCreateEngagementsComponent, setshowCreateEngagementsComponent] = useState(false);
    const toggleCreateEngagementsComponent = () => {
        window.location.href = '/createEngagement'
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
                    <tr>
                        {props?.tableArray?.map((item: any) => {
                            return (
                                <td className="border-2">{item}</td>
                            )
                        })}
                    </tr>

                    <tr>
                        {props?.tableArray?.map((item: any) => {
                            return (

                                <td className="border-2">{item}</td>

                            )
                        })}
                    </tr>
                </tbody>
            </table>

            {showCreateEngagementsComponent && <CreateEngagement />} {/* Conditionally render ChildComponent */}
        </>
    )
}



