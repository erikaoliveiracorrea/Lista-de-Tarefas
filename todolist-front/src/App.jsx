import { useState, useRef } from "react";
import "./App.css";
import Botoes from "./components/Botoes";

function App() {
  const [tarefas, setTarefas] = useState([]); //array vazio de tarefas
  const [novoItem, setNovoItem] = useState(""); //capturar o que o usuário digitar
  const [idEditando, setIdEditando] = useState(null); // guarda o id da tarefa em edição
  const [textoEditando, setTextoEditando] = useState(""); // guarda o texto temporário da edição
  const inputRef = useRef(null); //referência para o input

  function adicionarTarefa() {
    //validação
    if (novoItem.trim() === "") {
      alert("Digite uma tarefa valida");
      return;
    }

    //criar um objeto
    const novaTarefa = {
      id: Date.now(),
      texto: novoItem,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]); //manter as tarefas que já existe e acrescentar uma nova

    setNovoItem(""); //Limpa o campo do imput atomaticamente quando clicar em ADICIONAR
  }

  // Função para marcar/desmarcar tarefa
  function alternarConcluida(id) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        // Se for a tarefa que cliquei, inverto o valor de concluida
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      // Se não for ela, retorno o item sem mexer
      return tarefa;
    });

    setTarefas(novasTarefas);
  }
  // Quando clitar em ADICIONAR, pode apertar ENTER no teclado para adicionar a tarefa, sem precisar clicar no botão
  function handleSubmit(e) {
    e.preventDefault();
    adicionarTarefa();
  }

  // CLICOU EM EDITAR -> entra no modo edição
  function iniciarEdicao(tarefa) {
    setIdEditando(tarefa.id); //guarda o id da tarefa que quero editar
    setTextoEditando(tarefa.texto); //coloca o texto atual dentro do input para o usuário editar

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  // CLICOU EM SALVAR -> salva a alteração
  function salvarEdicao(id) {
    if (textoEditando.trim() === "") {
      alert("Digite um texto válido para a tarefa");
      return;
    }
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, texto: textoEditando };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
    //limpar o estado de edição
    setIdEditando(null);
    setTextoEditando("");
  }

  //Exclui uma tarefa da lista
  function excluirTarefa(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir essa tarefa?",
    );
    if (!confirmar) return;

    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  //Clicou em cancelar, sai do modo edição sem salvar
  function cancelarEdicao() {
    setIdEditando(null);
    setTextoEditando("");
  }

  return (
    <div className="container">
      <header>
        <h1>📝 Lista de Tarefas</h1>
        <p>Organize suas tarefas de forma simples e eficiente</p>
      </header>
      <div className="card">
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
          />

          <button className="btn-add">Adicionar</button>
        </form>
        <ul className="lista">
          {/*Se a lista estiver vazia mostrar mensagem */}
          {tarefas.length === 0 && (
            <p style={{ color: "#999" }}>Nenhuma tarefa cadastrada</p>
          )}

          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={`item ${tarefa.concluida ? "concluido" : ""}`}
            >
              <div className="item-texto">
                {/*Lógica de marcar a tarefa como concluída ou não concluída*/}
                <span
                  className="radio-icon"
                  onClick={() => alternarConcluida(tarefa.id)}
                ></span>
                {/*Lógica de editar o texto da tarefa*/}
                {idEditando === tarefa.id ? (
                  <input
                    type="text"
                    ref={inputRef}
                    value={textoEditando}
                    onChange={(e) => setTextoEditando(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        salvarEdicao(tarefa.id);
                      }
                    }}
                  />
                ) : (
                  <span>{tarefa.texto}</span>
                )}
              </div>

              <Botoes
                tarefa={tarefa}
                idEditando={idEditando}
                salvarEdicao={salvarEdicao}
                iniciarEdicao={iniciarEdicao}
                excluirTarefa={excluirTarefa}
                cancelarEdicao={cancelarEdicao}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
