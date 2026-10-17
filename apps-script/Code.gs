const CONFIG = {
  spreadsheetId: '1TGnd3TBs_56N0wp844f-K8KkFU50UVk7_eB8nZ20x_o',
  sheetName: 'Leads',
  notificationEmail: 'sales@byte-weavers.com',
  formKey: 'byte-weavers-contact-v1'
};

function doPost(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};

    // Quietly accept obvious bot submissions without storing them.
    if (String(p._gotcha || '').trim() !== '') {
      return jsonResponse({ ok: true });
    }

    if (String(p.formKey || '') !== CONFIG.formKey) {
      return jsonResponse({ ok: false, error: 'Invalid form submission.' });
    }

    const name = cleanCell(p.name, 150);
    const email = cleanCell(p.email, 254);
    const phone = cleanCell(p.phone, 80);
    const skype = cleanCell(p.skype, 120);
    const subject = cleanCell(p.subject, 200);
    const inquiryFor = cleanCell(p.inquiryFor, 200);
    const message = cleanCell(p.message, 5000);
    const sourcePage = cleanCell(p.sourcePage, 500);

    if (!name || !email || !message) {
      return jsonResponse({ ok: false, error: 'Name, email and message are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.replace(/^'/, ''))) {
      return jsonResponse({ ok: false, error: 'Please enter a valid email address.' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    let rowNumber;
    try {
      const ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
      const sheet = ss.getSheetByName(CONFIG.sheetName);
      if (!sheet) throw new Error('Leads sheet not found.');

      sheet.appendRow([
        new Date(),
        name,
        email,
        phone,
        skype,
        subject,
        inquiryFor,
        message,
        sourcePage,
        'New',
        ''
      ]);
      rowNumber = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    // Email is a convenience notification. The Google Sheet is the source of truth,
    // so a temporary mail quota/problem must not lose a submitted lead.
    try {
      const plainBody = [
        'New Byte Weavers website inquiry',
        '',
        `Name: ${stripFormulaGuard(name)}`,
        `Email: ${stripFormulaGuard(email)}`,
        `Phone: ${stripFormulaGuard(phone)}`,
        `Skype: ${stripFormulaGuard(skype)}`,
        `Subject: ${stripFormulaGuard(subject)}`,
        `Interested In: ${stripFormulaGuard(inquiryFor)}`,
        `Source Page: ${stripFormulaGuard(sourcePage)}`,
        '',
        'Message:',
        stripFormulaGuard(message)
      ].join('\n');

      const htmlBody = `
        <h2>New Byte Weavers website inquiry</h2>
        <table cellpadding="6" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#ddd">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(stripFormulaGuard(name))}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(stripFormulaGuard(email))}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(stripFormulaGuard(phone))}</td></tr>
          <tr><td><strong>Skype</strong></td><td>${escapeHtml(stripFormulaGuard(skype))}</td></tr>
          <tr><td><strong>Subject</strong></td><td>${escapeHtml(stripFormulaGuard(subject))}</td></tr>
          <tr><td><strong>Interested In</strong></td><td>${escapeHtml(stripFormulaGuard(inquiryFor))}</td></tr>
          <tr><td><strong>Source Page</strong></td><td>${escapeHtml(stripFormulaGuard(sourcePage))}</td></tr>
        </table>
        <p><strong>Message</strong></p>
        <p>${escapeHtml(stripFormulaGuard(message)).replace(/\n/g, '<br>')}</p>
      `;

      MailApp.sendEmail({
        to: CONFIG.notificationEmail,
        subject: `New website inquiry${subject ? ': ' + stripFormulaGuard(subject) : ''}`,
        body: plainBody,
        htmlBody: htmlBody,
        name: 'Byte Weavers Website'
      });
    } catch (mailError) {
      try {
        const ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
        const sheet = ss.getSheetByName(CONFIG.sheetName);
        if (sheet && rowNumber) {
          sheet.getRange(rowNumber, 11).setValue('Saved successfully; email notification failed.');
        }
      } catch (_) {}
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Byte Weavers contact form endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function cleanCell(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength || 5000);
  // Prevent spreadsheet-formula injection when untrusted form text is written to Sheets.
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function stripFormulaGuard(value) {
  const text = String(value == null ? '' : value);
  return text.startsWith("'") ? text.slice(1) : text;
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
