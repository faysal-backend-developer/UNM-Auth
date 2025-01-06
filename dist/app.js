'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const body_parser_1 = __importDefault(require('body-parser'));
const routers_1 = __importDefault(require('./app/modules/routers'));
const globalErrorHandler_1 = __importDefault(
  require('./app/globalErrorHandler/globalErrorHandler'),
);
const http_status_codes_1 = require('http-status-codes');
// import { generatedAdminId } from './app/modules/Users/Users.utils';
// import { generatedStudentId } from './app/modules/Users/Users.utils';
// Create app
const app = (0, express_1.default)();
// Express Middleware config
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// third party middleware Configurations
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Root Router configuration
app.use('/api/v1/', routers_1.default);
// Home Page API:
app.get('/api/v1/home', (req, res) => {
  res.send('Welcome to University Management Server...');
});
// Test Router for Testing Server
app.get('/api/v1/test', (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Testing Server Test Request');
    // const academicSemester = {
    //   year: "2025",
    //   code : "01",
    //   title: "Autumn",
    //   startMonth: "ja",
    //   endMonth: "sep"
    // }
    // console.log(await generatedStudentId(academicSemester))
    // console.log(await generatedAdminId())
    next();
  }),
);
// Global Error Handler
app.use(globalErrorHandler_1.default);
// !! Some Error Find , I can't solve this problem
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next) => {
  res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'This Api Endpoint is not available',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'This Api Endpoint is not available',
      },
    ],
  });
});
// Export App
exports.default = app;
