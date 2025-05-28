"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose2.default
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB: Connectted'))
  .catch((err) => console.log(err.message));
