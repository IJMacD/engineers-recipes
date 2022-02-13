import { useState } from "react";

const listStyle = { border: "1px solid #333333", margin: -1, flex: 1, display: "flex", flexDirection: "column" };
const itemStyle = { display: "flex", flexDirection: "row-reverse", border: "1px solid #333333", margin: -1, flex: 1, alignItems: "stretch" };
const nameStyle = { writingMode: "vertical-rl", margin: 0, border: "1px solid #333333", padding: "4px 2px", color: "white", backgroundColor: "#555555" };
const actionStyle = { margin: -1, padding: "2px 4px", width: 120 };
const ingredientStyle = { fontWeight: "bold", border: "1px solid #333333", margin: -1, padding: "2px 4px", flex: 1 };

/**
 *
 * @param {object} props
 * @param {RecipeNode} props.node
 */
 export function RecipeNodeTable ({ node }) {
    return <RecipeNodeItem action={node.action} pre={node.pre} name={node.name} />;
}

/**
 *
 * @param {object} props
 * @param {string|string[]} props.action
 * @param {(RecipeNode|string)[]} props.pre
 * @param {string} [props.name]
 */
function RecipeNodeItem ({ action, pre, name = null }) {
    // const [ collapsed, setCollapsed ] = useState(false);

    // if (collapsed) {
    //     return <li style={{ ...ingredientStyle, cursor: "pointer" }} onClick={() => setCollapsed(false)}>+ {name}</li>;
    // }

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
            <div style={itemStyle}>
                { name && <p style={nameStyle}>{name}</p> }
                <p style={actionStyle}>{action[0]}</p>
                <div style={listStyle}>
                    <RecipeNodeItem action={action.length === 2 ? action[1] : action.slice(1)} pre={pre} />
                </div>
            </div>
        );
    }

    return (
        <div style={itemStyle}>
            { name && <p style={nameStyle}>{name}</p> }
            <p style={actionStyle}>{action}</p>
            <div style={listStyle}>
                {
                    pre.map((p, i) => {
                        if (typeof p === "string") {
                            return <p key={i} style={ingredientStyle}>{p}</p>;
                        } else {
                            return <RecipeNodeItem key={i} action={p.action} pre={p.pre} name={p.name} />;
                        }
                    })
                }
            </div>
        </div>
    );
}
