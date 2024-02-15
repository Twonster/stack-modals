"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModal = exports.generateUniqueId = void 0;
const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}${random}`;
};
exports.generateUniqueId = generateUniqueId;
const createModal = (name, defaultProps) => {
    return { [name]: defaultProps };
};
exports.createModal = createModal;
