import { countries } from './data.js';

export function filterRegions(regions, query = '', selectedFlavors = []) {
  const needle = query.trim().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  return regions.filter(region => {
    const country = countries.find(item => item.id === region.countryId);
    const text = `${region.name} ${region.en} ${country.name} ${country.en} ${region.countryId === 'CHN' ? '云南 Yunnan 小粒咖啡' : ''} ${region.id === 'sumatra' ? '曼特宁 Mandheling Mandailing' : ''} ${region.id === 'sidama' ? '西达摩 Sidamo' : ''} ${region.id === 'huila' ? '惠兰' : ''}`.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    return text.includes(needle) && (!selectedFlavors.length || selectedFlavors.some(flavor => region.flavors.includes(flavor)));
  });
}

export function caffeineComparison(amount, cups = 1, other = 0) {
  const total = amount * cups + other;
  return { total, percent: Math.round(total / 400 * 100), barPercent: Math.min(100, total / 400 * 100), over: total > 400 };
}
