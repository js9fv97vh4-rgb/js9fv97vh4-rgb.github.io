# Local geographic data

- `countries-50m.geojson`: Natural Earth Admin 0 Countries, 1:50m, downloaded 2026-10-31 from the project's own vector repository:
  https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson
- Official data description: https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-countries-2/
- Public domain: https://www.naturalearthdata.com/about/terms-of-use/
- Geometries are retained, properties reduced to ADM0_A3 and NAME. No external map API at runtime.
- `countries.geojson` is the previous 1:110m world layer retained for lighter globe textures. Country-detail maps always use the local 50m file.
- Point coordinates in src/data.js are representative origin locations, not farm addresses or precise cultivation boundaries. Natural Earth uses de facto cartographic boundaries; this is an educational origin map.
