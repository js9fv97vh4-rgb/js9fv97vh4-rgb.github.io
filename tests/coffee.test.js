import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { countries, regions, processes, brews, drinks } from '../src/data.js';
import { filterRegions, caffeineComparison } from '../src/logic.js';

test('all 28 regions belong to a mapped country and link to valid processes', () => {
  assert.equal(countries.length, 14);
  assert.equal(regions.length, 28);
  assert.equal(new Set(regions.map(r=>r.id)).size, 28);
  const map = JSON.parse(readFileSync(new URL('../public/data/countries.geojson', import.meta.url)));
  for (const country of countries) {
    assert.equal(regions.filter(r=>r.countryId===country.id).length, 2);
    assert.ok(map.features.some(f=>f.properties.ADM0_A3===country.id), country.id);
  }
  for (const region of regions) {
    assert.ok(countries.some(c=>c.id===region.countryId));
    assert.ok(region.lat>=-90 && region.lat<=90 && region.lng>=-180 && region.lng<=180);
    assert.ok(region.processes.every(id=>processes.some(p=>p.id===id)));
    assert.ok(region.flavors.length>0 && region.body && region.species && region.varieties);
  }
  assert.equal(brews.length, 6);
  assert.equal(drinks.length, 24);
});

test('country and region search combines with OR flavor matching', () => {
  assert.equal(filterRegions(regions, '埃塞俄比亚').length, 2);
  assert.equal(filterRegions(regions, ' ETHIOPIA ').length, 2);
  assert.equal(filterRegions(regions, 'Yirgacheffe')[0].id, 'yirgacheffe');
  assert.equal(filterRegions(regions, 'Tarrazu')[0].id, 'tarrazu');
  assert.equal(filterRegions(regions, 'Ethiopia', ['spicy']).length, 0);
  assert.equal(filterRegions(regions, 'Ethiopia', ['spicy','floral']).length, 2);
  assert.equal(filterRegions(regions, '<script>').length, 0);
  assert.equal(filterRegions(regions, '').length, 28);
});

test('caffeine comparison shows overflow without truncating the actual total', () => {
  assert.deepEqual(caffeineComparison(80,1,0),{total:80,percent:20,barPercent:20,over:false});
  assert.equal(caffeineComparison(80,5).over,false);
  assert.deepEqual(caffeineComparison(120,4,80),{total:560,percent:140,barPercent:100,over:true});
});
