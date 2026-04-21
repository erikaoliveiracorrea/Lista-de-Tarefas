package com.example.todolist_back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.todolist_back.model.Tarefa;
import com.example.todolist_back.repository.TarefaRepository;

@Service
public class TarefaService {

    private final TarefaRepository tarefaRepository;

    public TarefaService(TarefaRepository tarefaRepository) {
        this.tarefaRepository = tarefaRepository;
    }

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    public Tarefa salvarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public void deletarTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }

    public Tarefa atualizarTarefa(Long id, Tarefa tarefaAtualizada) {
        tarefaAtualizada.setId(id);
        return tarefaRepository.save(tarefaAtualizada);
    }
}
