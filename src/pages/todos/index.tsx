import React from 'react';
import { GetServerSideProps } from 'next';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosProps {
  todos: Todo[];
}

const TodosPage: React.FC<TodosProps> = ({ todos }) => {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TodosProps> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos: Todo[] = await res.json();

  return {
    props: {
      todos,
    },
  };
};

export default TodosPage;
