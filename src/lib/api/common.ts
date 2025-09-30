import api from "../axios";

const API_PATH = "/api/Common";

export const getDropdownList = async (option1: string) => {
  const res = await api.get(`${API_PATH}/getDropdownList?option1=${option1}`);
  return res.data;
};

export const getDropdownList2 = async (o1: string, o2: string) => {
  const res = await api.get(
    `${API_PATH}/getDropdownList2?option1=${o1}&option2=${o2}`,
  );
  return res.data;
};

export const getDropdownList3 = async (o1: string, o2: string, o3: string) => {
  const res = await api.get(
    `${API_PATH}/getDropdownList3?option1=${o1}&option2=${o2}&option3=${o3}`,
  );
  return res.data;
};

export const getDropdownList4 = async (
  o1: string,
  o2: string,
  o3: string,
  o4: string,
) => {
  const res = await api.get(
    `${API_PATH}/getDropdownList4?option1=${o1}&option2=${o2}&option3=${o3}&option4=${o4}`,
  );
  return res.data;
};

export const getDropdownList5 = async (
  o1: string,
  o2: string,
  o3: string,
  o4: string,
  o5: string,
) => {
  const res = await api.get(
    `${API_PATH}/getDropdownList5?option1=${o1}&option2=${o2}&option3=${o3}&option4=${o4}&option5=${o5}`,
  );
  return res.data;
};

export const getPageContent = async (pageName: string) => {
  const res = await api.get(
    `${API_PATH}/getPageContentByPageName?pageName=${pageName}`,
  );
  return res.data;
};
