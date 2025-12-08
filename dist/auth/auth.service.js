"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const User_schemas_1 = require("./schema/User.schemas");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    UserModel;
    jwtService;
    constructor(UserModel, jwtService) {
        this.UserModel = UserModel;
        this.jwtService = jwtService;
    }
    user = [];
    async register(user) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = new this.UserModel(user);
        const myUser = await newUser.save();
        const token = this.jwtService.sign({ Username: myUser.Username, isLogged: myUser.isLogged, id: myUser?.id });
        return { token, Username: myUser.Username, isLogged: myUser.isLogged };
    }
    async logout(user) {
        return await this.UserModel.findOneAndUpdate({ Username: user.Username }, { $set: { isLogged: false } }, { new: true });
    }
    async login(user) {
        const userFound = await this.UserModel.findOne({ Username: user.Username }).select('+password');
        if (!userFound)
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        const passwordValid = await bcrypt.compare(user.password, userFound.password);
        if (!passwordValid)
            throw new common_1.UnauthorizedException('Mot de passe incorrect');
        const myUser = await this.UserModel.findOneAndUpdate({ Username: user.Username }, { $set: { isLogged: true } }, { new: true });
        const token = this.jwtService.sign({ Username: myUser?.Username, isLogged: myUser?.isLogged, id: myUser?.id });
        return { token, Username: myUser?.Username, isLogged: myUser?.isLogged };
    }
    async getuserName(id) {
        return await this.UserModel.findById(id.id).select("Username");
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(User_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map