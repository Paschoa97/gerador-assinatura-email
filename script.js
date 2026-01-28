function gerarAssinatura() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const fotoInput = document.getElementById("foto");

  if (!fotoInput.files[0]) {
    alert("Por favor, envie uma foto.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const fotoBase64 = e.target.result;

    const assinaturaHTML = `
      <table cellpadding="0" cellspacing="0" style="font-family: Arial; font-size: 12px;">
        <tr>
          <td style="padding-right:10px;">
            <img src="${fotoBase64}" width="100" style="border-radius:50%;">
          </td>
          <td>
            <strong>${nome}</strong><br>
            ${cargo}<br><br>
            📧 ${email}<br>
            📱 ${whatsapp}<br><br>
            <img src="assets/logo.png" width="120">
          </td>
        </tr>
      </table>
    `;

    document.getElementById("preview").innerHTML = assinaturaHTML;
  };

  reader.readAsDataURL(fotoInput.files[0]);
}

function copiarAssinatura() {
  const preview = document.getElementById("preview");

  if (!preview.innerHTML) {
    alert("Gere a assinatura primeiro.");
    return;
  }

  const range = document.createRange();
  range.selectNode(preview);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");
  alert("Assinatura copiada! Cole no seu e-mail.");
}

