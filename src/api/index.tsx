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
    const { data } = await axios.post(baseUrl + "Engagement/CreateEngagementBySP", formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data;
}

export const getAllEngagment = async () => {
    const { data } = await axios.get(baseUrl + "Engagement/ViewEngagements");
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
    return data;
}

export const getUsers = async () => {
    const { data } = await axios.get(baseUrl + "User/GetUsers");
    return data;
}

export const uploadFiles = async (clientId: number, file: any) => {
    const { data } = await axios.post(baseUrl + `File/UploadSingleDocument?clientId=${clientId}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}

export const uploadMultipleFiles = async (clientId: number, file: any) => {
    const { data } = await axios.post(baseUrl + `File/UploadMultipleDocuments?clientId=${clientId}`, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return data;
}

export const getAuditReportById = async (id: number) => {
    await axios.get(baseUrl + `ReportDownload?auditId=${id}`, { responseType: 'blob' }).then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `AuditReport`);
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
    });
}

export const sendEmailNotifications = async (formBody: any) => {
    const { data } = await axios.post(baseUrl + `Email/Notification`, formBody, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data;
}