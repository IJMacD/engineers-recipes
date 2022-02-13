interface RecipeNode {
    action: string|string[];
    pre: (RecipeNode|string)[];
    name?: string;
}