import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllCountry = async () => {
    const { data } = await axios.get(baseUrl + "Comman/GetAllCountry");
    return data;
};

export const getAllAudityTypes = async () => {
    const { data } = await axios.get(baseUrl + "AuditMaster/GetAllAudits");
    return data;
};

export const createEngagement = async (formData: any) => {
    const { data } = await axios.post(baseUrl + "Engagement/AddEngagement", formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data;
}

export const getAllEngagment = async () => {
    const { data } = await axios.get(baseUrl + "Engagement/GetAll");
    return data;
}

export const getAllAuditOutcome = async () => {
    const { data } = await axios.get(baseUrl + "AuditOutcomeMaster/GetAllAuditOutcomes");
    return data;
}

export const getEngagmentById = async (id: number) => {
    const { data } = await axios.get(baseUrl + `Engagement/GetEngagementById?id=${id}`);
    return data;
}

export const updateEngagement = async (formData: any) => {
    const { data } = await axios.put(baseUrl + "Engagement/UpdateEngagement", formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const getUsers = async () => {
    const { data } = await axios.get(baseUrl + "User/GetUsers");
    return data;
}