type Props = {
    onminimize?: () => void;
    onmaximize?: () => void;
    onclose?: () => void;
};
declare const WindowControls: import("svelte").Component<Props, {}, "">;
type WindowControls = ReturnType<typeof WindowControls>;
export default WindowControls;
