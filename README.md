# Countries App

Proyecto Next.js que muestra un listado de países con navegación multi-página.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Navegación

- `/` : listado principal con buscador por nombre.
- `/all` : listado completo de países.
- `/region/[region]` : filtro por región, por ejemplo `/region/europe`.
- `/country/[name]` : detalles del país seleccionado.

## Estructura

- `src/app/page.tsx` muestra la página principal con enlaces a rutas de región.
- `src/app/all/page.tsx` réplica el listado completo.
- `src/app/region/[region]/page.tsx` obtiene los países de cada región.
- `src/app/country/[name]/page.tsx` muestra los datos específicos de un país.
- `src/app/components/CountriesGrid.tsx` mantiene el estado del buscador en cliente.
- `src/app/components/SearchBar.tsx` gestiona la entrada del término de búsqueda.

## Datos anidados de la API

La API de REST Countries devuelve objetos anidados en campos como `languages` y `currencies`.

- `languages` se convierte con `Object.values(country.languages).join(", ")`.
- `currencies` se convierte con `Object.values(country.currencies).map(c => c.name).join(", ")`.
- Para la ruta de detalle se usa `?fullText=true` y se comprueba si el país existe.