import axios from "axios";

export const getcompanyBYid = async (companyId: string) => {
  try {
    const { data } = await axios.get(
      `http://company-service:3000/companies/${companyId}`
    );
    return data.message;
  } catch (error: any) {
    console.log(error.message);
  }
};
export const getuserByid = async (userId: string,token:string) => {
  try {
    if (userId) {
      const { data } = await axios.get(
        `http://auth-service:3001/auth/employee/get_profile/${userId}`,{
          headers:{
            Cookie:`token=${token}`
          }
        }
      );
      return data.data;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.data);
  }
};
