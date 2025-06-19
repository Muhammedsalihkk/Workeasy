"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comapny_controler_1 = require("../controllers/comapny-controler");
const getAllcompany_controller_1 = require("../controllers/getAllcompany-controller");
const Edit_delete_1 = require("../controllers/Edit&delete");
const router = express_1.default.Router();
router.post('/companies', comapny_controler_1.register_company);
router.get('/companies', getAllcompany_controller_1.getallcompany);
router.get('/companies/:id', getAllcompany_controller_1.get_Onecompany);
router.put('/companies/:id', Edit_delete_1.editcompany);
router.delete('/companies/:id', Edit_delete_1.deletcompany);
exports.default = router;
