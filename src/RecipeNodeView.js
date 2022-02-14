import { useState } from "react";
import "./RecipeNodeView.css";

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
                <RecipeNodeItem action={node.action} pre={node.pre} name={node.name} showCheckboxes={showCheckboxes} />
            </ul>
        </div>
    );
}

/**
 *
 * @param {object} props
 * @param {string|string[]} props.action
 * @param {(RecipeNode|string)[]} props.pre
 * @param {string} [props.name]
 * @param {boolean} [props.showCheckboxes]
 */
function RecipeNodeItem ({ action, pre, name = null, showCheckboxes = false }) {

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

        const newPre = [
            {
                action: newAction,
                pre
            }
        ];

        return <RealItem name={name} action={thisAction} pre={newPre} showCheckboxes={showCheckboxes} />
    }

    return <RealItem name={name} action={action} pre={pre} showCheckboxes={showCheckboxes} />;
}

/**
 *
 * @param {object} props
 * @param {string|string[]} props.action
 * @param {(RecipeNode|string)[]} props.pre
 * @param {string} [props.name]
 * @param {boolean} [props.showCheckboxes]
 */
function RealItem ({ name, action, pre, showCheckboxes }) {
    const [ collapsed, setCollapsed ] = useState(false);

    if (collapsed) {
        return <li className="ingredient" style={{ cursor: "pointer" }} onClick={() => setCollapsed(false)}>+ {name}</li>;
    }

    return (
        <li className="item">
            { name && <p className="name" style={{ cursor: "pointer" }} onClick={() => setCollapsed(true)}>{name}</p> }
            <label className="action">
                { showCheckboxes && <input type="checkbox" /> }
                {action}
            </label>
            <ul className="list">
                {
                    pre.map((p, i) => {
                        if (typeof p === "string") {
                            return <li key={i} className="ingredient">{p}</li>;
                        } else {
                            return <RecipeNodeItem key={i} action={p.action} pre={p.pre} name={p.name} showCheckboxes={showCheckboxes} />;
                        }
                    })
                }
            </ul>
        </li>
    );
}
