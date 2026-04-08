import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type FontSize = "normal" | "large" | "xlarge";
export type ColorMode = "normal" | "highContrast";

interface AccessibilityState {
  fontSize: FontSize;
  setFontSize: (s: FontSize) => void;
  colorMode: ColorMode;
  setColorMode: (m: ColorMode) => void;
  elderlyMode: boolean;
  setElderlyMode: (v: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityState>({
  fontSize: "normal",
  setFontSize: () => {},
  colorMode: "normal",
  setColorMode: () => {},
  elderlyMode: false,
  setElderlyMode: () => {},
});

export function useAccessibility() {
  return useContext(AccessibilityContext);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>(() =>
    (localStorage.getItem("a11y-fontSize") as FontSize) || "normal"
  );
  const [colorMode, setColorMode] = useState<ColorMode>(() =>
    (localStorage.getItem("a11y-colorMode") as ColorMode) || "normal"
  );
  const [elderlyMode, setElderlyMode] = useState<boolean>(() =>
    localStorage.getItem("a11y-elderlyMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("a11y-fontSize", fontSize);
    const html = document.documentElement;
    html.classList.remove("text-normal", "text-large", "text-xlarge");
    html.classList.add(`text-${fontSize}`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("a11y-colorMode", colorMode);
    const html = document.documentElement;
    html.classList.toggle("high-contrast", colorMode === "highContrast");
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem("a11y-elderlyMode", String(elderlyMode));
    const html = document.documentElement;
    html.classList.toggle("elderly-mode", elderlyMode);
    if (elderlyMode) {
      setFontSize("large");
      setColorMode("highContrast");
    }
  }, [elderlyMode]);

  return (
    <AccessibilityContext.Provider
      value={{ fontSize, setFontSize, colorMode, setColorMode, elderlyMode, setElderlyMode }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
