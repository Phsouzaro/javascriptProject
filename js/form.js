var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
  event.preventDefault();
  var form = document.querySelector("#form-adiciona");

  var paciente = buscaDadosNoFormulario(form);

  var pacienteTr = montaTr(paciente);

  var erros = validaPaciente(paciente);
  console.log(erros);
  if(erros.length > 0){
    exibeMensagensErro(erros);
    return;
  }
  var tabela = document.querySelector("#tabela-pacientes");
  tabela.appendChild(pacienteTr);
  form.reset();
  var mensagenserro = document.querySelector("#mensagens-erro")
  mensagenserro.innerHTML = "";
});

function buscaDadosNoFormulario(form) {
  var paciente  ={
    nome: form.nome.value,
    peso: form.peso.value,
    altura: form.altura.value,
    gordura: form.gordura.value,
    imc: calculaImc(form.peso.value, form.altura.value)
  }
  return paciente;
}

function montaTr(paciente) {
    //Cria TR
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    //Cria as TD's e a adiciona dentro da TR
    pacienteTr.appendChild(montaTd(paciente.nome, "info-nome"));
    pacienteTr.appendChild(montaTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(montaTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc, "info-imc"));
    pacienteTr.appendChild(montaTd(paciente.excluir, "excluir-paciente"));
    // retorna a TR
    return pacienteTr;
}

function montaTd(dado, classe) {
    var td = document.createElement("td");
    td.classList.add(classe);
    td.textContent = dado;

    return td;
}

function validaPaciente(paciente) {

  var erros = [];
  if(paciente.nome.length ==0) erros.push("O campo Nome nao pode ser em branco");
  if (!validaPeso(paciente.peso)) erros.push("Peso é Inválido");
  if(!validaAltura(paciente.altura)) erros.push("Altura é inválida");
  if(paciente.gordura.length == 0) erros.push("o campo Gordura nao pode ser em branco");
  if(paciente.peso.length == 0) erros.push("o campo Peso nao pode ser em branco");
  if(paciente.altura.length == 0 ) erros.push("o campo Altura nao pode ser em branco");
  return erros;
}

function exibeMensagensErro(erros) {
  var ul = document.querySelector("#mensagens-erro");
  ul.innerHTML = "";
  erros.forEach((erro) => {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
}
