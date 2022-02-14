import './App.css';
import boatRecipe from "./recipes/boat.json";
import sconeRecipe from "./recipes/scones.json";
import { RecipeNodeView } from './RecipeNodeView';
import { useState } from 'react';

function App() {
  const [ viewMode, setViewMode ] = useState("tree");
  const [ showCheckboxes, setShowCheckboxes ] = useState(false);
  const [ recipe, setRecipe ] = useState(/** @type {import('./types').RecipeNode} */(boatRecipe));

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
        <label>
          <input type="checkbox" checked={showCheckboxes} onChange={e => setShowCheckboxes(e.target.checked)} />
          Show Checkboxes
        </label>
      </p>
      <RecipeNodeView node={recipe} style={viewMode} showCheckboxes={showCheckboxes} />
    </div>
  );
}

export default App;
