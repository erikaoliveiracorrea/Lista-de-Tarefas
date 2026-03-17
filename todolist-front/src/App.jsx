import { useState } from 'react'
import './App.css'

function App() {
  // 1. Começamos com a lista vazia agora
  const [tarefas, setTarefas] = useState([]);
  
  // 2. Estado para capturar o que o usuário digita
  const [novoItem, setNovoItem] = useState("");

  // 3. Função para adicionar a tarefa na lista
  function adicionarTarefa() {
    // Validação: não deixa adicionar se o campo estiver vazio
    if (novoItem.trim() === "") {
      alert("Por favor, digite uma tarefa!");
      return;
    }

    // Criamos o objeto da nova tarefa
    const novaTarefa = {
      id: Date.now(), // Gera um ID único baseado no tempo atual
      texto: novoItem,
      concluida: false
    };

    // Atualizamos a lista: pegamos o que já existe (...) e somamos a nova
    setTarefas([...tarefas, novaTarefa]);

    // Limpamos o campo de input após adicionar
    setNovoItem("");
  }
  //key no botão adicionar
  function handleSubmit(e){
    e.preventDefault();
    adicionarTarefa();
  }

  // Função para marcar/desmarcar tarefa
  function alternarConcluida(id) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        // Se for a tarefa que cliquei, inverto o valor de concluida
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      // Se não for ela, retorno o item sem mexer
      return tarefa;
    });

    setTarefas(novasTarefas);
  }

  return (
    <div className="container">
      <header>
        <h1>📝 TodoList</h1>
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
          <button type="submit" className="btn-add">
            Adicionar
          </button>
        </form>

        <ul className="lista">
          {/* Se a lista estiver vazia, mostramos uma mensagem */}
          {tarefas.length === 0 && <p style={{color: '#999'}}>Nenhuma tarefa cadastrada.</p>}

          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className={`item ${tarefa.concluida ? 'concluido' : ''}`}>
              <div className="item-texto">
                <span className="radio-icon" onClick={() => alternarConcluida(tarefa.id)}></span>
                {tarefa.texto}
              </div>
              <div className="acoes">
                <button type="button" className="btn-edit">Editar</button>
                <button type="button" className="btn-delete">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
