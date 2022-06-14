import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
@Controller('tasks')
export class TasksController {
    tasksService: TasksService;
    constructor(tasksService: TasksService)
    {
        this.tasksService = tasksService;
    }

    @Get()
    getAllTasks(): Task[]
    {
        return this.tasksService.getTasks();
    }

    @Post()
    // createTask(@Body() body)
    // createTask(@Body("title") title, @Body("description") description)
    createTask(@Body() createTaskDto: CreateTaskDto)
    : Task
    {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get("/:id")
    getTaskById( @Param('id') id: string): Task
    {
        return this.tasksService.getTaskById(id);
    }
}
