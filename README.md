
# Stack Modals

### Overview:
Stack Modals is a lightweight and versatile JavaScript library for managing modals in web applications. It provides an easy-to-use interface for creating and managing a stack of modal dialogs, allowing for smooth and intuitive user experiences.

### Features:

- __Stack Management:__ Easily manage a stack of modals, enabling sequential display and dismissal.
- __Customization:__ Customize the appearance and behavior of modals to suit your application's design and requirements.
- __Event Handling:__ Handle modal events such as open, close, and overlay click with ease.
- __Lightweight:__ Small footprint and minimal dependencies make it ideal for use in various web projects.
- __Compatibility:__ Compatible with modern web browsers and frameworks, including React, Angular, and Vue.js.
- __Dynamic Import Support:__ Enables dynamic import functionality, facilitating reduced initial bundle size and efficient loading of resources.
---

### Installation:

#### You can install Stack Modals via npm:
`npm install stack-modals`

#### Or include it directly in your HTML:
``<script src="https://unpkg.com/stack-modals/dist/stack-modals.min.js"></script>``

---

### Usage:
1. Include the Stack Modals library in your project.
2. Initialize the modal stack.
3. Create and manage modals as needed.

```typescript
import { StackModals, createModal } from 'stack-modals'

enum ModalName {
    HELLO_MODAL = 'HELLO_MODAL',
    BYE_MODAL = 'BYE_MODAL'
}

type HelloModalProps = {
    title: string;
    subtitle?: string;
}

type ByeModalProps = {
    title: string;
    exitText?: string;
}

/* Initial state with strongly typed values */
const initialState = {
    /* With createModal() util: */
    ...createModal<ModalName.HELLO_MODAL, HelloModalProps>
        (ModalName.HELLO_MODAL, { subtitle: 'Default Subtitle', title: 'Default Title' }),
    /* Without util */
    [ModalName.BYE_MODAL]: {
        title: 'Bye!',
        exitText: ':('
    } as ByeModalProps
}

const { stack, addModal, updateModal, deleteModal, clearModals } = new StackModals(initialState)
/*
* Function addModal returns a key that (modalKey) can be used to:
*  - delete modal from stack, 
*  - search the inside the stack (for getting passed paremetrs)
*  - update the state of the current modal
* */

const modalKey = addModal('MODAL', { title: 'Title' })
/* Update case */
updateModal(modalKey, { title: '', subtitle: 'After update' });
/* Delete case */
deleteModal(modalKey)
/* Search in stack case */
stack.get(modalKey)

    
/* 
* Using the function clearModals(), you can delete all modal windows based on their name. 
* For example: clearModals(ModalName.HELLO_MODAL) 
* shoud remove all windows with name ModalName.HELLO_MODAL from the stack
* */
clearModals(ModalName.HELLO_MODAL)
```

### Usage with ReactJS: 
```tsx
import { StackModals, createModal } from 'stack-modals'
import {useEffect, useState, FC} from "react";
import type {ModalNameType, ModalScheme, OpenModalFnResult} from "stack-modals/types";


/* All modal names enum */
enum ModalName {
    CONFIRM = 'CONFIRM'
}

/* Specific modal props */
type ConfirmModalProps = {
    title: string;
    subtitle?: string;
}

/* All modal scheme based on ModalScheme*/
type GlobalModalState = {
    [ModalName.CONFIRM]: ConfirmModalProps
}

/* Default modal props (for passing inside the stack render */
export type BaseModalProps<S extends ModalScheme = GlobalModalState> = {
    modalKey: OpenModalFnResult<S>;
    modalName: ModalNameType<S>;
    onClose: (key: OpenModalFnResult<S>) => void;
};

const { stack, addModal, updateModal, addTrap, getModalName, deleteModal, clearModals } = new StackModals({
    ...createModal<'CONFIRM', ConfirmModalProps>('CONFIRM', { subtitle: 'Default Subtitle', title: 'Default Title' }),
})

// file modals/ConfirmModal.tsx
export const ConfirmModal: FC<ConfirmModalProps & BaseModalProps> = ({  modalKey, modalName, onClose, handleComplete, handleCancel, subtitle, title}) => {
    return (
        <YourCustomModalComponent modalName={modalName} modalKey={modalKey} onClose={onClose}>
            <h3>Modal key: {modalKey}</h3>
            <p>{title}</p>
            <caption>{subtitle}</caption>
            <button onClick={() => onClose(modalKey)}>close</button>
        </YourCustomModalComponent>
    )
}

// file modules/ModalModule.tsx (can be inserted in the top level of our App)
export const ModalModule: FC = () => {
    const [openedModals, setOpenedModals] = useState(stack)
    useEffect(() => {
        const handler = (newStack: typeof stack) => {
            setOpenedModals(() => new Map(newStack))
        }

        addTrap("add", handler)
        addTrap("update", handler)
        addTrap("delete", handler)
    }, []);

    return (
        <div>
            {Array.from(openedModals.entries()).map(([key, props]) => {
                const name = getModalName(key)

                const createDefaultProps = <T extends keyof GlobalModalState>(modalName: T) => ({
                    key,
                    modalName,
                    modalKey: key,
                    onClose: deleteModal,
                    ...(props as GlobalModalState[T])
                });

                switch (name) {
                    case ModalName.CONFIRM:
                        return <ConfirmModal {...createDefaultProps(ModalName.CONFIRM)} />
                    default:
                        return null
                }
            })}
        </div>
    )
}

// file hooks/useModal.tsx
export const useModal = () => {
    return {
        openModal: addModal,
        closeModal: deleteModal,
        updateModal,
    }
}
```
---

### Documentation:
For detailed documentation and examples, visit the Stack Modals GitHub repository.

### Contributing:
Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the Stack Modals GitHub repository.

### License:
Stack Modals is licensed under the MIT License. See the LICENSE file for details.

### Credits:
Stack Modals is developed and maintained by Your Name / Organization. Special thanks to all contributors who have helped make this project possible.

### Support:
If you need assistance or have any questions, you can reach out to the maintainers via the GitHub repository.

--- 
##### Enjoy using Stack Modals in your projects!