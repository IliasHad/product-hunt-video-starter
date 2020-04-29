const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNode } = actions;

  if (node.internal.type === "googleSheetSheet1Row") {
    try {
      const fileNode = await createRemoteFileNode({
        url: node.featuredimage,
        store,
        cache,
        createNode,
        parentNodeId: node.id,
        createNodeId,
      });

      if (fileNode) {
        node.localFeaturedImage___NODE = fileNode.id;
      }
    } catch (err) {
      node.localFeaturedImage = null;
    }
  }
};
