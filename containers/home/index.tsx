'use client'

import TaskBox from "@/components/taskBox/TaskBox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export default function Home() {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({title: null})

  return (
    <>


      <div>
      <h1>Task Management</h1>
      <DialogRoot placement="center" size="lg">
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <DialogBody>
          TestTest
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={() => {
            console.log('add task button clicked')
          }}>Add</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>

      </div>

      <div>
        <TaskBox />
      </div>

      <div>

      </div>
    </>
  );
}
