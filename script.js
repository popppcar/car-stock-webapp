
const API_KEY = "AIzaSyDF5lEzwfaTOO_wAqEsJY8qPEq7S1pkMMA";
const SHEET_ID = "1lnYz2xOWcY-x0_D4c3FrBweJsv1AA8xiG8mJEiolEhM";

function getSheetNameFromURL() {
  const path = window.location.pathname;
  const matches = path.match(/\/view\/(.+)$/);
  return matches ? matches[1] : null;
}

async function fetchSheetData(sheetName) {
  const range = `${sheetName}!B1:H42`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data.values;
}

function renderData(values) {
  const container = document.getElementById("carData");
  container.innerHTML = "";
  values.forEach((row, i) => {
    const html = `
      <div class="card p-4 rounded-xl shadow">
        <p><strong>แถว ${i + 1}</strong></p>
        ${row.map((col, j) => `<p class="text-sm">${col}</p>`).join("")}
      </div>
    `;
    container.innerHTML += html;
  });
}

(async () => {
  const sheetName = getSheetNameFromURL();
  if (!sheetName) {
    document.getElementById("carData").innerHTML = "<p>ไม่พบข้อมูล</p>";
    return;
  }
  try {
    const data = await fetchSheetData(sheetName);
    renderData(data);
  } catch (e) {
    document.getElementById("carData").innerHTML = "<p>โหลดข้อมูลไม่สำเร็จ</p>";
  }
})();
