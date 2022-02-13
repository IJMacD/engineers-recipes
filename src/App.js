import './App.css';
import boatRecipe from "./recipes/boat.json";
import sconeRecipe from "./recipes/scones.json";
import { RecipeNodeTree } from './RecipeNodeView';
import { useState } from 'react';
import { RecipeNodeTable } from './RecipeNodeTable';

function App() {
  const [ viewMode, setViewMode ] = useState("tree");
  const [ recipe, setRecipe ] = useState(/** @type {RecipeNode} */(boatRecipe));

  return (
    <div className="App" style={{margin: 20}}>
      <p>
        <span style={{marginRight: 5}}>
          <button onClick={() => setRecipe(boatRecipe)}>Boat</button>
          <button onClick={() => setRecipe(sconeRecipe)}>Scones</button>
        </span>
        <span style={{marginRight: 5}}>
          <button onClick={() => setViewMode("tree")} disabled={viewMode === "tree"}>Tree</button>
          <button onClick={() => setViewMode("table")} disabled={viewMode === "table"}>Table</button>
        </span>
      </p>
      {
        viewMode === "tree" ?
          <RecipeNodeTree node={recipe} /> :
          <RecipeNodeTable node={recipe} />
      }
    </div>
  );
}

export default App;
