import './App.css';
import boatRecipe from "./boat.min.json";
import { RecipeNodeTree } from './RecipeNodeView';

function App() {

  /** @type {RecipeNode} */
  const recipe = boatRecipe;

  return (
    <div className="App">
      <RecipeNodeTree node={recipe} />
    </div>
  );
}

export default App;
