export function estimateNutrition(ingredients) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;

  // Basic nutritional values per common unit (e.g., 100g, 1 cup, 1 tbsp, or generic per item)
  // This is a rough estimation for demonstration purposes
  const nutritionDB = {
    chicken: { calories: 165, protein: 31, fat: 3.6 }, // per 100g
    beef: { calories: 250, protein: 26, fat: 15 },
    pork: { calories: 242, protein: 27, fat: 14 },
    fish: { calories: 206, protein: 22, fat: 12 },
    salmon: { calories: 208, protein: 20, fat: 13 },
    egg: { calories: 72, protein: 6, fat: 5 }, // per large egg
    milk: { calories: 42, protein: 3.4, fat: 1 }, // per 100ml
    cheese: { calories: 402, protein: 25, fat: 33 }, // per 100g
    butter: { calories: 717, protein: 0.8, fat: 81 },
    oil: { calories: 884, protein: 0, fat: 100 }, // olive oil, etc.
    rice: { calories: 130, protein: 2.7, fat: 0.3 }, // cooked, per 100g
    pasta: { calories: 131, protein: 5, fat: 1.1 }, // cooked, per 100g
    flour: { calories: 364, protein: 10, fat: 1 },
    sugar: { calories: 387, protein: 0, fat: 0 },
    potato: { calories: 86, protein: 1.7, fat: 0.1 },
    tomato: { calories: 18, protein: 0.9, fat: 0.2 },
    onion: { calories: 40, protein: 1.1, fat: 0.1 },
    garlic: { calories: 149, protein: 6.4, fat: 0.5 },
    bread: { calories: 265, protein: 9, fat: 3.2 },
    chocolate: { calories: 546, protein: 4.9, fat: 31 },
    cream: { calories: 345, protein: 2, fat: 37 },
    yogurt: { calories: 59, protein: 10, fat: 0.4 },
    nuts: { calories: 607, protein: 21, fat: 54 },
    apple: { calories: 52, protein: 0.3, fat: 0.2 },
    banana: { calories: 89, protein: 1.1, fat: 0.3 },
  };

  ingredients.forEach((item) => {
    const name = item.ingredient.toLowerCase();

    // Simple matching
    let matched = false;
    for (const [key, value] of Object.entries(nutritionDB)) {
      if (name.includes(key)) {
        // Assume default portion size multiplier if measure not easily parsed
        let multiplier = 1;

        // Very basic measure parsing for common terms (just an estimate)
        const measure = item.measure ? item.measure.toLowerCase() : "";
        if (measure.includes("cup"))
          multiplier = 2.4; // roughly 240g/ml
        else if (measure.includes("tbsp") || measure.includes("tablespoon"))
          multiplier = 0.15; // 15g
        else if (measure.includes("tsp") || measure.includes("teaspoon"))
          multiplier = 0.05; // 5g
        else if (measure.includes("g") || measure.includes("gram")) {
          const grams = parseInt(measure.match(/\d+/));
          if (grams) multiplier = grams / 100;
        } else if (measure.includes("oz") || measure.includes("ounce")) {
          const oz = parseInt(measure.match(/\d+/));
          if (oz) multiplier = (oz * 28) / 100;
        } else if (measure.includes("lb") || measure.includes("pound")) {
          const lb = parseInt(measure.match(/\d+/));
          if (lb) multiplier = (lb * 453) / 100;
        } else if (measure.includes("kg") || measure.includes("kilogram")) {
          const kg = parseInt(measure.match(/\d+/));
          if (kg) multiplier = (kg * 1000) / 100;
        }

        totalCalories += value.calories * multiplier;
        totalProtein += value.protein * multiplier;
        totalFat += value.fat * multiplier;
        matched = true;
        break; // Only match first found
      }
    }

    // If no match found, add a generic small amount
    if (!matched) {
      totalCalories += 20;
      totalProtein += 0.5;
      totalFat += 0.5;
    }
  });

  return {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein),
    fat: Math.round(totalFat),
  };
}
