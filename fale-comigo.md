---
layout: single
title: Fale comigo
permalink: /fale-comigo
description: Entre em contato com o Mr. Caricati. Tire dúvidas, envie sugestões de conteúdo ou envie propostas de parcerias.
tags: 
  - contato
  - email
  - meu contato
---

<section id="contact-page">
  <div class="content">
    <header>
      <h1 class="heading-underscore">Fale comigo!</h1>
      <p>Entre em contato com o Mr. Caricati. Tire dúvidas, envie sugestões de conteúdo ou envie propostas de parcerias.</p>
      <p>
        ❓ Dúvidas: Perguntas nossos conteúdos, políticas e entretenimento.
        <br>
        💡 Sugestões: Ideias de pautas, locais para explorar, receitas mateiras ou melhorias para o site.
        <br>
        🤝 Parcerias e Negócios: Propostas comerciais, testes de produtos, publieditoriais ou projetos em colaboração.
      </p>
      <p>Preencha o formulário abaixo ou envie um e-mail. Leio todas as mensagens e respondo assim que voltar para o sinal da civilização!</p>
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
