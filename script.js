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

const assinaturaHTML =
'<table cellpadding="0" cellspacing="0" style="font-family:Open Sans, Arial, sans-serif; font-size:13px; color:#5b5b5b;">' +
  '<tr>' +
    '<td style="padding:10px 0;">' +
      '<table cellpadding="0" cellspacing="0">' +
        '<tr>' +
          '<td style="padding-right:14px; vertical-align:top;">' +
            '<img src="' + fotoBase64 + '" width="80" style="border-radius:50%;">' +
          '</td>' +
          '<td style="vertical-align:top;">' +

            '<div style="font-size:15px; font-weight:700; color:#2C9098;">' + nome + '</div>' +
            '<div style="font-size:13px; color:#5b5b5b; margin-bottom:8px;">' + cargo + '</div>' +

            '<div style="font-size:12px; color:#5b5b5b;">' +
              '<a href="mailto:' + email + '" style="color:#5b5b5b; text-decoration:none;">' + email + '</a>' +
              ' | ' +
              '<a href="https://wa.me/' + whatsappFormatado + '" style="color:#23bbbe; text-decoration:none;">' + whatsapp + '</a>' +
              ' | ' +
              '<a href="https://kikker.com.br" style="color:#23bbbe; text-decoration:none;">kikker.com.br</a>' +
            '</div>' +

            '<div style="margin-top:10px;">' +
              '<img src="assets/logo.png" width="110">' +
            '</div>' +

          '</td>' +
        '</tr>' +
      '</table>' +
    '</td>' +
  '</tr>' +
'</table>';

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
