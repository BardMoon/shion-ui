type Theme = "light" | "dark" | "auto";
declare class ThemeState {
    #private;
    current: Theme;
    constructor();
    toggle(): void;
    set(value: Theme): void;
}
export declare const themeState: ThemeState;
export {};
