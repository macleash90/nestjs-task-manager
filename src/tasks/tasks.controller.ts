import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Controller('tasks')
export class TasksController {
    tasksService: TasksService;
    constructor(tasksService: TasksService)
    {
        this.tasksService = tasksService;
    }

    // @Get()
    // getAllTasks(): Task[]
    // {
    //     return this.tasksService.getTasks();
    // }
    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto ): Task[]
    {
        //if we have any filters, call getTasksWithFilters
        if(Object.keys(filterDto).length)
        {
            return this.tasksService.getTasksWithFilters(filterDto);
        }

        //otherwise get all tasks
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

    @Delete("/:id")
    deleteTask(@Param('id') id: string): void
    {
        this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task
    {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
