// Redirecionar para a página de login caso o usuário não esteja autenticado
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
    window.location.href = "https://matheusfonsecabjj.github.io/login/"; 
}

// Alternar menu responsivo
function toggleMenu() {
    const menu = document.querySelector('nav .menu');
    menu.classList.toggle('active');
}

// Salvar produto no localStorage
function salvarProduto(produto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Validar e adicionar produto ao formulário
document.getElementById('formProduto').addEventListener('submit', function(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const produto = document.getElementById('produto').value;
    const cor = document.getElementById('cor').value;
    const espessura = document.getElementById('espessura').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const placas = document.getElementById('placas').value;
    const sku = document.getElementById('sku').value;

    // Verificar se o SKU já existe
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    if (produtos.some(item => item.sku === sku)) {
        alert('O SKU deve ser único!');
        return;
    }

    // Aviso sobre peso
    if (peso < 1) {
        alert('Aviso: O peso está abaixo do limite recomendado de 1 kg!');
    }

    const novoProduto = { codigo, produto, cor, espessura, peso, placas, sku };
    salvarProduto(novoProduto);

    // Limpar o formulário após salvar
    document.getElementById('formProduto').reset();
    alert('Produto cadastrado com sucesso!');
});
