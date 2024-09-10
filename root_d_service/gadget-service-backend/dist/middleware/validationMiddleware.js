"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFields = void 0;
var validateFields = function (fields) {
    console.log("pass_1_v");
    return function (req, res, next) {
        console.log("pass_2_v");
        try {
            var errors = fields.filter(function (field) { return !req.body[field]; });
            console.log("pass_3_v");
            if (errors.length > 0) {
                return res.status(400).json({ message: "Missing fields: ".concat(errors.join(', ')) });
            }
        }
        catch (error) {
            console.log(error);
        }
        next();
    };
};
exports.validateFields = validateFields;
