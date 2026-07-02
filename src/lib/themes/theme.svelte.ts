type Theme = "light" | "dark" | "auto";

class ThemeState {
  current = $state<Theme>("light");

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "auto") {
        this.current = saved;
      }

      this.#apply();

      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
          if (this.current === "auto") this.#apply();
        });
    }
  }

  toggle() {
    this.current = this.#resolvedTheme() === "light" ? "dark" : "light";
    this.#apply();
  }

  set(value: Theme) {
    this.current = value;
    this.#apply();
  }

  #resolvedTheme(): "light" | "dark" {
    if (this.current !== "auto") return this.current;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  #apply() {
    document.documentElement.dataset.theme = this.#resolvedTheme();
    localStorage.setItem("theme", this.current);
  }
}

export const themeState = new ThemeState();
