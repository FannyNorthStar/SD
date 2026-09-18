/**
 * Google Apps Script — Ask a Coach Archive
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire file, replacing the default code
 * 4. Click Deploy → New deployment
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Click Deploy, authorize when prompted
 * 9. Copy the Web app URL → paste it in Ask a Coach settings
 *
 * The script auto-creates headers on first run.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Session ID',
        'Session Title',
        'Brain Dump',
        'Coach Response',
        'CTFAR Models',
        'Coaching Question',
        'Message Count'
      ]);
      // Bold the header row
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      // Freeze header
      sheet.setFrozenRows(1);
    }

    const data = JSON.parse(e.postData.contents);

    // Handle test pings
    if (data.test) {
      sheet.appendRow([
        new Date().toISOString(),
        'TEST',
        'Connection Test',
        data.message || 'Test ping',
        '', '', '', ''
      ]);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, message: 'Test received' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append session data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.sessionId || '',
      data.sessionTitle || '',
      data.brainDump || '',
      data.coachResponse || '',
      data.ctfarModels || '',
      data.coachingQuestion || '',
      data.messageCount || ''
    ]);

    // Auto-resize columns for readability (optional, can be slow on large sheets)
    // sheet.autoResizeColumns(1, 8);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for web app deployment
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Ask a Coach archive endpoint is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
