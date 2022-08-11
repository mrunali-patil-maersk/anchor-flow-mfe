// test-utils.tsx
import * as React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

interface WrapperProps {
  children?: React.ReactNode;
}

/**
 * Customize render
 * @param ui
 * @param renderOptions
 * @returns
 */

function render(ui: any, renderOptions?: RenderOptions) {
  function Wrapper({ children }: WrapperProps) {
    return <>{children}</>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
