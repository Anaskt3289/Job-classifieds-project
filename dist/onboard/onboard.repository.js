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
exports.OnboardRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const onboard_schema_1 = require("./schemas/onboard.schema");
let OnboardRepository = class OnboardRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(userFilterQuery) {
        return await this.userModel.findOne(userFilterQuery);
    }
    async find(userFilterQuery) {
        return await this.userModel.find(userFilterQuery);
    }
    async create(user) {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }
    async findOneAndUpdate(userFilterQuery, user) {
        return await this.userModel.findOneAndUpdate(userFilterQuery, user);
    }
    async updateOne(userFilterQuery, user) {
        return await this.userModel.updateOne(userFilterQuery, user);
    }
};
OnboardRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(onboard_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OnboardRepository);
exports.OnboardRepository = OnboardRepository;
//# sourceMappingURL=onboard.repository.js.map