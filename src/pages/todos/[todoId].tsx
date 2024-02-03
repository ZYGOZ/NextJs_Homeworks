import React from "react";
import { GetServerSideProps } from "next";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  todo: Todo;
}

const TodoPage: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div>
      <h1>Todo Details</h1>
      <p>Title: {todo.title}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<TodoProps> = async ({
  params,
}) => {
  const { todoId } = params!;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  const todo: Todo = await res.json();

  return {
    props: {
      todo,
    },
  };
};

export default TodoPage;
