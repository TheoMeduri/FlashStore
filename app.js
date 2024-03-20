const express = require('express');
const { OAuth2Client } = require('discord-oauth2');

const app = express();
const PORT = 5500;

const client = new OAuth2Client({
  clientId: '1200453663492157580',
  clientSecret: 'fVcwR0uqGuNHB7frcXZZBrnHayWS3sH9',
  redirectUri: 'http://localhost:5500/auth/discord/callback' // URL de redirecionamento autorizado
});

// Página inicial
app.get('/', (req, res) => {
  res.send('<a href="/auth/discord">Entrar com Discord</a>');
});

// Redirecionar para a página de autorização do Discord
app.get('/auth/discord', (req, res) => {
  const authorizeUrl = client.authorizeUrl({
    scope: ['identify'] // Escopos de permissão necessários (identificar apenas, por exemplo)
  });
  res.redirect(authorizeUrl);
});

// Callback após a autorização bem-sucedida do Discord
app.get('/auth/discord/callback', async (req, res) => {
  const code = req.query.code;
  const token = await client.getToken({
    code,
    scope: ['identify']
  });
  const user = await client.getUser(token.access_token); // Obter informações do usuário autenticado
  res.send(`Bem-vindo, ${user.username}! Seu ID é ${user.id}.`);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor web rodando em http://localhost:${PORT}`);
});
