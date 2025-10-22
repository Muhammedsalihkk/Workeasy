import {Document} from 'mongoose'
export interface stock extends Document {
  _id:string;         
  companyId:string   
  productName: string;         
  quantity: number;                      
  batchNumber?: string;        
  expiryDate?: Date;           
  createdAt?: Date;            
  updatedAt?: Date;             
  isDeleted?: boolean;  
  createdBy?:string       
}
