import './App.css';
import boatRecipe from "./recipes/boat.json";
import sconeRecipe from "./recipes/scones.json";
import brownieRecipe from "./recipes/brownies.json";
import { RecipeNodeView } from './RecipeNodeView';
import { useState } from 'react';
import { RecipeNodeStats } from './RecipeNodeStats';
import { useLocalStorage } from './useLocalStorage';
import { RecipeSelector } from './RecipeSelector';

const STORAGE_ROOT = "er";
const STORAGE_RECIPES = `${STORAGE_ROOT}.recipes`;
const STORAGE_INDEX = `${STORAGE_ROOT}.recipeIndex`;
const STORAGE_SELECTED = `${STORAGE_ROOT}.selected`;
const STORAGE_RECIPE_ROOT = `${STORAGE_ROOT}.recipes`;

/**
 * @typedef {import('./types').RecipeNode} RecipeNode
 */


function App() {
  const [ viewMode, setViewMode ] = useState("table");
  const [ showCheckboxes, setShowCheckboxes ] = useState(false);

  const [ recipes, saveRecipes ] = useLocalStorage(STORAGE_RECIPES, () => /** @type {RecipeNode[]} */([expandRecipeNode(boatRecipe), expandRecipeNode(sconeRecipe), expandRecipeNode(brownieRecipe)]));

  const [ selectedRecipe, setSelectedRecipe ] = useLocalStorage(STORAGE_SELECTED, 0);

  const recipe = recipes[selectedRecipe];

  /**
   *
   * @param {RecipeNode} node
   * @param {boolean} completed
   */
  function setCompleted (node, completed) {
    saveRecipes(recipes => {
      return recipes.map((recipe, i) => {
        if (i === selectedRecipe) return recipeChangeReducer(recipe, node, { completed });
        return recipe;
      });
    });
  }

  return (
    <div className="App">
      <div className="controls">
        <RecipeSelector recipes={recipes} selectedIndex={selectedRecipe} onChange={setSelectedRecipe} />
        <h2>Display</h2>
        <span style={{marginRight: 5}}>
          <button onClick={() => setViewMode("table")} disabled={viewMode === "table"}>Table</button>
          <button onClick={() => setViewMode("tree")} disabled={viewMode === "tree"}>Tree</button>
        </span>
        <label style={{display:"block"}}>
          <input type="checkbox" checked={showCheckboxes} onChange={e => setShowCheckboxes(e.target.checked)} />
          Show Checkboxes
        </label>
      </div>
      <div>
        <RecipeNodeView node={recipe} style={viewMode} showCheckboxes={showCheckboxes} setCompleted={setCompleted} />
        <RecipeNodeStats node={recipe} />
      </div>
    </div>
  );
}

export default App;

/**
 *
 * @param {RecipeNode} recipeNode
 * @param {RecipeNode} targetNode
 * @param {any} change
 * @returns
 */
function recipeChangeReducer (recipeNode, targetNode, change) {
  if (recipeNode === targetNode) {
    return { ...recipeNode, ...change };
  }

  return {
    ...recipeNode,
    pre: recipeNode.pre.map(p => typeof p === "string" ? p : recipeChangeReducer(p, targetNode, change))
  };
}

/**
 * Action can be an array to save save in serialisation.
 * This filter expands all actions to be single string
 * @param {RecipeNode} node
 * @returns {RecipeNode}
 */
function expandRecipeNode (node) {

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

      node = {
          action: thisAction,
          name,
          pre: [
              {
                  action: newAction,
                  pre
              }
          ]
      };
  }

  node.pre = node.pre.map(p => typeof p === "string" ? p : expandRecipeNode(p));

  return node;
}