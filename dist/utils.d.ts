import { CreateModalFnReturn, DefaultModalName, ModalScheme } from "./types";
declare const generateUniqueId: () => string;
declare const createModal: <Name extends DefaultModalName, DProps extends ModalScheme<Name>[Name] = ModalScheme<Name>[Name]>(name: Name, defaultProps?: DProps | undefined) => CreateModalFnReturn<Name, DProps>;
export { generateUniqueId, createModal };
