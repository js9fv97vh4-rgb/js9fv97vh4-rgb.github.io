import { test } from 'node:test';
import assert from 'node:assert/strict';
import { drinkCatalog, categories, ingredients } from '../src/catalog.js';

test('all 24 drinks have a valid category, method, recipe and source', () => {
  assert.equal(drinkCatalog.length, 24);
  assert.equal(new Set(drinkCatalog.map(d => d.id)).size, 24);
  assert.deepEqual(categories.map(c => drinkCatalog.filter(d => d.category === c.id).length), [9, 7, 6, 2]);
  for (const drink of drinkCatalog) {
    const category = categories.find(c => c.id === drink.category);
    assert.ok(category.groups.some(g => g.id === drink.subcategory), drink.id);
    assert.ok(['espresso', 'pour-over', 'french-press', 'cold-brew'].includes(drink.method));
    assert.ok(drink.dose > 0 && drink.output > 0);
    assert.ok(['g', 'ml'].includes(drink.outputUnit));
    assert.ok(drink.foam >= 0 && drink.foam <= 1);
    assert.ok(drink.source[1].startsWith('https://'));
    assert.equal(drink.caffeine, null, 'unmeasured recipes must not fabricate caffeine from output');
    for (const [id, amount] of Object.entries(drink.ingredients)) {
      assert.ok(ingredients.some(ingredient => ingredient.id === id));
      assert.ok(amount > 0);
    }
    if (drink.foam) assert.ok(ingredients.some(i => i.milk && drink.ingredients[i.id] > 0));
    assert.ok(!('foam' in drink.ingredients), 'foam must be derived from milk');
  }
  for (const id of ['espresso','americano','latte','cappuccino','flat-white','macchiato']) {
    assert.ok(drinkCatalog.some(drink => drink.id === id), 'legacy links remain valid');
  }
  assert.equal(ingredients.find(i => i.id === 'chocolate').caffeineKnown, false);
  assert.equal(ingredients.find(i => i.id === 'icecream').caffeineKnown, false);
});
