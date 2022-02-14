import { useState } from "react";
import "./RecipeNodeView.scss";

/** @typedef {import('./types').RecipeNode} RecipeNode */

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 * @param {string} [props.style]
 * @param {boolean} [props.showCheckboxes]
 * @param {(node: RecipeNode, completed: boolean) => void} props.setCompleted
 */
 export function RecipeNodeView ({ node, style = "tree", showCheckboxes = false, setCompleted }) {
    return (
        <div className={style === "tree" ? "RecipeNodeTree" : "RecipeNodeTable"}>
            <ul className="list">
                <RecipeNodeItem node={node} showCheckboxes={showCheckboxes} setCompleted={setCompleted} />
            </ul>
        </div>
    );
}

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 * @param {boolean} [props.showCheckboxes]
 * @param {(node: RecipeNode, completed: boolean) => void} props.setCompleted
 * @param {boolean} [props.isParentComplete]
 */
function RecipeNodeItem ({ node, showCheckboxes = false, setCompleted, isParentComplete = false }) {
    const [ collapsed, setCollapsed ] = useState(false);

    const { action, pre, name = null, duration = 1, completed = false } = node;

    const isCompleteable = arePrerequitiesComplete(node);

    return (
        <li className={`item ${collapsed?"collapsed":""} ${completed?"completed":""}`}>
            { name && <p className="name" onClick={() => setCollapsed(c => !c)}>{ collapsed && "+ "}{name}</p> }
            <label className="action" data-duration={duration}>
                <input type="checkbox" checked={completed} onChange={e => setCompleted(node, e.target.checked)} style={{display:!showCheckboxes?"none":null}} disabled={!isCompleteable || isParentComplete} />
                {action}
            </label>
            <ul className="list">
                {
                    pre.map((p, i) => {
                        if (typeof p === "string") {
                            return <li key={i} className="ingredient">{p}</li>;
                        } else {
                            return <RecipeNodeItem key={i} node={p} showCheckboxes={showCheckboxes} setCompleted={setCompleted} isParentComplete={completed} />;
                        }
                    })
                }
            </ul>
        </li>
    );
}

/**
 *
 * @param {RecipeNode} node
 * @return {boolean}
 */
function arePrerequitiesComplete (node) {
    return node.pre.every(p => typeof p === "string" ? true : p.completed);
}