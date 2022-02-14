
/**
 *
 * @param {object} props
 * @param {import("./types").RecipeNode} props.node
 */
export function RecipeNodeStats({ node }) {
    const actionCount = countActions(node);

    return (
        <p>Total Actions: {actionCount}</p>
    );
}

/**
 * @param {import("./types").RecipeNode} node
 */
function countActions (node) {
    const baseCount = typeof node.action === "string" ? 1 : node.action.length;
    return baseCount + node.pre.reduce((sum, p) => sum + (typeof p === "string" ? 0 : countActions(p)), 0);
}