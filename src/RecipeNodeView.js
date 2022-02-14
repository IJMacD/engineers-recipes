import { useState } from "react";
import "./RecipeNodeView.scss";

/** @typedef {import('./types').RecipeNode} RecipeNode */

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 * @param {string} [props.style]
 * @param {boolean} [props.showCheckboxes]
 */
 export function RecipeNodeView ({ node, style = "tree", showCheckboxes = false }) {
    return (
        <div className={style === "tree" ? "RecipeNodeTree" : "RecipeNodeTable"}>
            <ul className="list">
                <RecipeNodeItem node={node} showCheckboxes={showCheckboxes} />
            </ul>
        </div>
    );
}

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 * @param {boolean} [props.showCheckboxes]
 */
function RecipeNodeItem ({ node, showCheckboxes = false }) {

    const { action, pre, name = null } = node;

    if (!action) {
        throw Error("Action cannot be null");
    }

    if (Array.isArray(action)) {
        if (action.length === 0) {
            throw Error("Action cannot be an empty array");
        }

        if (action.length === 1) {
            throw Error("Action cannot be an array of 1");
        }

        const [ thisAction, ...otherActions ] = action;
        const newAction = otherActions.length === 1 ? otherActions[0] : otherActions;

        const newNode = {
            action: thisAction,
            name,
            pre: [
                {
                    action: newAction,
                    pre
                }
            ]
        };

        return <RealItem node={newNode} showCheckboxes={showCheckboxes} />
    }

    return <RealItem node={node} showCheckboxes={showCheckboxes} />;
}

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 * @param {boolean} [props.showCheckboxes]
 */
function RealItem ({ node, showCheckboxes }) {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ completed, setCompleted ] = useState(false);

    const { action, pre, name = null, duration = 1 } = node;

    return (
        <li className={`item ${collapsed?"collapsed":""} ${completed?"completed":""}`}>
            { name && <p className="name" onClick={() => setCollapsed(c => !c)}>{ collapsed && "+ "}{name}</p> }
            <label className="action" data-duration={duration}>
                <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} style={{display:!showCheckboxes?"none":null}} />
                {action}
            </label>
            <ul className="list">
                {
                    pre.map((p, i) => {
                        if (typeof p === "string") {
                            return <li key={i} className="ingredient">{p}</li>;
                        } else {
                            return <RecipeNodeItem key={i} node={p} showCheckboxes={showCheckboxes} />;
                        }
                    })
                }
            </ul>
        </li>
    );
}
