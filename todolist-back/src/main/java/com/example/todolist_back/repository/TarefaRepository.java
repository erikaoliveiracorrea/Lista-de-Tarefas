package com.example.todolist_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.todolist_back.model.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}

// Esta interface estende JpaRepository, o que fornece métodos CRUD para a
// entidade Tarefa.
// O Long é o tipo do ID da entidade.
// Com isso, você pode usar métodos como:
// save(), findById(), findAll(), deleteById(), etc.,
// sem precisar implementá-los manualmente.