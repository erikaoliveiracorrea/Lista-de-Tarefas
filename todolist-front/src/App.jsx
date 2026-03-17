import { useState } from 'react'
import './App.css'
import TaskItem from './components/TaskItem'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novoItem, setNovoItem] = useState("");

  function adicionarTarefa() {
    if (novoItem.trim() === "") {
      alert("Por favor, digite uma tarefa!");
      return;
    }

    const novaTarefa = {
      id: Date.now(),
      texto: novoItem,
      concluida: false
    };

    setTarefas([...tarefas, novaTarefa]);
    setNovoItem("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    adicionarTarefa();
  }

  function alternarConcluida(id) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });

    setTarefas(novasTarefas);
  }

  // NOVA FUNÇÃO: excluir tarefa
  function excluirTarefa(id) {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  }

  // NOVA FUNÇÃO: editar tarefa
  function editarTarefa(id, novoTexto) {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, texto: novoTexto };
      }
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
          {tarefas.length === 0 && (
            <p style={{ color: '#999' }}>Nenhuma tarefa cadastrada.</p>
          )}

          {tarefas.map((tarefa) => (
            <TaskItem
              key={tarefa.id}
              tarefa={tarefa}
              alternarConcluida={alternarConcluida}
              excluirTarefa={excluirTarefa}
              editarTarefa={editarTarefa}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App