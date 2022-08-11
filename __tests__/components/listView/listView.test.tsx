import React from "react";
import { render } from "@testing-library/react";
import ListView from "../../../src/components/listView/listView";
import ShallowRenderer from "react-test-renderer/shallow";

// constants
import { userRowData, userPrimaryKey, userColumnData } from "src/configs/users.constant";

describe("ListView", () => {
  it("renders a list view", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <ListView
        heading="Users"
        subHeading="List of users"
        rowData={userRowData}
        columnData={userColumnData}
        primaryKey={userPrimaryKey}
      />
    );
    const utils = renderer.getRenderOutput();
  });
});
