
/**
 *
 * @param {object} props
 * @param {import("./types").RecipeNode} props.node
 */
export function RecipeNodeStats({ node }) {
    const actionCount = countActions(node);
    const completeCount = countCompleteActions(node);

    return (
        <div>
            <p>Total Actions: {actionCount}</p>
            <p>Complete Actions: {completeCount}</p>
            <p>Incomplete Actions: {actionCount - completeCount}</p>
            <p>Completed: {(completeCount/actionCount*100).toFixed()}%</p>
        </div>
    );
}

/**
 * @param {import("./types").RecipeNode} node
 */
function countActions (node) {
    return 1 + node.pre.reduce((sum, p) => sum + (typeof p === "string" ? 0 : countActions(p)), 0);
}

/**
 * @param {import("./types").RecipeNode} node
 */
function countCompleteActions (node) {
    const baseCount = node.completed ? 1 : 0;
    return baseCount + node.pre.reduce((sum, p) => sum + (typeof p === "string" ? 0 : countCompleteActions(p)), 0);
}