import {StackModals} from './lib'
import {createModal} from "./utils";

const name = 'MODAL_NAME_1' as const
type Props = {
    title: string;
    subTitle?: string
}

describe(StackModals, () => {
    const ServiceInstance = new StackModals({
        ...createModal<typeof name, Props>(name)
    })

    beforeEach(() => {
        ServiceInstance.stack.clear()
    })

    test('instance is initialized', () => {
        expect(ServiceInstance).toBeInstanceOf(StackModals);
    })

    test('Modal added', () => {
        expect(ServiceInstance.stack.size).toBe(0);

        const modalKey = ServiceInstance.addModal("MODAL_NAME_1", { title: 'Title', subTitle: 'subtitle' })

        expect(ServiceInstance.stack.has(modalKey)).toBeDefined()
    })


    test('Modal key is uniq', () => {
        const modalKey1 = ServiceInstance.addModal("MODAL_NAME_1", { title: 'Title', subTitle: 'subtitle' })
        const modalKey2 = ServiceInstance.addModal("MODAL_NAME_1", { title: 'Title', subTitle: 'subtitle' })

        expect(modalKey1).not.toBe(modalKey2)
    })
})
