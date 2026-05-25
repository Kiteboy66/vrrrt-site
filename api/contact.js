const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, store, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'Vrrrt Support <support@vrrrt.com>',
      to: 'jcbschoeman@gmail.com',
      replyTo: email,
      subject: `Support request from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
          <h2 style="font-size: 20px; margin: 0 0 24px; color: #0A0A0B;">New support request</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #3F3F46;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7; font-weight: 600; width: 110px; color: #71717A; text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7; color: #0A0A0B;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7; font-weight: 600; color: #71717A; text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7;"><a href="mailto:${escapeHtml(email)}" style="color: #00C25A;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7; font-weight: 600; color: #71717A; text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px;">Store</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E4E4E7; color: #0A0A0B;">${store ? escapeHtml(store) : '<span style="color:#A1A1AA">—</span>'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <div style="font-weight: 600; color: #71717A; text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; margin-bottom: 10px;">Message</div>
            <div style="background: #fff; border: 1px solid #E4E4E7; border-radius: 8px; padding: 16px; font-size: 15px; color: #0A0A0B; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E4E4E7; font-size: 12px; color: #A1A1AA; font-family: 'Courier New', monospace;">
            Sent via vrrrt.com/support
          </div>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
