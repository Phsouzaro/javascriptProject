//Seleciona o Botao e guarda na variável
var botao = document.querySelector("#buscar-pacientes");
//adiciona um escutador de evento, passando uma função para buscar a API com HTTPXML REQUESTER
botao.addEventListener('click', function(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");
//adiciona um escutador de evento, passando uma função para converter os dados de JSON para Object[Array]
  xhr.addEventListener("load", function(){
    if(xhr.status == 200){
      var resposta = xhr.responseText;
      var pacientes = JSON.parse(resposta);
//itera no array de pacientes e adiciona na tabela os pacientes
          pacientes.forEach(function(paciente){
            adicionaPacienteNaTabela(paciente);
          });
    }else{
      console.log(xhr.status);
      console.log(xhr.responseText);
    }

  });
  //envia a requisição HTTP para o navegador do tipo GET para obter os dados JSON da API
  xhr.send();
});
