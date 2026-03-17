import { useEffect, useRef, useState } from "react";

function TaskItem({ tarefa, alternarConcluida, excluirTarefa, editarTarefa }) {
  const [estaEditando, setEstaEditando] = useState(false);
  const [textoEditado, setTextoEditado] = useState(tarefa.texto);

  const inputRef = useRef(null);

  // Quando entrar em modo edição, coloca foco automático no input
  useEffect(() => {
    if (estaEditando && inputRef.current) {
      inputRef.current.focus();

      // opcional: posiciona o cursor no final do texto
      const tamanhoTexto = inputRef.current.value.length;
      inputRef.current.setSelectionRange(tamanhoTexto, tamanhoTexto);
    }
  }, [estaEditando]);

  function iniciarEdicao() {
    setTextoEditado(tarefa.texto);
    setEstaEditando(true);
  }

  function salvarEdicao() {
    if (textoEditado.trim() === "") {
      alert("A tarefa não pode ficar vazia!");
      return;
    }

    editarTarefa(tarefa.id, textoEditado);
    setEstaEditando(false);
  }

  function cancelarEdicao() {
    setTextoEditado(tarefa.texto);
    setEstaEditando(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      salvarEdicao();
    }

    if (e.key === "Escape") {
      cancelarEdicao();
    }
  }

  return (
    <li className={`item ${tarefa.concluida ? "concluido" : ""}`}>
      <div className="item-texto">
        {!estaEditando && (
          <>
            <span
              className="radio-icon"
              onClick={() => alternarConcluida(tarefa.id)}
            ></span>
            {tarefa.texto}
          </>
        )}

        {estaEditando && (
          <input
            ref={inputRef}
            type="text"
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input-edicao"
          />
        )}
      </div>

      <div className="acoes">
        {!estaEditando ? (
          <>
            <button type="button" className="btn-edit" onClick={iniciarEdicao}>
              Editar
            </button>
            <button
              type="button"
              className="btn-delete"
              onClick={() => excluirTarefa(tarefa.id)}
            >
              Excluir
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn-edit" onClick={salvarEdicao}>
              Salvar
            </button>
            <button type="button" className="btn-delete" onClick={cancelarEdicao}>
              Cancelar
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;