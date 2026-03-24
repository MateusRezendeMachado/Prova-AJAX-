import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

const urlUsuariosHash = 'https://raw.githubusercontent.com/MateusRezendeMachado/Prova-AJAX-/main/usuarios-hash.json';

const formLogin = document.getElementById('formLogin');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const mensagem = document.getElementById('mensagem');

formLogin.addEventListener('submit', async function (event) {
    event.preventDefault();

    const usernameDigitado = usernameInput.value.trim();
    const passwordDigitada = passwordInput.value.trim();

    mensagem.textContent = 'Verificando login...';
    mensagem.style.color = '#ffffff';

    try {
        const resposta = await fetch(urlUsuariosHash);

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar o JSON.');
        }

        const usuarios = await resposta.json();

        console.log('Usuarios do JSON:', usuarios);
        console.log('Username digitado:', usernameDigitado);

        const usuarioEncontrado = usuarios.find(usuario => usuario.username === usernameDigitado);

        console.log('Usuário encontrado:', usuarioEncontrado);

        if (!usuarioEncontrado) {
            mensagem.textContent = 'Usuário não encontrado.';
            mensagem.style.color = '#ff6b6b';
            return;
        }

        const senhaCorreta = bcrypt.compareSync(passwordDigitada, usuarioEncontrado.password);

        if (senhaCorreta) {
            mensagem.textContent = 'Login realizado com sucesso!';
            mensagem.style.color = '#7CFC8A';
        } else {
            mensagem.textContent = 'Senha incorreta.';
            mensagem.style.color = '#ff6b6b';
        }

    } catch (erro) {
        mensagem.textContent = 'Erro ao consultar os dados.';
        mensagem.style.color = '#ff6b6b';
        console.error(erro);
    }
});