function gerarAssinatura() {
  const nome = document.getElementById("nome").value;
  const cargo = document.getElementById("cargo").value;
  const email = document.getElementById("email").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const fotoInput = document.getElementById("foto");

  if (!nome || !cargo || !email || !whatsapp) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!fotoInput.files || !fotoInput.files[0]) {
    alert("Selecione uma foto.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const fotoBase64 = e.target.result;

    const assinaturaHTML = `
<table cellpadding="0" cellspacing="0" style="font-family:'Open Sans', Arial, sans-serif; font-size:13px; color:#5b5b5b;">
  <tr>
    <td style="border-left:5px solid #23bbbe; padding-left:15px;">
      <table cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:12px;">
            <img src="${fotoBase64}" width="90" style="border-radius:50%;">
          </td>
          <td>
            <strong style="font-size:15px; color:#2C9098;">${nome}</strong><br>
            <span style="color:#5b5b5b;">${cargo}</span><br><br>

            <span style="color:#2C9098;">E-mail:</span> ${email}<br>
            <span style="color:#2C9098;">WhatsApp:</span> ${whatsapp}<br><br>

            <img src="assets/logo.png" width="120">
          </td>
        </tr>
      </table>
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
  alert("Assinatura copiada com sucesso! Cole no seu e-mail.");
}
