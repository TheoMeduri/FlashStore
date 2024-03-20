
document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
  
    const messageInput = document.getElementById('message');
    const messageContent = messageInput.value.trim();
    const channelSelect = document.getElementById('channel');
    const channelValue = channelSelect.value;
  
    if (messageContent && channelValue) {
      // Envia a mensagem para o webhook do Discord do canal selecionado
      fetch(channelValue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: messageContent })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao enviar mensagem para o canal.');
        }
        messageInput.value = ''; // Limpa o campo de entrada após o envio
        alert('Mensagem enviada com sucesso!');
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem para o canal.');
      });
    } else {
      alert('Por favor, insira uma mensagem e escolha um canal para enviar.');
    }
  });

  document.getElementById('embedForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
  
    // Captura os valores dos campos do formulário
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const color = document.getElementById('color').value;
    const field1 = document.getElementById('field1').value.trim();
    const value1 = document.getElementById('value1').value.trim();
    const field2 = document.getElementById('field2').value.trim();
    const value2 = document.getElementById('value2').value.trim();
  
    // Objeto JSON contendo a mensagem com a embed
    const embedMessage = {
      username: 'FLASH STORE WEBSITE', // Nome que será exibido como remetente da mensagem
      avatar_url: 'https://cdn.discordapp.com/attachments/1219363276408885298/1219760703460868146/1050ab55-48a1-4845-a9a2-3092afc440db.jpeg?ex=660c79ad&is=65fa04ad&hm=41c0656701b73d56324d82a8e28c532ce20ac809b75534d1d154d653a5ef0404&', // URL do avatar do bot (opcional)
      embeds: [{
        title: title,
        description: description,
        color: parseInt(color.replace('#', ''), 16), // Converte a cor hexadecimal para decimal
        fields: [
          { name: field1, value: value1, inline: false },
          { name: field2, value: value2, inline: false }
        ]
      }]
    };
  
    // URL do seu Webhook do Discord
    const webhookUrl = 'https://discord.com/api/webhooks/1219753712382120107/uoeWgjCsQlyXE2O9xX5txpowdpBZHjRyxZN9fot9n6EcBkemuNdt88Y7wOimqb4CbhWw';
  
    // Envia a mensagem para o Webhook do Discord
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(embedMessage)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem para o bot.');
      }
      alert('Embed enviada com sucesso!');
      // Limpa os campos do formulário após o envio
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('field1').value = '';
      document.getElementById('value1').value = '';
      document.getElementById('field2').value = '';
      document.getElementById('value2').value = '';
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao enviar embed para o bot.');
    });
  });
