const { withFederatedSidecar } = require("@anchor/nextjs-mf");

module.exports = withFederatedSidecar({
  name: "anchorFlow",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./anchorStoreProvider": "./src/redux/index",
    "./dashboard": "./src/pages/dashboard",
    "./all_task": "./src/pages/tasklist/all_task/index",
    "./my_task": "./src/pages/tasklist/my_task/index",
    "./my_group_task": "./src/pages/tasklist/my_group_task/index",
    "./pages-map": "./pages-map",
    "./bpmn": "./src/pages/create-workflow/bpmn/[deploymentId]",
    "./dmn": "./src/pages/create-workflow/dmn/[deploymentId]",
    "./layout": "./src/components/layout/layout.tsx",
    "./form": "./src/pages/create-workflow/form",
    "./deployments": "./src/pages/process/deployments",
    "./decision-definitions": "./src/pages/decision/decision-definitions",
    "./decision-definitions_details": "./src/pages/decision/decision-definitions/details",
    "./process-definitions": "./src/pages/process/process-definitions",
    "./process-definitions_details": "./src/pages/process/process-definitions/details",
    "./AuthGuard": "./src/components/auth/AuthGuard.tsx",
    "./sidebarLayout": "src/components/layout/sidebarLayout.tsx",
    "./groups": "./src/pages/groups/index",
    "./groupId": "./src/pages/groups/[groupId]/members",
    "./forms": "./src/pages/forms/index",
    "./formId": "./src/pages/forms/details",
  },
  shared: {
    react: {
      // Notice shared are NOT eager here.
      requiredVersion: false,
      singleton: true,
    },
  },
})({
  images: {
    domains: ["anchor-flow.dev.maersk-digital.net"],
  },
  // your original next.config.js export
  webpack(config, options) {
    // we attach next internals to share scope at runtime
    // if (!options.isServer) {
    //   config.output.publicPath = process.env.NEXT_MF_PUBLIC_PATH;
    // }

    return config;
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/dashboard",
      },
    ];
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
});
