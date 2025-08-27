const form = document.getElementById('orderForm');
const ordersList = document.getElementById('ordersList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    siparis_no: document.getElementById('siparis_no').value,
    firma: document.getElementById('firma').value,
    urun_kodu: document.getElementById('urun_kodu').value,
    telefon: document.getElementById('telefon').value,
    odeme_alindi: parseFloat(document.getElementById('odeme_alindi').value),
    odeme_alinmadi: parseFloat(document.getElementById('odeme_alinmadi').value)
  };

  await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });

  form.reset();
  fetchOrders();
});

async function fetchOrders() {
  const res = await fetch('http://localhost:3000/orders');
  const data = await res.json();
  ordersList.innerHTML = '';
  data.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${order.siparis_no}</td>
      <td>${order.firma}</td>
      <td>${order.urun_kodu}</td>
      <td>${order.telefon}</td>
      <td>${order.odeme_alindi}</td>
      <td>${order.odeme_alinmadi}</td>
      <td>${new Date(order.tarih).toLocaleString()}</td>
    `;
    ordersList.appendChild(tr);
  });
}

fetchOrders();
setInterval(fetchOrders, 5000); // 5 saniyede bir güncelle
