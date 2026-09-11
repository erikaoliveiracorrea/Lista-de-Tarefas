import { useState, useRef, useEffect } from "react";
import api from "./services/api";
import "./App.css";
import Botoes from "./components/Botoes";

function App() {
  const [tarefas, setTarefas] = useState([]); //array vazio de tarefas
  const [novoItem, setNovoItem] = useState(""); //capturar o que o usuário digitar
  const [idEditando, setIdEditando] = useState(null); // guarda o id da tarefa em edição
  const [textoEditando, setTextoEditando] = useState(""); // guarda o texto temporário da edição
  const inputRef = useRef(null); //referência para o input

  async function adicionarTarefa() {
    //validação
    if (novoItem.trim() === "") {
      alert("Digite uma tarefa valida");
      return;
    }

    try {
      
      const response = await api.post("/tarefas", {
        texto: novoItem,
        concluido: false
      });
      setTarefas([...tarefas, response.data]); //manter as tarefas que já existe e acrescentar uma nova
      setNovoItem(""); //Limpa o campo do imput atomaticamente quando clicar em ADICIONAR

    } catch (error) {
      console.error("Erro ao adicionar tarefa.", error);
      alert("Não foi possível adicionar a tarefa");
    }
  }
      
  // Função para marcar/desmarcar tarefa
  async function alternarConcluida(id) {

    const tarefa = tarefas.find((tarefa) => tarefa.id === id);
    if(!tarefa) return;

    try {
      
      const response = await api.put(`/tarefas/${id}`,{
        texto: tarefa.texto,
        concluido: !tarefa.concluido
      });

      setTarefas(
        tarefas.map((tarefa) => 
        tarefa.id === id ? response.data : tarefa
        )
      );
    } catch (error) {
      
      console.error("Erro ao alterar tarefa:", error);
      alert("Não foi possível alterar a terfa.");
    }
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
  async function salvarEdicao(id) {
    if (textoEditando.trim() === "") {
      alert("Digite um texto válido para a tarefa");
      return;
    }

    try {

      const response = await api.put(`/tarefas/${id}`,{
        texto: textoEditando,
      })

      setTarefas(
        tarefas.map((tarefa)=> 
          tarefa.id === id ? response.data : tarefa)
      );

       //limpar o estado de edição
      setIdEditando(null);
      setTextoEditando("");

    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Não foi possível atualizar a tarefa');
    }
    
   
  }

  //Exclui uma tarefa da lista
  async function excluirTarefa(id) {

    const confirmar = window.confirm("Tem certeza que deseja excluir essa tarefa?",);
    if (!confirmar) return;

    try {
      await api.delete(`/tarefas/${id}`);

      setTarefas(tarefas.filter((tarefa) => 
      tarefa.id !== id));

    } catch (error) {

      console.error('Erro ao execluir tarefa', error);
      alert('Não foi possível excluir a tarefa');
    }
    
  }
  //Clicou em cancelar, sai do modo edição sem salvar
  function cancelarEdicao() {
    setIdEditando(null);
    setTextoEditando("");
  }

  useEffect(() =>{
    api.get("/tarefas")
     .then((response) => {
       setTarefas(response.data);
     })
     .catch((error) => {
      console.error(error);
     });
  },[]);

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
              className={`item ${tarefa.concluido ? "concluido" : ""}`}
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
