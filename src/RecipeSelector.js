import "./RecipeSelector.scss";

export function RecipeSelector ({ recipes, selectedIndex, onChange }) {
    return (
        <div>
            <h2>Recipes</h2>
            <ul className="RecipeSelector">
                {
                    recipes.map((recipe, i) => {
                        const className = `RecipeSelector-Item ${i === selectedIndex ? "selected":""}`;
                        const name = recipe.name || `Recipe ${i}`;

                        return (
                            <li key={i} className={className} onClick={() => onChange(i)}>{name}</li>
                        );
                    })
                }
            </ul>
        </div>
    )
}