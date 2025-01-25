import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { EatNSplitProvider } from "../src/context/EatNSplitContext";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: EatNSplitProvider, ...options });

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

// override render method
export { customRender as render };
