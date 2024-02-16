const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}${random}`;
};
const createModal = (name, defaultProps) => {
    return { [name]: defaultProps };
};
export { generateUniqueId, createModal };
