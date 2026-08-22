# Auditoría — landing HEBA (hebatech-front)

Repo auditado: `hebatech-front` (Vite 7 + React 19 + TypeScript, SPA con React Router, deploy en Vercel con funciones serverless en `/api`). Build de producción corrido en esta pasada (`npm run build`, éxito, 8.91s). Sin tests, sin CI visible en el repo.

**Corrección al brief antes de arrancar:** dos cosas que me pediste dar por sentadas no coinciden con el repo.

1. **La copy NO usa voseo paisa.** Es tuteo consistente en las cinco secciones que llevan copy conversacional: "Hablas directo con quien va a construir tu **sistema**" ([Contact.tsx:82](src/components/Contact.tsx#L82)), "Cuéntanos qué **estás** resolviendo" ([Contact.tsx:79](src/components/Contact.tsx#L79)), "algo de **tu** equipo" ([Services.tsx:7](src/components/Services.tsx#L7)). Ni un solo "vos", "podés" o "tenés" en todo `src/`. Si el voseo paisa es una decisión de marca real, hay que reescribir contacto y servicios — no es un matiz menor en Medellín, es el registro que separa "estudio local que te entiende" de "landing genérica en español neutro".
2. **`lang="es"` en `<html>` SÍ está** ([index.html:2](index.html#L2)). Marcalo como resuelto, no es un hallazgo.

Los colores de marca reales (tomados de `global.css` y confirmados en `favicon.svg`) son `--ink: #08090a`, `--bone: #f0ede8`, `--sage: #8fb09a` — no `#080907` / `#EDE9E2` que diste en el brief. Diferencia mínima (probablemente redondeo), pero uso los valores del repo para todos los cálculos de contraste de abajo.

---

## Veredicto en 5 líneas

Esta landing **no está lista para mandarla a un prospecto por WhatsApp hoy**, y es irónico porque WhatsApp es uno de sus dos canales de contacto: el `og:image` relativo hace que el link llegue sin imagen a la única app que HEBA usa para vender. El código del sitio es notablemente más honesto que el promedio del rubro — cero testimonios inventados, cero logos falsos, un caso real con permiso y números verificables ([Work.tsx](src/components/Work.tsx)) — y el sistema visual tiene una jerarquía tipográfica real, no decorativa. Pero el HTML que llega al navegador está vacío (CSR puro, confirmado con el build), el mensaje de éxito/error del formulario de contacto se renderiza con un contraste que reprueba WCAG AA, y hay tres imágenes de stock hotlinkeadas desde rawpixel.com justo en la sección que más necesita sentirse artesanal. Ninguno de los tres arreglos críticos toma más de una tarde.

---

## Tabla de hallazgos

| Severidad | Lente | Archivo:línea | Qué está mal | Qué hacer |
|---|---|---|---|---|
| Crítico | Mkt/Arq | [index.html:21](index.html#L21) | `og:image` es ruta relativa (`/hero.webp`). Confirmado en `dist/index.html:21` tras build: la ruta sigue siendo relativa en el HTML servido. WhatsApp, LinkedIn y Slack no resuelven rutas relativas para preview — el link que HEBA manda por su propio canal de contacto llega sin imagen. | Cambiar a URL absoluta: `https://<dominio-de-producción>/hero.webp`. Agregar también `og:image:width="1672"`, `og:image:height="941"` y `og:url` (ausente). |
| Crítico | UX/Arq | [Contact.css:196](src/components/Contact.css#L196) | `.form__status` (el mensaje "Listo, te respondemos..." o el de error) usa `color: var(--bone-3)`. `#6a6a64` sobre `#08090a` da **3.66:1** — reprueba AA (4.5:1) para texto normal. Es el feedback de la única conversión real de la página: alguien con baja visión no sabe si el lead se envió. | Cambiar a `var(--bone-2)` (`#9a9992`, 6.97:1 sobre `--ink`, ya definida en el sistema — cero costo de diseño nuevo). |
| Crítico | Arq | [dist/index.html:27](dist/index.html#L27) (generado desde [main.tsx](src/main.tsx)) | `<div id="root"></div>` vacío confirmado en el build de producción — es CSR puro, sin prerender ni SSR. Un crawler que no ejecute JS (bots de preview de LinkedIn/Slack, muchos scrapers, indexadores que no sean Googlebot) ve una página en blanco: sin hero, sin servicios, sin el caso de Acabados y Estilos en Madera. Google sí ejecuta JS pero en una segunda pasada de indexación con presupuesto limitado — no es gratis, es una cola. | Ruta de menor fricción: agregar un paso de prerender post-build con Puppeteer contra `vite preview`, sin migrar a un framework SSR. Ver diff concreto abajo en "Arreglos". |
| Alto | Mkt | [index.html:9](index.html#L9) | `<title>HEBA. Lo que hoy haces a mano, automatizado.</title>` no tiene categoría ni ciudad — no compite por "desarrollo de software Medellín" ni "automatización de procesos Medellín". | Ver alternativas en la sección de arreglos. |
| Alto | Arq | [index.html:15-23](index.html#L15-L23) | Falta `og:url`, `canonical`, y no hay `<script type="application/ld+json">` con `Organization`/`LocalBusiness` (dirección Medellín, que sí aparece como texto en [Contact.tsx:97](src/components/Contact.tsx#L97) pero no como dato estructurado). `twitter:card` está pero sin `twitter:title/description/image`. | Agregar los tres. Diff concreto abajo. |
| Alto | Arq/Mkt | [Services.tsx:9,15,21](src/components/Services.tsx#L9-L21) | Las tres imágenes de "peek" al pasar el mouse por cada servicio son URLs hotlinkeadas a `images.rawpixel.com` (decodifiqué las rutas: son fotos de stock genéricas, no material propio). Riesgo real: rawpixel puede romper el hotlink cuando quiera, no hay `preconnect`, y el primer hover trae latencia de un dominio externo que anula el efecto de seguimiento suave que el propio código en [Services.tsx:57-61](src/components/Services.tsx#L57-L61) se toma el trabajo de construir con `requestAnimationFrame`. Y en marca: es la única sección del sitio que usa imaginería genérica, justo al lado de un `Work.tsx` que se jacta de no inventar nada. | Autoalojar 3 fotos reales del estudio (o del proceso real con clientes) en `/public`, mismo tratamiento de `object-fit`. |
| Alto | Arq | [App.tsx:64-90](src/App.tsx#L64-L90) | `react-router-dom` completo para manejar, en la práctica, una sola ruta real (`/`) más 4 redirects estáticos a anclas. El código de las 4 rutas legacy es lógica que corre en el cliente y depende de que el JS cargue para redirigir. | Mover `LEGACY_ROUTES` a `redirects` en `vercel.json` (301 reales, en el edge, funcionan sin JS) y sacar la dependencia de `react-router-dom` del bundle. |
| Alto | UX | [Loader.tsx:6](src/components/Loader.tsx#L6), [Loader.tsx:19-66](src/components/Loader.tsx#L19-L66) | Cortina de entrada con tope duro de 2.2s, sin `sessionStorage` ni ningún mecanismo para saltarla en visitas repetidas dentro de la misma sesión — se repite en cada carga dura. El propio comentario en [Focus.tsx:24-26](src/components/Focus.tsx#L24-L26) describe exactamente este problema ("impresionaba la primera vez y cansaba siempre") hablando de una sección vieja que ya se sacó — el Loader tiene hoy el mismo defecto que el sitio ya identificó y corrigió en otro lado. | Guardar un flag en `sessionStorage` tras el primer `is-ready` y saltar la cortina (o recortarla a algo simbólico) en navegaciones siguientes de la misma sesión. |
| Medio | Arq | [Navbar.css:27-34](src/components/Navbar.css#L27-L34) | La cápsula flotante del navbar transiciona `max-width`, `height` y `padding` — propiedades que disparan layout — en vez de solo `transform`/`opacity`. Se dispara una sola vez por cruce de umbral de scroll (no en cada frame), así que el impacto real es bajo, pero es evitable. | Reemplazar por un contenedor de tamaño fijo con `transform: scale()` o aceptarlo conscientemente (es baja frecuencia). |
| Medio | Arq | [Loader.css:37-38](src/components/Loader.css#L37-L38), [Loader.tsx:76](src/components/Loader.tsx#L76) | La barra de progreso anima `width` vía estilo inline actualizado en cada frame de `requestAnimationFrame` desde React state. `width` es layout; `transform: scaleX()` no lo es. | `transform: scaleX(pct/100)` con `transform-origin: left` en vez de `width`. |
| Medio | Mkt | [Products.tsx:26](src/components/Products.tsx#L26), [Products.tsx:136-143](src/components/Products.tsx#L136-L143) | El CTA "Ver Rave" saca al visitante del sitio hacia `raverp.store` en pestaña nueva. Alguien evaluando "¿le confío mi operación a HEBA?" puede irse a mirar Rave y no volver — es el único CTA de toda la página que no es un canal de contacto ni un ancla interna. | No es necesariamente un error (Rave es la prueba más fuerte que tienen), pero vale la pena medir la tasa de retorno o al menos loguear el click como evento antes de decidir si se deja así. |
| Medio | Mkt | [Services.tsx:7](src/components/Services.tsx#L7) | "Sistemas construidos alrededor de cómo trabaja tu equipo, no al revés." Cualquier estudio de software del planeta firma esta frase sin cambiar una palabra — es el cliché número uno del rubro. Contrasta fuerte con el resto de la copy, que es específica. | Reescritura abajo. |
| Medio | Mkt | Página completa | No hay una sola cara ni un nombre humano en todo el sitio — ni en el footer, ni en contacto, ni en el caso de trabajo. Para un dueño que va a "entregar la operación regada entre Excel, WhatsApp y la cabeza de dos personas", confiarle eso a un estudio sin rostro es un salto más grande que a uno con un nombre detrás. | Sumar quién responde el WhatsApp — no hace falta una sección "Equipo" completa, alcanza con un nombre en el bloque de contacto. |
| Medio | Arq | ausente en `public/` | No hay `robots.txt` ni `sitemap.xml`. Para un sitio de una sola página real el impacto es bajo, pero es la deuda técnica de SEO más barata de pagar que existe. | Agregar los dos archivos estáticos a `public/`. |
| Cosmético | Arq | [Hero.tsx:108](src/components/Hero.tsx#L108) | `srcSet` del hero solo define 1024w y 1672w. En monitores de 2560px+ con `sizes="100vw"` el navegador sirve el de 1672w escalado hacia arriba. | Agregar un tercer breakpoint (~2400w) si el peso lo justifica; impacto visual menor dado que es una foto con textura, no crítico. |
| Cosmético | Arq | `<head>` de [index.html](index.html) | Sin `apple-touch-icon` ni `manifest.json` — solo `favicon.svg`. Irrelevante para SEO/rendimiento, relevante si alguien guarda el sitio en el home screen de un iPhone (ícono genérico). | Agregar `apple-touch-icon.png` 180×180. |
| Cosmético | Mkt | [index.html:12](index.html#L12) vs [index.html:19](index.html#L19) | `meta description` menciona Medellín, `og:description` no — mismo mensaje, dos versiones ligeramente distintas sin razón aparente. | Unificar el texto entre ambas. |

---

## Los 5 arreglos con mejor relación impacto/esfuerzo

**1. `og:image` absoluta.** Una línea.
```html
<!-- index.html:21 -->
<meta property="og:image" content="https://TU-DOMINIO/hero.webp" />
<meta property="og:image:width" content="1672" />
<meta property="og:image:height" content="941" />
<meta property="og:url" content="https://TU-DOMINIO/" />
```

**2. Contraste del mensaje de estado del formulario.** Una línea.
```css
/* Contact.css:196 */
.form__status {
  color: var(--bone-2); /* antes: var(--bone-3) */
}
```

**3. `<title>` con categoría y ciudad.** Tres opciones, de menos a más sacrificio de marca:
- `HEBA. Software a medida y automatización en Medellín.` *(recomendada: conserva el ritmo del título actual, agrega las dos palabras que faltan)*
- `HEBA — Desarrollo de software, IA y automatización en Medellín`
- `Desarrollo de software a medida en Medellín | HEBA` *(la más agresiva en SEO, la que más sacrifica voz de marca)*

**4. Redirects legacy al edge de Vercel, sacar `react-router-dom`.**
```json
// vercel.json
{
  "redirects": [
    { "source": "/nosotros", "destination": "/#enfoque", "permanent": true },
    { "source": "/servicios", "destination": "/#servicios", "permanent": true },
    { "source": "/contacto", "destination": "/#contacto", "permanent": true },
    { "source": "/faq", "destination": "/#contacto", "permanent": true }
  ],
  "crons": [{ "path": "/api/keepalive", "schedule": "0 9 * * 1" }]
}
```
Esto deja `App.tsx` como un simple `<Home />` sin `<Router>`, sin `<Routes>`, sin la dependencia entera de `react-router-dom` en el bundle del cliente.

**5. JSON-LD `LocalBusiness`.** Bloque nuevo en `index.html`, antes de `</head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "HEBA",
  "url": "https://TU-DOMINIO/",
  "email": "hebatechsoft@gmail.com",
  "address": { "@type": "PostalAddress", "addressLocality": "Medellín", "addressCountry": "CO" }
}
</script>
```

---

## Reescritura de copy

**[Services.tsx:7](src/components/Services.tsx#L7) — cliché de agencia, cualquier competidor la firma:**

> Actual: *"Sistemas construidos alrededor de cómo trabaja tu equipo, no al revés. Empezamos entendiendo la operación real antes de escribir una línea de código."*

> Alternativa: *"Nos sentamos con la persona que hoy hace el trabajo, no con quien lo aprueba desde arriba. Ahí sale el alcance — no de una plantilla."*
>
> (Reusa la lógica exacta de [Focus.tsx:6](src/components/Focus.tsx#L6): "Nos sentamos con quien hace el trabajo hoy" — esa frase YA existe en el sitio y es específica; la de Servicios la diluye. Considerá directamente eliminar la oración genérica de Services.tsx y dejar que la nota "No hacemos IA para poder decir que hacemos IA" cargue el peso, que es la línea que sí funciona.)

**Nota sobre el resto de la copy:** no encontré más bloques que califiquen como "promesa que no podés sostener" o "genérica" — el resto pasa la prueba de "¿lo firmaría un competidor sin cambiar nada?" porque está anclado a detalles verificables (precio de Rave, semanas de Focus, el caso de Acabados y Estilos en Madera). Es la excepción, no la regla — no hace falta reescribir lo que ya funciona.

---

## Deuda estructural

- **Todo el copy vive hardcodeado dentro de los componentes** (`PRODUCTS` en [Products.tsx](src/components/Products.tsx), `SERVICES` en [Services.tsx](src/components/Services.tsx), `PHRASES` en [Voices.tsx](src/components/Voices.tsx), `TOPICS`/`NEXT_STEPS` en [Contact.tsx](src/components/Contact.tsx)). Razonable hoy. Con Heba ERP por lanzar y Heba Barber por completar, cada ajuste de copy durante esos lanzamientos va a requerir un PR y un deploy — no hay capa de contenido separada. El propio comentario en [Products.tsx:86](src/components/Products.tsx#L86) ("cuando aparezca el tercero, la rejilla crece sola") muestra que ya lo tienen presente para el layout; no está resuelto para el contenido.
- **Los tres hooks a medida (`useReveal`, `useSplitLines`, `useSplitFill`) hacen cirugía de DOM real** — reconstruyen `innerHTML`, envuelven palabras en spans, caminan la cadena de `offsetParent`. Están bien documentados y son necesarios para el efecto visual que diferencia a este sitio, pero acoplan cualquier titular nuevo a la disciplina exacta de clases (`data-split`, `.hand`, `.ln`) y a condiciones de carrera de fuentes/resize ya reconocidas en los propios comentarios. Sumar una sección con un patrón de titular distinto en seis meses exige entender los tres hooks primero.
- **Cero tests**, ni siquiera para [`leadValidation.ts`](src/lib/leadValidation.ts), que es exactamente el tipo de función pura barata de testear y cara de romper en silencio — un regex de email mal tocado rechaza leads reales sin que nadie se entere hasta que alguien se queje.
- **Ningún test end-to-end del formulario contra `/api/leads`** — la validación está duplicada a propósito entre cliente y servidor (bien hecho, reusan `validateLead`), pero nada verifica que el contrato entre ambos siga alineado si uno cambia sin el otro.

---

## Lo que ya está bien — sin relleno

- La disciplina de "no inventar prueba" es real y se sostiene en el código, no solo en el copy: [Voices.tsx](src/components/Voices.tsx) etiqueta explícitamente sus frases como no-testimonios, y [Work.tsx](src/components/Work.tsx) usa un caso real con cliente nombrado y permiso ("Caso real, publicado con permiso del cliente", [Work.tsx:39-41](src/components/Work.tsx#L39-L41)).
- La escala tipográfica es real, no decorativa: hero h1 hasta 108px, h2 hasta 82px, h2--md hasta 54px, lead ~18px, body ~15.5px, eyebrow mono 10.5px — hay salto de peso genuino entre niveles ([global.css:245-281](src/styles/global.css#L245-L281)).
- `supabase-js` y `resend` (dependencias de servidor) NO terminan en el bundle del cliente — confirmado grepeando el JS final del build. Buena separación cliente/servidor.
- `font-display: swap` está aplicado correctamente en las tres familias autoalojadas — sin FOIT, confirmado en el CSS del build.
- Las dimensiones reales de cada imagen (parseadas del header WebP) coinciden con los atributos `width`/`height` del código — sin CLS por asincronía imagen/markup.
