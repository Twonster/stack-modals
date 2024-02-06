import {CreateModalFnReturn, DefaultModalName, ModalScheme} from "./types";

const generateUniqueId = (): string => {
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 8);

    return `${timestamp}${random}`;
}

const createModal = <
    Name extends DefaultModalName,
    DProps extends ModalScheme<Name>[Name] = ModalScheme<Name>[Name]
>(
    name: Name,
    defaultProps?: DProps
): CreateModalFnReturn<Name, DProps> => {
    return { [name]: defaultProps } as CreateModalFnReturn<Name, DProps>;
};

export { generateUniqueId, createModal }