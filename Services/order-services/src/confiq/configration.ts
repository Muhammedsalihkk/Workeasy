import dotenv from "dotenv";
dotenv.config();
const confiqdata = {
  db_address: process.env.DB_API,
  serverPort: process.env.Server_Port ,
  JWT_Secret:process.env.JWT_SECRET as string
};
export default confiqdata
