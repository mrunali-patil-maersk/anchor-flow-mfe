/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";

describe("Home", () => {
  it("renders a anchor text", () => {
    render(<Home />);

    const element = screen.getByTestId("text-anchor");
    expect(element).toBeInTheDocument();
  });
});
