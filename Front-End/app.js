const API = "http://localhost:8080";
let usuarioAtualId = null;

document.addEventListener("DOMContentLoaded", carregarClientes);

// VALIDAÇÃO MATEMÁTICA DE CPF

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ""); 
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// FUNÇÕES DE USUÁRIO 

async function carregarClientes() {
    try {
        const res = await fetch(`${API}/usuarios/todos`);
        const usuarios = await res.json();
        const lista = document.getElementById("clientes");
        lista.innerHTML = "";

        usuarios.forEach((u) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span onclick="verDetalhes('${u.cpf}')" title="Ver detalhes de ${u.nome}">${u.nome}</span>
                <div class="acoes">
                    <button class="btn editar" onclick="prepararEdicao('${u.cpf}')" title="Editar dados do cliente">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn excluir" onclick="excluirUsuario('${u.cpf}')" title="Excluir cliente">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn contatos" onclick="verContatos(${u.id})" title="Gerenciar contatos">
                        <i class="fa-solid fa-phone"></i>
                    </button>
                </div>
            `;
            lista.appendChild(li);
        });
    } catch (e) {
        console.error("Erro ao carregar:", e);
    }
}

async function salvarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cpfOriginal = document.getElementById("cpfOriginal").value;
    let dataDeNascimento = document.getElementById("dataDeNascimento").value;

    if (!nome || !cpf) return alert("Preencha Nome e CPF!");
    if (!validarCPF(cpf)) return alert("O CPF digitado é inválido!");

    if (dataDeNascimento) {
        const dataDigitada = new Date(dataDeNascimento);
        const dataHoje = new Date();
        if (dataDigitada.getFullYear() < 1900 || dataDigitada > dataHoje)
            return alert("Data inválida!");
    } else {
        dataDeNascimento = null;
    }

    const payload = { nome, cpf, dataDeNascimento, endereco };
    const isEdicao = cpfOriginal !== "";
    const url = isEdicao ? `${API}/usuarios?cpf=${cpfOriginal}` : `${API}/usuarios`;
    const metodo = isEdicao ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            alert(isEdicao ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
            voltar();
            carregarClientes();
        } else {
            alert("Erro: Não foi possível salvar. Verifique se o CPF informado já está cadastrado para outro usuário.");
        }
    } catch (e) {
        alert("Erro na requisição ao servidor.");
    }
}

async function prepararEdicao(cpf) {
    const res = await fetch(`${API}/usuarios?cpf=${cpf}`);
    const u = await res.json();
    document.getElementById("nome").value = u.nome;
    document.getElementById("cpf").value = u.cpf;
    document.getElementById("dataDeNascimento").value = u.dataDeNascimento || "";
    document.getElementById("endereco").value = u.endereco;
    document.getElementById("cpfOriginal").value = u.cpf;
    document.getElementById("titulo-form").innerText = "Editar Cliente";
    mostrar("formulario");
}

// CONTATOS

async function verContatos(id) {
    usuarioAtualId = id;
    limparFormularioContato();
    const res = await fetch(`${API}/contatos?usuarioId=${id}`);
    const contatos = await res.json();
    const lista = document.getElementById("lista-contatos");
    lista.innerHTML = "";

    contatos.forEach((c) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span><b>${c.tipo}:</b> ${c.valor} (${c.observacao || ""})</span>
            <div class="acoes">
                <button class="btn editar" onclick="prepararEdicaoContato(${c.id}, '${c.tipo}', '${c.valor}', '${c.observacao || ""}')" title="Editar este contato">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn excluir" onclick="excluirContato(${c.id})" title="Excluir este contato">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        lista.appendChild(li);
    });
    mostrar("contatos");
}

function prepararEdicaoContato(id, tipo, valor, obs) {
    document.getElementById("contato-id").value = id;
    document.getElementById("contato-tipo").value = tipo;
    document.getElementById("contato-valor").value = valor;
    document.getElementById("contato-obs").value = obs;

    const btn = document.getElementById("btn-salvar-contato");
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    btn.title = "Confirmar alteração do contato";
    btn.style.backgroundColor = "#28a745";
}

async function salvarContato() {
    const idContato = document.getElementById("contato-id").value;
    const tipo = document.getElementById("contato-tipo").value;
    const valor = document.getElementById("contato-valor").value.trim();
    const obs = document.getElementById("contato-obs").value.trim();

    if (!valor) return alert("Preencha o campo valor!");

    const payload = { tipo, valor, observacao: obs, usuario: { id: usuarioAtualId } };
    const isEdicao = idContato !== "";

    const url = isEdicao ? `${API}/contatos/${idContato}` : `${API}/contatos`;
    const metodo = isEdicao ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            limparFormularioContato();
            verContatos(usuarioAtualId);
        } else {
            alert("Erro ao salvar contato.");
        }
    } catch (e) {
        alert("Erro na requisição.");
    }
}

function limparFormularioContato() {
    document.getElementById("contato-id").value = "";
    document.getElementById("contato-valor").value = "";
    document.getElementById("contato-obs").value = "";

    const btn = document.getElementById("btn-salvar-contato");
    btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    btn.title = "Adicionar novo contato";
    btn.style.backgroundColor = "#004aad";
}

async function excluirContato(id) {
    if (!confirm("Deseja excluir este contato?")) return;
    await fetch(`${API}/contatos?id=${id}`, { method: "DELETE" });
    verContatos(usuarioAtualId);
}

// UTILITÁRIOS 

async function verDetalhes(cpf) {
    const res = await fetch(`${API}/usuarios?cpf=${cpf}`);
    const u = await res.json();
    document.getElementById("det-nome").innerText = u.nome;
    document.getElementById("det-cpf").innerText = u.cpf;
    document.getElementById("det-endereco").innerText = u.endereco || "Não informado";
    document.getElementById("det-data").innerText = u.dataDeNascimento
        ? u.dataDeNascimento.split("-").reverse().join("/")
        : "---";
    mostrar("detalhes");
}

async function excluirUsuario(cpf) {
    const confirmCpf = prompt(`Para confirmar a exclusão, digite o CPF ${cpf}:`);
    if (confirmCpf !== cpf) return alert("CPF não confere! Exclusão cancelada.");
    await fetch(`${API}/usuarios?cpf=${cpf}`, { method: "DELETE" });
    carregarClientes();
}

function mostrar(id) {
    document.querySelectorAll("section").forEach((s) => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

function voltar() {
    mostrar("lista-clientes");
}

function abrirFormulario() {
    document.getElementById("cpfOriginal").value = "";
    document.getElementById("titulo-form").innerText = "Novo Cliente";
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("dataDeNascimento").value = "";
    document.getElementById("endereco").value = "";

    mostrar("formulario");
}