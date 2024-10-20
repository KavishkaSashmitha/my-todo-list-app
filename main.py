from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  
     
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,  
    allow_methods=["*"], 
    allow_headers=["*"], 
)



# In-memory database simulation
todos = []
users = [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]

# Pydantic models
class Todo(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
    user:str

# a. GET /todos: Return a list of all todos
@app.get("/todos", response_model=List[Todo])
def get_todos():
    return todos

# b. POST /todos: Create a new todo
@app.post("/todos", response_model=Todo)
def create_todo(todo: Todo):
    todos.append(todo)
    return todo

# c. PUT /todos/{todo_id}: Update a todo (e.g., mark as completed)
@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: int, updated_todo: Todo):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos[index] = updated_todo
            return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")

# d. DELETE /todos/{todo_id}: Delete a todo
@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[index]
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")

# e. GET /users: Return a list of users
@app.get("/users")
def get_users():
    return users
