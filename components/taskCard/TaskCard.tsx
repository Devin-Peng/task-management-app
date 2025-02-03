import { useDraggable } from "@dnd-kit/core";
import styles from "./TaskCard.module.css";
import { CloseButton } from "../ui/close-button";
import { Button } from "../ui/button";
import { actions } from "@/lib/tasks/sliceReducer";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Textarea } from "@chakra-ui/react"; 
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons"; 
import { RootState } from "@/lib/store";

interface TaskCardProps {
  id: string;
  title: string;
}

const TaskCard = ({ id, title }: TaskCardProps) => {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) => state.tasksState.tasks.find((task) => task.id === id));

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
 
  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
    
  const handleSaveDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const updatedDescription = event.currentTarget.value;
      dispatch(actions.updateDescription({ id, description: updatedDescription }));
  };

  const isOpen = task?.isOpen;  

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className={styles["taskCard"]}>
      <div ref={setNodeRef} {...listeners} {...attributes} style={style} className={styles["draggable"]}>

          <h3>{title}</h3>

      </div>
        <Box>
            <Button
            onClick={() => dispatch(actions.isOpen({ id }))}
            aria-label="Toggle Description"
            >
            {isOpen ?  <ChevronUpIcon/> : <ChevronDownIcon />}
            </Button>

            {task.isOpen && ( 
                   <Card.Root style={{        
                    position: isOpen ? 'absolute' : 'relative',
                    top: isOpen ? '20' : '0',
                    width: '350px',
                    left: '2px',
                    zIndex: isOpen ? 10 : 1,
                    boxShadow: isOpen ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'}}>
                   <Card.Body gap="3">
                     <Card.Title mt="2">
                      Description
                     </Card.Title>
                     <Card.Description>
                      <Textarea  
                        defaultValue={task.description}
                        placeholder="Add a description"
                        onChange={handleSaveDescription}
                      />
                     </Card.Description>
                   </Card.Body>
             
                   <Card.Footer justifyContent="flex-end">
                     <Button>
                        Edit Description
                     </Button>
                     <Button >
                        Save Description
                     </Button>
                   </Card.Footer>
                 </Card.Root>
            )}
        </Box>

      <CloseButton
        size="sm"
        as="button"
        onClick={() => {
        dispatch(actions.removeTask({ id }));
        }}
        />

    </div>
  );
};

export default TaskCard;
