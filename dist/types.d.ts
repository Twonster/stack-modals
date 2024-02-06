export declare type DefaultModalName = string | number;
export declare type ModalID = string;
export declare type ModalScheme<ModalName extends DefaultModalName = DefaultModalName, P = unknown> = Record<ModalName, P extends object ? P : {
    [prop: string]: unknown;
}>;
export declare type CreateModalFnReturn<T extends DefaultModalName = DefaultModalName, P = unknown> = {
    [Name in T]: P extends object ? P : ModalScheme<T>[Name];
};
export declare type ModalNameType<Scheme extends ModalScheme> = keyof Scheme extends DefaultModalName ? keyof Scheme : never;
export declare type ModalStack<Scheme extends ModalScheme> = Map<OpenModalFnResult<Scheme>, Scheme[ModalNameType<Scheme>]>;
export declare type AddModalFn<Scheme extends ModalScheme, InferName extends ModalNameType<Scheme> = ModalNameType<Scheme>> = <Name extends InferName, Props extends Scheme[Name]>(name: Name, props?: Props) => `${Name}:${ModalID}`;
export declare type UpdateModalFn<Scheme extends ModalScheme> = <Name extends ModalNameType<Scheme> = ModalNameType<Scheme>>(key: `${Name}:${ModalID}`, props: Partial<Scheme[Name]>) => void;
export declare type DeleteModalFn<Scheme extends ModalScheme> = (key: OpenModalFnResult<Scheme>) => void;
export declare type ClearModalsFn<Scheme extends ModalScheme> = (name: ModalNameType<Scheme>) => void;
export declare type GetModalNameFn<Scheme extends ModalScheme> = (key: OpenModalFnResult<Scheme>) => ModalNameType<Scheme>;
export declare type OpenModalFnResult<Scheme extends ModalScheme, InferName extends ModalNameType<Scheme> = ModalNameType<Scheme>> = ReturnType<AddModalFn<Scheme, InferName>>;
export declare type CreateUniqModalKeyFn<Scheme extends ModalScheme> = <Name extends ModalNameType<Scheme>>(name: Name) => OpenModalFnResult<Scheme, Name>;
export declare type ModalTraps<Scheme extends ModalScheme> = Partial<Record<'add' | 'update' | 'delete', (stack: ModalStack<Scheme>) => void>>;
export declare type HandleModalTrapFn<Scheme extends ModalScheme> = (name: keyof NonNullable<ModalTraps<Scheme>>, callback: (stack: ModalStack<Scheme>) => void) => void;
export declare type ModalServiceOptions<Scheme extends ModalScheme> = {
    defaultTraps?: ModalTraps<Scheme>;
};
