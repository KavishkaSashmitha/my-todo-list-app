'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedUser, setAssignedUser] = useState('');

  interface User {
    id: number;
    name: string;
  }

  interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    user?: string;
  }

  // Fetch tasks and users from FastAPI when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Fetch all todos from FastAPI
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todos');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch users from FastAPI
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Add a new todo to FastAPI
  const handleSave = async () => {
    if (taskTitle && assignedUser) {
      const newTodo = {
        id: tasks.length + 1,
        title: taskTitle,
        description: taskDescription,
        user: assignedUser,
        completed: false,
      };
      try {
        await axios.post('http://localhost:8000/todos', newTodo);
        setTasks([...tasks, newTodo]);
        setTaskTitle('');
        setTaskDescription('');
        setAssignedUser('');
        handleClose();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  // Update a todo in FastAPI
  const handleUpdate = async (todoId: number, updatedTodo: Task) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/todos/${todoId}`,
        updatedTodo
      );
      setTasks(
        tasks.map((task) => (task.id === todoId ? response.data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a todo in FastAPI
  const handleDelete = async (todoId: number) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${todoId}`);
      setTasks(tasks.filter((task) => task.id !== todoId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAdd = () => {
    setIsDialogOpen(true);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex w-full max-w-sm items-center space-x-2 mb-4 mt-4">
        <Input type="text" placeholder="Search" />
        <Button type="submit">Search</Button>
        <Button type="button" onClick={handleAdd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>

      <div className="flex flex-wrap w-1/2 justify-start space-x-4 mt-4">
        <p className="h3 justify-start mb-4 font-bold">Task To Done</p>
        <div className="flex flex-col space-y-4 w-full">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="card w-full border border-zinc-800 p-4 bg-zinc-50 text-zinc-800 rounded"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Checkbox id={`task-${index}`} />
                  <label htmlFor={`task-${index}`} className="font-bold ml-2">
                    {task.title.toUpperCase()}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    onClick={() =>
                      handleUpdate(task.id, {
                        ...task,
                        completed: !task.completed,
                      })
                    }
                    className="mt-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 mt-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="white"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              <p>Assigned to: {task.user}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title:
            </label>
            <Input
              placeholder="Enter Title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
              Assign User
            </label>

            <Select
              onValueChange={(value: string) => {
                setAssignedUser(value); // Update assigned user state
                console.log(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>

              <SelectContent>
                {users.map((user, index) => (
                  <SelectItem value={user.name} key={index}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" className="ml-2" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
