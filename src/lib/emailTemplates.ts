const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

type AutoReplyInput = {
  name: string;
  message: string;
  whatsappUrl: string;
};

/**
 * Mismo HTML que el artifact de la plantilla, con nombre/mensaje del lead
 * escapados: son texto libre que escribe cualquiera en el formulario.
 */
export const buildAutoReplyEmail = ({ name, message, whatsappUrl }: AutoReplyInput) => {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ya está con nosotros</title>
</head>
<body style="margin:0; padding:0; background:#e9e7e2; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
    En menos de 24 horas hábiles te escribe una persona del equipo, no un formulario.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9e7e2; padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 1px 2px rgba(20,23,26,0.06);">

          <tr>
            <td style="background:#08090a; padding:28px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="6" width="5" height="20" fill="#f0ede8"/>
                      <rect x="21" y="6" width="5" height="20" fill="#f0ede8"/>
                      <rect x="11" y="13.5" width="10" height="5" fill="#8fb09a"/>
                    </svg>
                  </td>
                  <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-weight:700; font-size:15px; letter-spacing:-0.04em; color:#f0ede8; vertical-align:middle;">
                    HEBA
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:40px 36px 0;">
              <p style="margin:0 0 10px; font-family:ui-monospace,Consolas,monospace; font-size:10.5px; letter-spacing:0.14em; text-transform:uppercase; color:#3e6b4f; font-weight:600;">
                Mensaje recibido
              </p>
              <p style="margin:0; font-size:27px; line-height:1.2; font-weight:600; color:#14171a; letter-spacing:-0.02em;">
                Ya está con nosotros.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 36px 0;">
              <p style="margin:0; font-size:15.5px; line-height:1.6; color:#3a3a35;">
                Hola, ${safeName}. Ya leímos esto: <span style="color:#56564e; font-style:italic;">"${safeMessage}"</span>. En menos de <span style="color:#14171a; font-weight:600;">24 horas hábiles</span> te responde una persona del equipo, directo, no un formulario.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 36px 0;">
              <p style="margin:0 0 14px; font-family:ui-monospace,Consolas,monospace; font-size:10.5px; letter-spacing:0.12em; text-transform:uppercase; color:#85837b;">
                Qué pasa después
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:11px; vertical-align:top; width:24px; font-family:ui-monospace,Consolas,monospace; font-size:11.5px; color:#3e6b4f;">01</td>
                  <td style="padding-bottom:11px; font-size:14px; line-height:1.55; color:#3a3a35;">Te respondemos en menos de 24 horas hábiles. Siempre una persona, nunca un formulario automático.</td>
                </tr>
                <tr>
                  <td style="padding-bottom:11px; vertical-align:top; width:24px; font-family:ui-monospace,Consolas,monospace; font-size:11.5px; color:#3e6b4f;">02</td>
                  <td style="padding-bottom:11px; font-size:14px; line-height:1.55; color:#3a3a35;">Media hora de llamada para entender qué se hace hoy a mano y cuánto tiempo cuesta.</td>
                </tr>
                <tr>
                  <td style="vertical-align:top; width:24px; font-family:ui-monospace,Consolas,monospace; font-size:11.5px; color:#3e6b4f;">03</td>
                  <td style="font-size:14px; line-height:1.55; color:#3a3a35;">Si podemos ayudarte, te pasamos alcance y precio cerrado.</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:999px; background:#3e6b4f;">
                    <a href="${whatsappUrl}" style="display:inline-block; padding:13px 26px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:#fcfbf8; text-decoration:none;">
                      Hablar ya por WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 36px 30px;">
              <div style="height:1px; background:#e4e0d7; margin-bottom:20px;"></div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                <tr>
                  <td style="padding-right:14px;">
                    <a href="https://www.instagram.com/hebatechsoft" style="display:inline-block;">
                      <img src="https://cdn.simpleicons.org/instagram/85837B" width="16" height="16" alt="Instagram" style="display:block;">
                    </a>
                  </td>
                  <td>
                    <a href="https://www.facebook.com/profile.php?id=61587193170655" style="display:inline-block;">
                      <img src="https://cdn.simpleicons.org/facebook/85837B" width="16" height="16" alt="Facebook" style="display:block;">
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0; font-size:13px; line-height:1.6; color:#85837b;">
                - Heba ·
                <a href="mailto:hebatechsoft@gmail.com" style="color:#85837b;">hebatechsoft@gmail.com</a>
                ·
                <a href="https://www.hebatech.cloud" style="color:#85837b;">hebatech.cloud</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
