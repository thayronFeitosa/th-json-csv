export const csvConverter = (json, fileName ) => {
  if (json.length === 0 || json === null || json.length === undefined) return [];
  const fields = Object.keys(json[0]);
  const replacer = function (key, value) {
    return value === null ? '' : value;
  };

  let csv = json.map(function (row) {
    return fields.map(function (field) {
      return JSON.stringify(row[field], replacer);
    }).join(',');
  });

  csv.unshift(fields.join(',')); // add header column
  csv = csv.join('\r\n');

  const blob = new Blob(['\ufeff', csv], { type: 'application/csv' });
  downloadFile(blob, (fileName !== undefined ? (fileName + '.csv') : 'download.csv'));
  return csv;
};

function downloadFile(blob, fileName) {
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;
  a.download = fileName;

  a.click();
}
