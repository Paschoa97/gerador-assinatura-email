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

  // Remove tudo que não for número do WhatsApp
  const whatsappNumeros = whatsapp.replace(/\D/g, "");

  // Adiciona DDI 55 se não existir
  const whatsappFormatado = whatsappNumeros.startsWith("55")
    ? whatsappNumeros
    : "55" + whatsappNumeros;

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

            <span style="color:#2C9098;">E-mail:</span> 
            <a href="mailto:${email}" style="color:#23bbbe; text-decoration:none;">
              ${email}
            </a><br>

            <span style="color:#2C9098;">WhatsApp:</span> 
            <a href="https://wa.me/${whatsappFormatado}" style="color:#23bbbe; text-decoration:none;">
              ${whatsapp}
            </a><br>

            <span style="color:#2C9098;">Site:</span> 
            <a href="https://kikker.com.br" style="color:#23bbbe; text-decoration:none;">
              kikker.com.br
            </a><br><br>

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
