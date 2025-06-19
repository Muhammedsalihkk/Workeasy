import {describe,it,expect,vi,afterEach} from "vitest"
import { register_service } from "../services/register_service"
import { company_model } from "../models/company_schema" 

vi.mock('../src/models/company_schema',()=>({
    company_model:{
            create:vi.fn()
    }
}))

afterEach(()=>{
    vi.restoreAllMocks()
})
const dummyCompanyData: any = {
  legalname: "TCS",
  tradingname: "TCS Ltd",
  registration_number: "123456",
  company_type: "Private",
  primary_industry: "IT",
  annual_revanue: 1000000,
  address: {
    place: "Chennai",
    pin: "600001",
    distict: "Chennai",
    state: "Tamil Nadu",
    country: "India",
  },
};

describe("match function",()=>{
    it("it should be",async()=>{
        (company_model.create as any).mockResolvedValue({message:"success"})
        const result:string= await register_service(dummyCompanyData)
        expect(result).toBe("success")
    })
})

