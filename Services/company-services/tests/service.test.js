"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const register_service_1 = require("../src/services/register_service");
const company_schema_1 = require("../src/models/company_schema");
const getOnecompany_service_1 = require("../src/services/getOnecompany_service");
vitest_1.vi.mock('../src/models/company_schema', () => ({
    company_model: {
        create: vitest_1.vi.fn()
    }
}));
(0, vitest_1.afterEach)(() => {
    vitest_1.vi.restoreAllMocks();
});
const dummyCompanyData = {
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
(0, vitest_1.describe)("match function", () => {
    (0, vitest_1.it)("it should be", () => __awaiter(void 0, void 0, void 0, function* () {
        company_schema_1.company_model.create.mockResolvedValue({ message: "success" });
        const result = yield (0, register_service_1.register_service)(dummyCompanyData);
        (0, vitest_1.expect)(result).toBe("success");
    })),
        (0, vitest_1.it)("it should be", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, getOnecompany_service_1.Onecompany_service)("123");
            console.log(result);
        }));
});
