// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';

// interface TaskDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   taskTitle: string;
//   taskDescription: string;
//   assignedUser: string;
//   users: { id: number; name: string }[];
//   onSave: () => void;
//   onTaskTitleChange: (value: string) => void;
//   onAssignedUserChange: (value: string) => void;
//   onTaskDescriptionChange: (value: string) => void;
//   dialogMode: 'add' | 'update';
// }

// export default function TaskDialog({
//   isOpen,
//   onClose,
//   taskTitle,
//   taskDescription,
//   assignedUser,
//   users,
//   onSave,
//   onTaskDescriptionChange,
//   onTaskTitleChange,
//   onAssignedUserChange,
//   dialogMode,
// }: TaskDialogProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>
//             {dialogMode === 'add' ? 'Add New Task' : 'Update Task'}
//           </DialogTitle>
//         </DialogHeader>
//         <div className="mt-4">
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Title:
//           </label>
//           <Input
//             placeholder="Enter Title"
//             value={taskTitle}
//             onChange={(e) => onTaskTitleChange(e.target.value)}
//           />
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Description:
//           </label>
//           <Input
//             type="text-area"
//             placeholder="Enter Title"
//             value={taskDescription}
//             onChange={(e) => onTaskDescriptionChange(e.target.value)}
//           />
//           <label className="block mb-2 mt-2 text-sm font-medium text-gray-700">
//             Assign User
//           </label>
//           <Select
//             onValueChange={(value: string) => onAssignedUserChange(value)}
//             value={assignedUser}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select a user" />
//             </SelectTrigger>
//             <SelectContent>
//               {users.map((user) => (
//                 <SelectItem value={user.name} key={user.id}>
//                   {user.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex justify-end mt-4">
//           <Button variant="secondary" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="button" className="ml-2" onClick={onSave}>
//             {dialogMode === 'add' ? 'Save' : 'Update'}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
