import './ProductPreview.css';

type Column = { key: string; label: string; align?: 'right' };
type Row = Record<string, { text: string; tone?: 'ok' | 'low' | 'mute'; mono?: boolean }>;

export type PreviewData = {
  title: string;
  shortcut: [string, string];
  /** Barra lateral. Si se omite, la vista va a ancho completo. */
  sidebar?: { group: string; items: { label: string; active?: boolean }[] }[];
  search?: string;
  columns: Column[];
  rows: Row[];
  footer: [string, string];
};

/**
 * Vista previa de interfaz de un producto.
 *
 * NO es una captura falsa: es una version chica del componente real,
 * construida con los mismos tokens de la pagina, que es la salida que la
 * guia de diseno admite para mostrar producto propio.
 *
 * Los datos son de ejemplo y deliberadamente modestos. Sin indicadores de
 * actividad en vivo ("actualizado hace 2 min" y similares): eso seria
 * fingir un uso que todavia no existe.
 *
 * REEMPLAZAR por capturas reales cuando los productos entren en produccion.
 */
const ProductPreview = ({ data }: { data: PreviewData }) => (
  <div className={`ui ${data.sidebar ? '' : 'ui--flat'}`} aria-hidden="true">
    <div className="ui__bar">
      <span className="ui__tl">
        <i />
        <i />
        <i />
      </span>
      <span className="ui__title">{data.title}</span>
      <span className="ui__key">
        <kbd>{data.shortcut[0]}</kbd>
        <kbd>{data.shortcut[1]}</kbd>
      </span>
    </div>

    <div className="ui__body">
      {data.sidebar && (
        <div className="ui__side">
          {data.sidebar.map((group) => (
            <div key={group.group}>
              <div className="ui__grp">{group.group}</div>
              {group.items.map((item) => (
                <span key={item.label} className={`ui__nav ${item.active ? 'is-on' : ''}`}>
                  {item.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="ui__main">
        {data.search && <div className="ui__search">{data.search}</div>}

        <table className="ui__tbl">
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th key={col.key} style={col.align === 'right' ? { textAlign: 'right' } : undefined}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, i) => (
              <tr key={i}>
                {data.columns.map((col) => {
                  const cell = row[col.key];
                  return (
                    <td
                      key={col.key}
                      className={cell?.mono ? 'ui__mono' : undefined}
                      style={col.align === 'right' ? { textAlign: 'right' } : undefined}
                    >
                      {cell &&
                        (cell.tone !== undefined ? (
                          <span className={`ui__tag ui__tag--${cell.tone}`}>{cell.text}</span>
                        ) : (
                          cell.text
                        ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ui__foot">
          <span>{data.footer[0]}</span>
          <span>{data.footer[1]}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProductPreview;
