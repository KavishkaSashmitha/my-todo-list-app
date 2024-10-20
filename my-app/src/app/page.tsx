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
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Swal from 'sweetalert2';
import { ModeToggle } from './ThemeToggle';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedUser, setAssignedUser] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // const [errorMessage, setErrorMessage] = useState('');

  const url = 'http://localhost:8000';

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

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  //Fetch Task Data From Server Side
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${url}/todos`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //Get All Users From Server Side
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  //This Function Used For Both Update & Create Task Functions
  const handleSave = async () => {
    //Check User Submitted All Required Fields
    if (!taskTitle || !assignedUser) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      //Add data From useState Stored For as newTodo
      const newTodo = {
        id: editingTask ? editingTask.id : tasks.length + 1,
        title: taskTitle,
        description: taskDescription,
        user: assignedUser,
        completed: editingTask ? editingTask.completed : false,
      };

      try {
        //Update Todo  Function
        if (editingTask) {
          await axios.put(`${url}/todos/${editingTask.id}`, newTodo);
          setTasks(
            tasks.map((task) => (task.id === editingTask.id ? newTodo : task))
          );
          toast({
            title: 'Task Updated Successfully',
            description: 'Updated',
          });
        } else {
          //else New Todo Create
          await axios.post(`${url}/todos`, newTodo);
          setTasks([...tasks, newTodo]);
          toast({
            title: 'Task Added Successfully',
            description: 'Added',
          });
        }
        resetForm();
        handleClose();
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };
  //Task !Completed function
  const handleTaskStatusChange = async (task: Task) => {
    const updatedTask = { ...task, completed: !task.completed };

    try {
      await axios.put(`${url}/todos/${task.id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      toast({
        title: `${updatedTask.title} Finished Successfully`,
        description: `Done`,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setAssignedUser('');
    setEditingTask(null);
  };

  //All The Buttons Related Functions

  //Add Button
  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  //Edit Button
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description || '');
    setAssignedUser(task.user || '');
    setIsDialogOpen(true);
  };

  //Dialog model close button
  const handleClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  //Delete  Button
  const handleDelete = async (todoId: number) => {
    //Added Swal For Confirmation Delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${url}/todos/${todoId}`);
          setTasks(tasks.filter((task) => task.id !== todoId));
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting task:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the task.',
            'error'
          );
        }
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-full md:max-w-lg lg:max-w-3xl p-6">
        {/* Header Section */}
        <CardHeader className="flex justify-between items-center mb-4 font-bold">
          <div className="flex items-center">
            <h3 className="mr-2">ToDo-List</h3>
            <ModeToggle />
          </div>
        </CardHeader>

        <CardContent>
          {/* Search Bar & Add Icon */}
          <div className="flex w-full items-center space-x-2 mb-4 ">
            <Input type="text" placeholder="Search" className="w-full" />
            <Button type="submit" className="whitespace-nowrap">
              Search
            </Button>
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
          <div className="flex flex-col space-y-4 w-full">
            {/* Content Table */}
            <Table className="w-full  rounded">
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        id={`task-${index}`}
                        checked={task.completed}
                        onCheckedChange={() => handleTaskStatusChange(task)}
                      />
                    </TableCell>
                    <TableCell className="font-bold ml-2">
                      {task.title.toUpperCase()}
                    </TableCell>
                    <TableCell>
                      {task.completed ? 'Completed' : 'Pending'}
                    </TableCell>
                    <TableCell className="text-right">
                      {task.user || 'Unassigned'}
                    </TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        onClick={() => handleEdit(task)}
                        className="mt-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
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
                          strokeWidth="1.5"
                          stroke="white"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 9l-.867 10.404A2.25 2.25 0 0 1 16.39 21H7.61a2.25 2.25 0 0 1-2.243-1.596L4.5 9m4.5 3v6m6-6v6m1.5-10.5v-1.875A1.125 1.125 0 0 0 14.375 3h-4.75A1.125 1.125 0 0 0 8.5 4.125V6m10.5 0h-13"
                          />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* pagination UI Component
          Haven't Implemented For working It yet */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>

      {/* Task Dialog  Add Task & Update Task */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task title"
              required
            />
            <Textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Task description"
            />
            <Select
              value={assignedUser}
              onValueChange={setAssignedUser}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
