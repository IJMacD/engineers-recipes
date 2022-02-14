import './App.css';
import boatRecipe from "./recipes/boat.json";
import sconeRecipe from "./recipes/scones.json";
import { RecipeNodeView } from './RecipeNodeView';
import { useEffect, useState } from 'react';
import { RecipeNodeStats } from './RecipeNodeStats';
import { parseMarkdownRecipe } from './parseMarkdownRecipe';

const brownieMarkdown = require("./recipes/Brownies.md");

function App() {
  const [ viewMode, setViewMode ] = useState("table");
  const [ showCheckboxes, setShowCheckboxes ] = useState(false);
  const [ brownieRecipe, setBrownieRecipe ] = useState(/** @type {import('./types').RecipeNode} */(null));
  const [ recipe, setRecipe ] = useState(/** @type {import('./types').RecipeNode} */(boatRecipe));

  useEffect(() => {
    fetch(brownieMarkdown)
    .then(r => r.text())
    .then(t => {
      setBrownieRecipe(parseMarkdownRecipe(t));
    });
  }, []);

  return (
    <div className="App" style={{margin: 20}}>
      <p className="controls">
        <span style={{marginRight: 5}}>
          <button onClick={() => setRecipe(boatRecipe)}>Boat</button>
          <button onClick={() => setRecipe(sconeRecipe)}>Scones</button>
          { brownieRecipe && <button onClick={() => setRecipe(brownieRecipe)}>Brownies</button> }
        </span>
        <span style={{marginRight: 5}}>
          <button onClick={() => setViewMode("table")} disabled={viewMode === "table"}>Table</button>
          <button onClick={() => setViewMode("tree")} disabled={viewMode === "tree"}>Tree</button>
        </span>
        <label>
          <input type="checkbox" checked={showCheckboxes} onChange={e => setShowCheckboxes(e.target.checked)} />
          Show Checkboxes
        </label>
      </p>
      <RecipeNodeView node={recipe} style={viewMode} showCheckboxes={showCheckboxes} />
      <RecipeNodeStats node={recipe} />
    </div>
  );
}

export default App;
