"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _joi = require('joi'); var _joi2 = _interopRequireDefault(_joi);

/**
 * Schema for validating order data.
 * 
 * @typedef {Object} OrderSchema
 * @property {string} address - The address for the order. This field is required.
 * @property {string[]} items - An array of item identifiers. This field is required.
 */
const OrderSchema = _joi2.default.object({
  address: _joi2.default.string().required(),
  items: _joi2.default.array().items(_joi2.default.string()).required(),
});

exports. default = OrderSchema;
