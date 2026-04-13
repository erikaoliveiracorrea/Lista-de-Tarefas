function Botoes({
  tarefa,
  idEditando,
  salvarEdicao,
  iniciarEdicao,
  excluirTarefa,
  cancelarEdicao
}) {
  return (
    <div className="acoes">
                {idEditando === tarefa.id ? (
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => salvarEdicao(tarefa.id)}
                  >
                    Salvar
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-editar"
                    onClick={() => iniciarEdicao(tarefa)}
                  >
                    Editar
                  </button>
                )}

                {idEditando === tarefa.id ? (
                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={cancelarEdicao}
                  >
                    Cancelar
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-excluir"
                    onClick={() => excluirTarefa(tarefa.id)}
                  >
                    Excluir
                  </button>
                )}
              </div>
  );
}

export default Botoes;