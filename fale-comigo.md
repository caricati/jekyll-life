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
      <h1>Fale comigo!</h1>
      <p>Preencha o formulário abaixo com seu nome, email, e a mensagem que você quer mandar para mim. Seja breve, você tem 1024 caracteres para escrever sua mensagem.</p>
    </header>
    <form id="contact-form">
      <label for="name">Nome</label>
      <input type="text" id="name" name="name" maxlength="30" placeholder="Seu nome" required />
      <label for="contact">Email</label>
      <input type="email" id="contact" name="contact" maxlength="50" placeholder="nome@email.com" required />
      <label for="message">Mensagem</label>
      <textarea name="message" id="message" maxlength="1024" rows="10" placeholder="Escreva uma mensagem para mim..." required></textarea>
      <button type="submit" id="send-contact" class="btn primary">
        <span>Enviar</span>
      </button>
    </form>
  </div>
  {% include modal-alert.html id="modal-success" jsOnClickFn="window.location='/'" title="Mensagem enviada" message="Sua mensagem foi enviada para mim. Fique de olho no seu e-mail que eu posso te responder em breve." %}
  {% include modal-alert.html id="modal-error" jsOnClickFn="hideErrorModal()" title="Erro ao enviar" message="Parece que ocorreu um erro ao enviar seus dados. Você pode tentar enviar em alguns instantes? Valeu!!" %}
</section>

<script type="text/javascript">
  $(document).ready(function() {
    var loading = false;
    $('#contact-form').on('submit', (event) => {
      event.preventDefault();
      if(loading) return

      var loading = true;
      var submitValue = $('#send-contact').html();
      var values = {
        name: $('#name').val(),
        contact: $('#contact').val(),
        message: $('#message').val(),
      };
      
      $('#send-contact').html('<span>enviando...</span>');

      sendMessage(values, function(res){
        $('#send-contact').html(submitValue);
        loading = false;
        if (res.ok) {
          $('#modal-success').show();
        } else {
          $('#modal-error').show();
        }
      })
    })
  });
  
  function hideErrorModal() {
    $('#modal-error').hide();
  }
</script>
