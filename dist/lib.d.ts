import type { AddModalFn, ClearModalsFn, DeleteModalFn, GetModalNameFn, ModalScheme, ModalServiceOptions, ModalStack, UpdateModalFn, HandleModalTrapFn } from './types';
declare class StackModals<S extends ModalScheme = any> {
    constructor(defaultValues?: Partial<S>, options?: ModalServiceOptions<S>);
    stack: ModalStack<S>;
    private readonly initialModalsState;
    private readonly traps;
    addModal: AddModalFn<S>;
    deleteModal: DeleteModalFn<S>;
    updateModal: UpdateModalFn<S>;
    clearModals: ClearModalsFn<S>;
    getModalName: GetModalNameFn<S>;
    addTrap: HandleModalTrapFn<S>;
    private createUniqModalKey;
}
export { StackModals };
