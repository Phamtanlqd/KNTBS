const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Submissions';

function setup() {
  if (SPREADSHEET_ID === 'PASTE_SPREADSHEET_ID_HERE') {
    throw new Error('Hãy thay SPREADSHEET_ID bằng ID Google Sheet trước khi chạy setup().');
  }
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['timestamp','id','studentName','studentClass','studentGroup','evidenceURL','reflection','usb','bluetooth','caseSummary','projectSummary','payloadJSON']);
    sheet.setFrozenRows(1);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!String(data.studentName || '').trim() || !String(data.studentClass || '').trim()) {
      return json({ok:false, error:'Thiếu họ tên hoặc lớp.'});
    }
    if (!data.confirmation) return json({ok:false, error:'Chưa xác nhận tính trung thực.'});
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['timestamp','id','studentName','studentClass','studentGroup','evidenceURL','reflection','usb','bluetooth','caseSummary','projectSummary','payloadJSON']);
      sheet.setFrozenRows(1);
    }
    const id = Utilities.getUuid();
    const timestamp = new Date().toISOString();
    const safeURL = validHttpUrl(data.evidenceURL) ? data.evidenceURL : '';
    sheet.appendRow([
      timestamp, id, clean(data.studentName), clean(data.studentClass), clean(data.studentGroup),
      safeURL, clean(data.reflection), clean(data.lab && data.lab.usb), clean(data.lab && data.lab.bluetooth),
      clean(JSON.stringify(data.case || {})), clean(JSON.stringify(data.project || {})),
      JSON.stringify(data)
    ]);
    return json({ok:true,id:id,timestamp:timestamp});
  } catch (err) {
    return json({ok:false,error:String(err)});
  }
}

function doGet() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet || sheet.getLastRow() < 2) return json({submissions:[]});
    const values = sheet.getDataRange().getValues();
    const headers = values.shift();
    const rows = values.map(row => {
      const o = {};
      headers.forEach((h,i) => o[h] = row[i]);
      return {
        timestamp: o.timestamp,
        id: o.id,
        studentName: o.studentName,
        studentClass: o.studentClass,
        studentGroup: o.studentGroup,
        evidenceURL: o.evidenceURL
      };
    });
    return json({submissions:rows});
  } catch (err) {
    return json({submissions:[],error:String(err)});
  }
}

function clean(value) {
  let s = value == null ? '' : String(value);
  // Prevent spreadsheet formula injection for user-provided values.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s.substring(0, 12000);
}
function validHttpUrl(value) {
  try { const u = new URL(String(value)); return u.protocol === 'https:' || u.protocol === 'http:'; }
  catch (e) { return false; }
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
