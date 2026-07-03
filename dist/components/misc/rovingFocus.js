export function rovingFocusItem(register) {
    return (node) => {
        const unregister = register(node);
        return unregister;
    };
}
