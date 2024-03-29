import { generateUniqueId } from "./utils";
class StackModals {
    constructor(defaultValues = {}, options = {}) {
        this.stack = new Map();
        this.initialModalsState = {};
        this.traps = {};
        this.addModal = (name, props) => {
            var _a, _b;
            const key = this.createUniqModalKey(name);
            const defaultProps = this.initialModalsState[name];
            this.stack.set(key, Object.assign({}, defaultProps, props));
            (_b = (_a = this.traps).add) === null || _b === void 0 ? void 0 : _b.call(_a, this.stack);
            return key;
        };
        this.deleteModal = (key) => {
            var _a, _b;
            this.stack.delete(key);
            (_b = (_a = this.traps).delete) === null || _b === void 0 ? void 0 : _b.call(_a, this.stack);
        };
        this.updateModal = (key, props) => {
            var _a, _b;
            const targetModal = this.stack.get(key);
            if (!targetModal || !props) {
                return;
            }
            for (const propsKey in props) {
                const target = props[propsKey];
                if (target === undefined)
                    continue;
                targetModal[propsKey] = target;
            }
            (_b = (_a = this.traps).update) === null || _b === void 0 ? void 0 : _b.call(_a, this.stack);
        };
        this.clearModals = (name) => {
            var _a, _b;
            this.stack.forEach((_, key) => {
                if (this.getModalName(key) === name) {
                    this.stack.delete(key);
                }
            });
            (_b = (_a = this.traps).delete) === null || _b === void 0 ? void 0 : _b.call(_a, this.stack);
        };
        this.getModalName = (key) => {
            if (this.stack.has(key)) {
                return key.split(":").shift();
            }
            throw new Error(`Invalid modal key: ${key}`);
        };
        this.addTrap = (name, callback) => {
            this.traps[name] = callback;
        };
        this.createUniqModalKey = (name) => {
            const key = `${name}:${generateUniqueId()}`;
            if (this.stack.has(key)) {
                return this.createUniqModalKey(name);
            }
            return key;
        };
        this.initialModalsState = defaultValues;
        if (options.defaultTraps) {
            this.traps = defaultValues;
        }
    }
}
export { StackModals };
