---
layout: single
title: Fale comigo
permalink: /fale-comigo
---

<section id="contact-page">
  <header>
    <h1>Fale comigo!</h1>
    <p>Preencha o formulário abaixo com seu nome, email, e a mensagem que você quer mandar para mim. Seja breve, você tem 1024 caracteres para escrever sua mensagem.</p>
  </header>
  <form id="contact-form">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" maxlength="30" placeholder="Seu nome" required />

    <label for="contact">Email</label>
    <input type="email" id="contact" name="contact" maxlength="50" placeholder="nome@email.com" required />

    <label for="message">Mensagem</label>
    <textarea name="message" id="message" maxlength="1024" rows="5" placeholder="Mensagem de envio..." required></textarea>

    <button type="submit" id="send-contact" class="btn primary">Enviar</button>

  </form>
</section>

<script type="text/javascript">
  $(document).ready(function() {
    $('#contact-form').on('submit', (event) => {
      event.preventDefault();
      const submitValue = $('#send-contact').html();
      var values = {
        name: $('#name').val(),
        contact: $('#contact').val(),
        message: $('#message').val(),
      };
      $('#send-contact').html('enviando...');
      sendMessage(values, function(res){
        $('#send-contact').html(submitValue);

        if (res.ok) {
          alert('Recebemos sua mensagem! Obrigado!');
          window.location = '/';
        } else {
          alert('Parece que ocorreu um erro ao enviar seus dados. Você pode tentar enviar em alguns instantes? Obrigado.');
        }
      })
    })
  });
</script>
