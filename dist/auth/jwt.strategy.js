"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const mongoose_1 = require("mongoose");
const User_schemas_1 = require("./schema/User.schemas");
const mongoose_2 = require("@nestjs/mongoose");
let jwtStrategy = class jwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    UserModel;
    constructor(UserModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SoSecret',
        });
        this.UserModel = UserModel;
    }
    async validate(payload) {
        const user = await this.UserModel.findById(payload.id);
        if (user?.isLogged === false)
            throw new common_1.UnauthorizedException('veuillez vous connecter pour y accéder');
        return user;
    }
};
exports.jwtStrategy = jwtStrategy;
exports.jwtStrategy = jwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(User_schemas_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], jwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map