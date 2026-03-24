import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm';

const urlUsuarios = 'https://raw.githubusercontent.com/MateusRezendeMachado/Prova-AJAX-/main/usuarios.json';

async function gerarHashes() {
    try {
        const resposta = await fetch(urlUsuarios);
        const usuarios = await resposta.json();

        const usuariosComHash = usuarios.map(usuario => {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(usuario.password, salt);

            return {
                username: usuario.username,
                password: hash
            };
        });

        console.log(JSON.stringify(usuariosComHash, null, 2));
    } catch (erro) {
        console.error('Erro ao gerar hashes:', erro);
    }
}

gerarHashes();