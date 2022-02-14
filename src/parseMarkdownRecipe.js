import mtp from "markdown-tree-parser";

/**
 * @typedef {MarkdownNodeBlock | MarkdownNodeInline} MarkdownNode
 */

/**
 * @typedef MarkdownNodeBlock
 * @property {string} name
 * @property {"block"} type
 * @property {number} level
 * @property {MarkdownNode[]} values
 */

/**
 * @typedef MarkdownNodeInline
 * @property {string} name
 * @property {"inline"} type
 * @property {string} value
 */

/**
 * @param {string} text
 * @returns {import('./types').RecipeNode}
 */
export function parseMarkdownRecipe(text) {
  const tree = mtp(text);
  const ast = /** @type {MarkdownNode[]} */(tree.ast);

  /** @type {import("./types").RecipeNode} */
  let currentNode = {
      action: null,
      pre: [],
      name: null,
  };

  let currentLevel = 0;

  for (let node of ast) {
    // First check for mis-identified headings
    if (node.type === "inline" && node.name === "paragraph") {
        const regex = /^\s*(#{1,})\s*(.*)/
        const match = regex.exec(node.value);
        if (match) {
            node = {
                type: "block",
                name: "heading",
                level: match[1].length,
                values: [
                    {
                        type: "inline",
                        name: "text",
                        value: match[2],
                    }
                ]
            };
        }
    }

    // Check for name
    if (node.type === "block" && node.name === "heading") {
        currentNode.name = node.values[0].type === "inline" && node.values[0].value;
        currentLevel = node.level;
    }
    // List
    else if (node.type === "block" && node.name === "list") {
        if (node.level > currentLevel) {

        }
    }
  }
}
