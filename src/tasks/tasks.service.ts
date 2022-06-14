import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks = [];

    getTasks()
    {
        return this.tasks;
    }

    createTask( createTaskDto: CreateTaskDto ) : Task 
    {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: Math.random().toString(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string) : Task
    {
        return this.tasks.find(task => task.id === id);
    }
}
