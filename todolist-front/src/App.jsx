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

  return (
    <div className="container">
      <header>
        <h1>📝 TodoList</h1>
        <p>Organize suas tarefas de forma simples e eficiente</p>
      </header>

      <div className="card">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Digite uma nova tarefa..." 
            value={novoItem}
            onChange={(e) => setNovoItem(e.target.value)}
          />
          {/* 4. Ligamos a função ao clique do botão */}
          <button className="btn-add" onClick={adicionarTarefa}>
            Adicionar
          </button>
        </div>

        <ul className="lista">
          {/* Se a lista estiver vazia, mostramos uma mensagem */}
          {tarefas.length === 0 && <p style={{color: '#999'}}>Nenhuma tarefa cadastrada.</p>}

          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className={`item ${tarefa.concluida ? 'concluido' : ''}`}>
              <div className="item-texto">
                <span className="radio-icon"></span>
                {tarefa.texto}
              </div>
              <div className="acoes">
                <button className="btn-edit">Editar</button>
                <button className="btn-delete">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
