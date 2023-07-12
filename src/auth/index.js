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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   const secret = process.env.ACCESS_TOKEN_SECRET;
        const passwordDummy = '$2b$10$0tIo.VWSEi16AF4DuHIkS.CqqEZ4IYMurB8FhyDfzSWQ7gVX62Vz6';
        const { username, password } = req.body;
        // FIND USERNAME IN DATABASE
        if (username !== 'admin')
            throw new Error('Username or password incorrect');
        const match = yield bcrypt_1.default.compare(password, passwordDummy);
        if (!match)
            throw new Error('Username or password incorrect');
        const accessToken = jsonwebtoken_1.default.sign({ username }, 'jsfgfjguwrg8783wgbjs849h2fu3cnsvh8wyr8fhwfvi2g225', {
            expiresIn: '36000s',
        });
        res.status(200).json({
            message: 'Login successful',
            accessToken: accessToken,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `${error}`,
        });
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log({ username });
        const salt = yield bcrypt_1.default.genSalt();
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        console.log({ hashPassword });
        // INSERT username & hashPassword to DB
        res.status(200).json({
            msg: "Registes Success",
            username,
            password
        });
    }
    catch (error) {
        res.status(404).json({ msg: `${error}` });
    }
});
exports.Register = Register;
