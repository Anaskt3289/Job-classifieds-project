"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardModule = void 0;
const common_1 = require("@nestjs/common");
const onboard_controller_1 = require("./onboard.controller");
const onboard_service_1 = require("./onboard.service");
const onboard_repository_1 = require("./onboard.repository");
const onboard_schema_1 = require("./schemas/onboard.schema");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const mail_service_1 = require("../common/mail.service");
let OnboardModule = class OnboardModule {
};
OnboardModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: onboard_schema_1.User.name, schema: onboard_schema_1.UserSchema }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '7d' },
                }),
            }),
        ],
        controllers: [onboard_controller_1.OnboardController, user_controller_1.UserController],
        providers: [onboard_service_1.OnboardService, onboard_repository_1.OnboardRepository, user_service_1.UserService, mail_service_1.MailService],
    })
], OnboardModule);
exports.OnboardModule = OnboardModule;
//# sourceMappingURL=onboard.module.js.map