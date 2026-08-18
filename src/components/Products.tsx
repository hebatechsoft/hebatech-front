import { ArrowRight } from '@phosphor-icons/react';
import ProductPreview, { type PreviewData } from './ProductPreview';
import './Products.css';

type Product = {
  name: string;
  state: string;
  /** Producto ya publicado: pinta el estado en el acento y enlaza afuera. */
  live?: boolean;
  /** Destino del CTA. Externo si el producto ya tiene sitio propio. */
  href: string;
  blurb: string;
  specs: string[];
  cta: string;
  preview: PreviewData;
};

const PRODUCTS: Product[] = [
  {
    name: 'Rave',
    state: 'En producción',
    live: true,
    href: 'https://raverp.store',
    blurb:
      'Inventario, ventas, cotizaciones y reportes en tiempo real. Ya está en producción, con nueve módulos, desde $10.000 COP al mes y tres días de prueba.',
    specs: ['Inventario inteligente', 'Cuentas por cobrar', 'Cotizaciones y remisiones', 'POS y CRM'],
    cta: 'Ver Rave',
    preview: {
      title: 'Rave · Inventario',
      shortcut: ['⌘', 'K'],
      sidebar: [
        {
          group: 'Operación',
          items: [
            { label: 'Inventario', active: true },
            { label: 'Movimientos' },
            { label: 'Pedidos' },
          ],
        },
        { group: 'Comercial', items: [{ label: 'Facturación' }, { label: 'Reportes' }] },
      ],
      search: 'Buscar referencia',
      columns: [
        { key: 'ref', label: 'Ref' },
        { key: 'desc', label: 'Descripción' },
        { key: 'stock', label: 'Stock', align: 'right' },
        { key: 'estado', label: 'Estado' },
      ],
      rows: [
        {
          ref: { text: '8842', mono: true },
          desc: { text: 'Bota industrial, Norte' },
          stock: { text: '328', mono: true },
          estado: { text: 'En rango', tone: 'ok' },
        },
        {
          ref: { text: '8817', mono: true },
          desc: { text: 'Guante nitrilo, Norte' },
          stock: { text: '1.240', mono: true },
          estado: { text: 'En rango', tone: 'ok' },
        },
        {
          ref: { text: '7702', mono: true },
          desc: { text: 'Casco dieléctrico, Sur' },
          stock: { text: '96', mono: true },
          estado: { text: 'Bajo', tone: 'low' },
        },
        {
          ref: { text: '6431', mono: true },
          desc: { text: 'Botín dieléctrico, Norte' },
          stock: { text: '512', mono: true },
          estado: { text: 'En rango', tone: 'ok' },
        },
      ],
      footer: ['4 referencias', '2 bodegas'],
    },
  },
  {
    name: 'Heba Barber',
    state: 'En construcción',
    href: '#contacto',
    blurb:
      'Turnos, clientes y caja para barberías. Pensado para el mostrador y para el celular, entre corte y corte.',
    specs: ['Agenda con recordatorios', 'Historial por cliente', 'Comisiones por barbero', 'Cierre de caja'],
    cta: 'Quiero probarlo primero',
    preview: {
      title: 'Heba Barber · Hoy',
      shortcut: ['⌘', 'N'],
      columns: [
        { key: 'hora', label: 'Hora' },
        { key: 'cliente', label: 'Cliente' },
        { key: 'estado', label: 'Estado', align: 'right' },
      ],
      rows: [
        {
          hora: { text: '09:00', mono: true },
          cliente: { text: 'Andrés G.' },
          estado: { text: 'Confirmado', tone: 'ok' },
        },
        {
          hora: { text: '09:45', mono: true },
          cliente: { text: 'Juan P.' },
          estado: { text: 'Confirmado', tone: 'ok' },
        },
        {
          hora: { text: '10:30', mono: true },
          cliente: { text: 'Sin reservar' },
          estado: { text: 'Libre', tone: 'mute' },
        },
        {
          hora: { text: '11:15', mono: true },
          cliente: { text: 'Sebastián R.' },
          estado: { text: 'Confirmado', tone: 'ok' },
        },
      ],
      footer: ['3 turnos, 1 libre', 'Caja abierta'],
    },
  },
];

/**
 * Productos propios. Va arriba de Servicios a proposito: es la prueba
 * verificable de que el estudio envia software, y reemplaza a las cifras
 * sin respaldo que tenia el sitio anterior.
 *
 * Rejilla asimetrica de exactamente 2 celdas para exactamente 2 productos.
 * Cuando aparezca el tercero, la rejilla crece sola.
 */
const Products = () => (
  <section className="sec sec--tint" id="productos">
    <div className="wrap">
      <div className="rv">
        <div className="eyebrow prods__eyebrow">Productos propios</div>
        <h2 className="dsp prods__title" data-split>
          No solo construimos para clientes. También operamos lo nuestro.
        </h2>
      </div>

      <div className="prods">
        {PRODUCTS.map((product, i) => (
          <article
            key={product.name}
            className="prod rv"
            style={{ '--d': `${80 + i * 100}ms` } as React.CSSProperties}
          >
            <div className="prod__stage">
              <span className={`prod__state ${product.live ? 'prod__state--near' : ''}`}>
                {product.live && <span className="dot" />}
                {product.state}
              </span>
              <ProductPreview data={product.preview} />
            </div>

            <div className="prod__body">
              <h3>{product.name}</h3>
              <p className="body prod__blurb">{product.blurb}</p>
              <ul className="prod__specs">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
              <div className="prod__foot">
                <a
                  href={product.href}
                  className="btn btn--line btn--sm"
                  {...(product.live ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {product.cta} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Products;
