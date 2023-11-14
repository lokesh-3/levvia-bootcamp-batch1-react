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