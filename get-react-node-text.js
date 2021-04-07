/**
 * Extract just the text content from a React node tree
 * https://stackoverflow.com/a/60564620
 *
 * @param node  React node to extract text from
 */
export const getNodeText = (node) => {
  if (["string", "number"].includes(typeof node)) return node;
  if (node instanceof Array) return node.map(getNodeText).join(" ");
  if (typeof node === "object" && node) return getNodeText(node.props.children);
};
