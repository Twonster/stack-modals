import type {
  AddModalFn,
  ClearModalsFn,
  CreateUniqModalKeyFn,
  DeleteModalFn,
  GetModalNameFn,
  ModalNameType,
  ModalScheme,
  ModalServiceOptions,
  ModalStack,
  UpdateModalFn,
  HandleModalTrapFn,
  ModalTraps, OpenModalFnResult
} from './types';

import { generateUniqueId } from "./utils";

class StackModals<S extends ModalScheme = any> {
  public constructor(
    defaultValues: Partial<S> = {},
    options: ModalServiceOptions<S> = {}
  ) {
    this.initialModalsState = defaultValues;

    if (options.defaultTraps) {
      this.traps = defaultValues;
    }
  }
  public stack: ModalStack<S> = new Map();

  private readonly initialModalsState: Partial<S> = {};
  private readonly traps: ModalTraps<S> = {};

  public addModal: AddModalFn<S> = (name, props) => {
    const key = this.createUniqModalKey(name);
    const defaultProps = this.initialModalsState[name];

    this.stack.set(key, Object.assign({}, defaultProps, props));

    this.traps.add?.(this.stack);
    return key;
  };
  public deleteModal: DeleteModalFn<S> = (key) => {
    this.stack.delete(key);
    this.traps.delete?.(this.stack);
  };
  public updateModal: UpdateModalFn<S> = (key, props) => {
    const targetModal = this.stack.get(key);

    if (!targetModal || !props) {
      return;
    }

    for (const propsKey in props) {
      const target = props[propsKey];
      if (target === undefined) continue;

      targetModal[propsKey] = target;
    }

    this.traps.update?.(this.stack);
  };

  public clearModals: ClearModalsFn<S> = (name) => {
    this.stack.forEach((_, key) => {
      if (this.getModalName(key) === name) {
        this.stack.delete(key);
      }
    });

    this.traps.delete?.(this.stack);
  };

  public getModalName: GetModalNameFn<S> = (key) => {
    if (this.stack.has(key)) {
      return key.split(":").shift() as ModalNameType<S>;
    }

    throw new Error(`Invalid modal key: ${key}`);
  };

  public addTrap: HandleModalTrapFn<S> = (name, callback) => {
    this.traps[name] = callback;
  };

  private createUniqModalKey: CreateUniqModalKeyFn<S> = (name): OpenModalFnResult<S, typeof name> => {
    const key = `${name}:${generateUniqueId()}` as OpenModalFnResult<S, typeof name>;

    if (this.stack.has(key)) {
      return this.createUniqModalKey(name)
    }

    return key
  };
}

export { StackModals };
