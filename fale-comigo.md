---
layout: single
title: Fale comigo
permalink: /fale-comigo
description: Quer entrar em contato com Mr. Caricati? Você pode falar sobre qualquer assunto, sugestões, dúvidas, patrocínio, entre outros. Preencha o formulário e mande sua mensagem para mim.
tags: 
  - contato
  - email
  - meu contato
---

<section id="contact-page">
  <div class="content">
    <header>
      <h1 class="heading-underscore">Fale comigo!</h1>
      <p>Preencha o formulário abaixo com seu nome, email, e a mensagem que você quer mandar para mim.</p>
    </header>
    <form id="contact-form">
      <label for="name">Nome</label>
      <input type="text" id="name" name="name" maxlength="30" placeholder="Seu nome" required />
      <label for="contact">Email</label>
      <input type="email" id="contact" name="contact" maxlength="50" placeholder="nome@email.com" required />
      <label for="message">Mensagem</label>
      <textarea name="message" id="message" maxlength="2048" rows="10" placeholder="Escreva uma mensagem para mim..." required></textarea>
      <p class="counter">
        <span data-counter-from="#message">0</span>/<span>2048</span>
      </p>
      <div class="flex-space-between">
        <button type="submit" id="send-contact" class="btn-skew">
          <span>Enviar</span>
        </button>
      </div>
    </form>
  </div>
  {% include modal-alert.html id="modal-success" jsOnClickFn="hideAlertModal()" title="Mensagem enviada" message="Sua mensagem foi enviada. Fique de olho no seu e-mail que eu posso te responder em breve." %}
  {% include modal-alert.html id="modal-error" jsOnClickFn="hideErrorModal()" title="Erro ao enviar" message="Parece que ocorreu um erro ao enviar seus dados. Você pode tentar enviar em alguns instantes?" %}
</section>

<script src="https://www.google.com/recaptcha/api.js?render=6Lfuv8wtAAAAAEVNQDpLye8OvL3QHtjMBgRNiPDr"></script>
<script type="text/javascript">
  $(document).ready(function() {
    var loading = false;

    $('#contact-form').on('submit', function(event) {
      event.preventDefault();

      if (loading) return;
      loading = true;

      var submitValue = $('#send-contact').html();
      $('#send-contact').html('<span>enviando...</span>');

      // Executa a validação do reCAPTCHA v3
      grecaptcha.ready(function() {
        grecaptcha.execute('6Lfuv8wtAAAAAEVNQDpLye8OvL3QHtjMBgRNiPDr', { action: 'submit' }).then(function(token) {
          var values = {
            name: $('#name').val(),
            contact: $('#contact').val(),
            message: $('#message').val(),
            'g-recaptcha-response': token
          };

          sendMessage(values, function(res) {
            $('#send-contact').html(submitValue);
            loading = false;

            console.log(res)

            if (res && res.ok) {
              $('#modal-success .modal p').html(res.message);
              $('#modal-success').show();
              $('#contact-form')[0].reset(); // Limpa o formulário após o envio com sucesso
            } else {
              $('#modal-error .modal p').html(res.message);
              $('#modal-error').show();
            }
          });

        }).catch(function(error) {
          console.error("Erro no reCAPTCHA:", error);
          $('#send-contact').html(submitValue);
          loading = false;
          $('#modal-error .modal p').html('Erro no reCAPTCHA!');
          $('#modal-error').show();
        });
      });
    });
  });

  function hideErrorModal() {
    $('#modal-error').hide();
  }

  function hideAlertModal() {
    $('#modal-success').hide();
  }
</script>
