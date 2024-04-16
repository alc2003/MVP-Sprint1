/*
  ------------------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados - Fila de Paciente aguardando atendimento
  ------------------------------------------------------------------------------------------------
*/
document.addEventListener('DOMContentLoaded', () => {
  BuscarListAtend();  
});


/*
  --------------------------------------------------------------------------------------
  Função para obter os dados do paciente que vai realizar o atendimento pelo id_paciente
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let inputPaciente = document.getElementById("id_paciente").value;
  console.log(inputPaciente)
  let url = 'http://127.0.0.1:5000/busca_paciente_id?id=' + inputPaciente;
  fetch(url, {
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do paciente');
      }
      return response.json();
    })
    .then((paciente) => {
      clearList(); // Limpa a lista antes de inserir os dados do paciente
      insertList(paciente.nome, paciente.cns, paciente.id); // Insere os dados do paciente na lista
    })
    .catch((error) => {
      alert(error.message); // Exibe uma mensagem do erro em um alert
      console.error('Error:', error); // Registra o erro no console
    });
}

/*
  --------------------------------------------------------------------------------------
  Insere os dados do paciente na tela, retornado na busca pelo Id do paciente
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, cns, id) => {
  // Cria um array com os dados do paciente
  var item = [nome, cns, id];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  // Loop para percorrer os dados do paciente
  for (var i = 0; i < item.length; i++) {    
    var cel = row.insertCell(i);    
    cel.textContent = item[i];
  }
  // Atualiza o valor do campo id_paciente_atendido com o valor do campo id_paciente
  document.getElementById("id_paciente_atendido").value = document.getElementById("id_paciente").value;
  // Limpa os campos id_paciente e nome_paciente
  document.getElementById("id_paciente").value = "";
  //document.getElementById("nome_paciente").value = "";  
}

/*
  --------------------------------------------------------------------------------------
   Função para limpar os dados do paciente
  --------------------------------------------------------------------------------------
*/
const clearList = async () => {
  let table = document.getElementById("myTable");
  let rowCount = table.rows.length;
  console.log(table.rows.length)
  // Comece de 1 para evitar remover a linha de título
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1); // Sempre remova a segunda linha, pois a primeira é a linha de título
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo atendimento ao paciente selecionado
  --------------------------------------------------------------------------------------
*/
const newItemAtend = () => {
  let id_paciente_atendido = document.getElementById("id_paciente_atendido").value;
  let hda_cod_queixa_principal = document.getElementById("hda_cod_queixa_principal").value;
  let hda_queixa_principal = document.getElementById("hda_queixa_principal").value;
  //Tratamento dos checkboxes
  let hpr_hipertensaoCheckbox = document.getElementById("hpr_hipertensao");
  let hpr_hipertensao = hpr_hipertensaoCheckbox.checked ? 'S' : 'N';
  let hpr_diabetesCheckbox = document.getElementById("hpr_diabetes");
  let hpr_diabetes = hpr_diabetesCheckbox.checked ? 'S' : 'N';
  let hpr_cancerCheckbox = document.getElementById("hpr_cancer");
  let hpr_cancer = hpr_cancerCheckbox.checked ? 'S' : 'N';

  //Tratamento para tentativa de inserir um atendimento sem selecionar paciente
  if (id_paciente_atendido === '') {
    alert("É necessário selecionar um Paciente!");
  } else {
    // Chamada da função de inserir atendimento
    postItemAtend(id_paciente_atendido, hda_cod_queixa_principal, hda_queixa_principal,
      hpr_hipertensao, hpr_diabetes, hpr_cancer)
    //Após inserção do atendimento, atualiza a lista de pacientes aguardando  
    clearList(); // Limpa a lista antes de inserir os dados do paciente
    clearListAtend();
    alert("Atendimento adicionado à fila!");
    BuscarListAtend();
    
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para obter todos os atendimentos, já com os dados do paciente também
  --------------------------------------------------------------------------------------
*/
const BuscarListAtend = async () => {
  let url = 'http://127.0.0.1:5000/busca_atendimentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach(item => {        
        //insere na lista de atendimentos com classificação aleatória
        insertListAtend(item.nome, item.id, item.id_paciente, item.cns, item.classificacao);
        //altera as cores pela ordem de classificação(1,2,3 VERMELHO / 4,5 e 6 AMARELO / 7 e 8 Azul / 9 e 10 Verde)
        setColorBasedOnClassificacao(item.classificacao);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para limpar os dados da fila de atendimentos
  --------------------------------------------------------------------------------------
*/
const clearListAtend = async () => {

  document.getElementById("id_paciente_atendido").value = '';
  document.getElementById("hda_cod_queixa_principal").value = 1;
  document.getElementById("hda_queixa_principal").value = '';
  document.getElementById("hpr_hipertensao").checked = false;
  document.getElementById("hpr_diabetes").checked = false;
  document.getElementById("hpr_cancer").checked = false;

  let table = document.getElementById("myTableFila");
  let rowCount = table.rows.length;
  // Comece de 1 para evitar remover a linha de título
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1); // Sempre remova a segunda linha, pois a primeira é a linha de título
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para alterar as cores das linhas pela ordem de classificação
  --------------------------------------------------------------------------------------
*/
function setColorBasedOnClassificacao(classificacao) {
  let color;
  if (classificacao >= 1 && classificacao <= 3) {
    color = 'lightcoral';
  } else if (classificacao >= 4 && classificacao <= 6) {
    color = 'lightgoldenrodyellow';
  } else if (classificacao >= 7 && classificacao <= 8) {
    color = 'lightblue';
  } else if (classificacao >= 9 && classificacao <= 10) {
    color = 'lightgreen';
  }
  // Aplica a cor de fundo à linha inserida
  let table = document.getElementById('myTableFila');
  let lastRow = table.rows[table.rows.length - 1]; // Pega a última linha inserida
  lastRow.style.backgroundColor = color;
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de atendimentos
  --------------------------------------------------------------------------------------
*/
const insertListAtend = (nome, id, id_paciente_atendido, cns, classificacao) => {
  var itematend = [nome, id, id_paciente_atendido, cns, classificacao]
  var table = document.getElementById('myTableFila');
  var row = table.insertRow();  
  for (var i = 0; i < itematend.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = itematend[i];
  }
  //insere o botão para exclusão do atendimento
  insertButton(row.insertCell(-1))
  removeElement(); //função para remover o atendimento
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir um atendimento no SERVIDOR, com os dados informado na tela
  --------------------------------------------------------------------------------------
*/
const postItemAtend = async (id_paciente_atendido, hda_cod_queixa_principal, hda_queixa_principal,
  hpr_hipertensao, hpr_diabetes, hpr_cancer) => {
  const formData = new FormData();
  //Carrega os dados para o FormData
  formData.append('id_paciente', id_paciente_atendido);
  formData.append('hda_cod_queixa_principal', hda_cod_queixa_principal);
  formData.append('hda_queixa_principal', hda_queixa_principal);
  formData.append('hpr_hipertensao', hpr_hipertensao);
  formData.append('hpr_diabetes', hpr_diabetes);
  formData.append('hpr_cancer', hpr_cancer);
  //chamada do serviço de inserção de atendimento
  let url = 'http://127.0.0.1:5000/adiciona_atendimento';
  fetch(url, {
    method: 'post',
    body: formData
  })
    //.then((response) => response.json())
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Erro ao inserir o atendimento do paciente');
      }
      return response.json();
    })
    .then((data) => {      
      data.paciente.forEach(item => insertListAtend(item.nome, item.id, item.id_paciente,
        item.hda_cod_queixa_principal, item.hda_queixa_principal,
        hpr_hipertensao, hpr_diabetes, hpr_cancer))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const idItem = div.getElementsByTagName('td')[1].innerHTML
      console.log(idItem)
      if (confirm("Você tem certeza que deseja remover um paciente da fila?")) {
        div.remove()
        deleteItem(idItem)
        alert("Paciente Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/remove_atendimento?id=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}