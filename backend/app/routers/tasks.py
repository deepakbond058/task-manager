from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter(
    prefix="/api",  # Add prefix to all routes
    tags=["tasks"]
)

@router.get("/tasks", response_model=list[schemas.Task])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(database.get_db)):
    return crud.get_tasks(db, skip=skip, limit=limit)

@router.post("/tasks", response_model=schemas.Task)
def create_task(task: schemas.TaskCreate, db: Session = Depends(database.get_db)):
    return crud.create_task(db, task)

@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, status: str, db: Session = Depends(database.get_db)):
    db_task = crud.update_task(db, task_id, status)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/tasks/{task_id}", response_model=schemas.Task)
def delete_task(task_id: int, db: Session = Depends(database.get_db)):
    db_task = crud.delete_task(db, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task
