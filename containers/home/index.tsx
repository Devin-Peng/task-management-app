"use client";

import TaskBox from "@/components/taskBox/TaskBox";
import { useDispatch } from "react-redux";
import { Input, Button, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { FormData } from "./types";
import { actions, TaskStatus } from "@/lib/tasks/sliceReducer";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    dispatch(actions.addTask({
      id: uuidv4(),
      status: TaskStatus.TODO,
      title: data.newTask
    }))
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const id = active.id as string;
    const newStatus = over.id as TaskStatus;

    dispatch(actions.updateTask({
      id,
      status: newStatus
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <h1>Task Management</h1>

        <Flex gap="4" marginTop="4" alignItems="end">
          <Field
            label="New Task"
            invalid={!!errors.newTask}
            errorText={errors.newTask?.message}
          >
            <Input
              placeholder="Enter new task"
              {...register("newTask", {
                required: "New task is required.",
              })}
            />
          </Field>

          <Button
            onClick={() => {
              console.log("add task button clicked 2222");
            }}
            type="submit"
          >
            Add
          </Button>
        </Flex>
      </div>

      <div>
        <Flex gap="4" marginTop="4">
          <DndContext onDragEnd={(e) => handleDragEnd(e)}>
            <TaskBox status={TaskStatus.TODO} />
            <TaskBox status={TaskStatus.IN_PROGRESS} />
            <TaskBox status={TaskStatus.DONE} />
          </DndContext>
        </Flex>
      </div>

      <div></div>
    </form>
  );
}
