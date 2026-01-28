function gerarAssinatura() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const fotoInput = document.getElementById("foto");

  if (!fotoInput.files || !fotoInput.files[0]) {
    alert("Selecione uma foto.");
    return;
  }

  const fotoURL = URL.createObjectURL(fotoInput.files[0]);

  const assinaturaHTML = `
    <table cellpadding="0" cellspacing="0" style="font-family: Arial; font-size: 12px;">
      <tr>
        <td style="padding-right:10px;">
          <img src="${fotoURL}" width="100" style="border-radius:50%;">
        </td>
        <td>
          <strong>${nome}</strong><br>
          ${cargo}<br><br>
          Email: ${email}<br>
          WhatsApp: ${whatsapp}<br><br>
          <img src="assets/logo.png" width="140">
        </td>
      </tr>
    </table>
  `;

  document.getElementById("preview").innerHTML = assinaturaHTML;
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
  alert("Assinatura copiada com sucesso!");
}
