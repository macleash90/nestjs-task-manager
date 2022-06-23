import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks = [];

    getTasks()
    {
        return this.tasks;
    }

    getAllTasks()
    {
        return this.tasks;
    }

    createTask( createTaskDto: CreateTaskDto ) : Task 
    {
        const { title, description } = createTaskDto;
        //create uuid for a task

        var uid = Date.now().toString(36);
        const task: Task = {
            // id: Math.random().toString(),
            id: uid,
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);

        return task;
    }

    getTaskById(id: string) : Task
    {
        var task = this.tasks.find(task => task.id == id);
        if(!task)
        {
            throw new NotFoundException ("Task not found");
        }
        return task;
    }

    deleteTask(id: string) : void
    {
        //delete task
        var task = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != id);

    }

    updateTaskStatus(id: string, status: TaskStatus) : Task
    {
        var task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto) : Task[]
    {
        const {status, search } = filterDto;

        let tasks = this.getAllTasks();
        // var tasks = this.getTasks();
        if(status)
        {
            tasks = tasks.filter( (task)=> task.status = status);
        }

        if(search)
        {
            tasks = tasks.filter( (task) => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
}
