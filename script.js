const CLOUD_NAME = "diplkddku";
const UPLOAD_PRESET = "Assinatura";

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

  const file = fotoInput.files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Feedback visual simples
  document.getElementById("preview").innerHTML = "Enviando imagem...";

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {

      if (!data.secure_url) {
        throw new Error("Upload falhou.");
      }

      const fotoURL = data.secure_url;

      const whatsappNumeros = whatsapp.replace(/\D/g, "");
      const whatsappFormatado = whatsappNumeros.startsWith("55")
        ? whatsappNumeros
        : "55" + whatsappNumeros;

      const assinaturaHTML =
        '<table cellpadding="0" cellspacing="0" style="font-family:Open Sans, Arial, sans-serif; font-size:13px; color:#5b5b5b;">' +
          '<tr>' +
            '<td style="padding:10px 0;">' +
              '<table cellpadding="0" cellspacing="0">' +
                '<tr>' +
                  '<td style="padding-right:14px; vertical-align:top;">' +
                    '<img src="' + fotoURL + '" width="80" style="border-radius:50%;">' +
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
    })
    .catch(error => {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar a imagem. Verifique sua conexão e tente novamente.");
      document.getElementById("preview").innerHTML = "";
    });
}

function copiarAssinatura() {
  const preview = document.getElementById("preview");

  if (!preview.innerHTML || preview.innerHTML === "Enviando imagem...") {
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
