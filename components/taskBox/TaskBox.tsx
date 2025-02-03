import { useDroppable } from "@dnd-kit/core";
import styles from "./TaskBox.module.css";
import { TaskStatus } from "@/lib/tasks/sliceReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import TaskCard from "../taskCard/TaskCard";

interface TaskBoxProps {
  status: TaskStatus;
}

const TaskBox = ({ status }: TaskBoxProps) => {
  // useSelector to get tasks based off status
  const tasks = useSelector((state: RootState) => state.tasksState.tasks);

  const { setNodeRef } = useDroppable({
    id: status,
  });


  const getLabel = () => {
    switch (status) {
      case TaskStatus.TODO:
        return "To Do";
      case TaskStatus.IN_PROGRESS:
        return "In Progress";
      case TaskStatus.DONE:
        return "Done";
      default:
        return "";
    }
  };

  return (
    <div className={styles["task-box"]} ref={setNodeRef}>
      <h1>{getLabel()}</h1>
      <div className={styles["divier"]} />
      {tasks.map(
        (task) =>
          task.status === status && (
            <TaskCard key={task.id} id={task.id} title={task.title} />
          )
      )}
    </div>
  );
};

export default TaskBox;
