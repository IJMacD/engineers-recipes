import { useState } from "react";

const listStyle = { padding: 5 };
const itemStyle = { borderRadius: 5, display: "inline-block", padding: 5, margin: 10, backgroundColor: "rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.1)" };
const nameStyle = { fontWeight: "bold", backgroundColor: "#FFFFFF", borderRadius: 5, border: "1px solid #333333", padding: 5, margin: "-5px -5px 5px -5px" };
const actionStyle = { backgroundColor: "#00CCCC", border: "1px solid #009999", color: "#003333", borderRadius: 5, padding: "2px 4px", margin: 0, display: "inline-block" };
const ingredientStyle = { listStyle: "none", padding: 5, background: "#333333", borderRadius: 5, color: "#F5F5F5", display: "inline-block", marginRight: 5, marginBottom: 5 };

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 */
 export function RecipeNodeTree ({ node }) {
    return (
        <ul style={listStyle}>
            <RecipeNodeItem action={node.action} pre={node.pre} name={node.name} />
        </ul>
    );
}

/**
 *
 * @param {object} props
 * @param {string|string[]} props.action
 * @param {(RecipeNode|string)[]} props.pre
 * @param {string} [props.name]
 */
function RecipeNodeItem ({ action, pre, name = null }) {
    const [ collapsed, setCollapsed ] = useState(false);

    if (collapsed) {
        return <li style={{ ...ingredientStyle, cursor: "pointer" }} onClick={() => setCollapsed(false)}>+ {name}</li>;
    }

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

        return (
            <li style={itemStyle}>
                { name && <p style={{ ...nameStyle, cursor: "pointer" }} onClick={() => setCollapsed(true)}>{name}</p> }
                <p style={actionStyle}>{action[0]}</p>
                <ul style={listStyle}>
                    <RecipeNodeItem action={action.length === 2 ? action[1] : action.slice(1)} pre={pre} />
                </ul>
            </li>
        );
    }

    return (
        <li style={itemStyle}>
            { name && <p style={{ ...nameStyle, cursor: "pointer" }} onClick={() => setCollapsed(true)}>{name}</p> }
            <p style={actionStyle}>{action}</p>
            <ul style={listStyle}>
                {
                    pre.map((p, i) => {
                        if (typeof p === "string") {
                            return <li key={i} style={ingredientStyle}>{p}</li>;
                        } else {
                            return <RecipeNodeItem key={i} action={p.action} pre={p.pre} name={p.name} />;
                        }
                    })
                }
            </ul>
        </li>
    );
}
