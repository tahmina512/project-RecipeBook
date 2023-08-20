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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_services_1 = require("./user.services");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("../auth/local-strategy");
let UserController = exports.UserController = class UserController {
    constructor(userService, authService, localStrategy) {
        this.userService = userService;
        this.authService = authService;
        this.localStrategy = localStrategy;
    }
    async addUser(email, password) {
        const userInfo = await this.userService.createUser(email, password);
        return userInfo;
    }
    async login(email, password) {
        console.log('body', email, password);
        try {
            return await this.localStrategy.validate(email, password);
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'Wrong_Password_or_Username' }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_services_1.UserService,
        auth_service_1.AuthService,
        local_strategy_1.LocalStrategy])
], UserController);
//# sourceMappingURL=user.controller.js.map