import {describe,it,expect,vi,afterEach} from "vitest"
import { register_service } from "../src/services/register_service"
import { company_model } from "../src/models/company_schema"
import { gettallcompany_service } from "../src/services/getAllcompany_service"
import { Onecompany_service } from "../src/services/getOnecompany_service"

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
    }),
    it("it should be",async()=>{
      const result= await Onecompany_service("123")
      console.log(result)
      
    })
})

