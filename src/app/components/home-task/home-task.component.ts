import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../interfaces/Task";
import {TaskDataService} from "../../services/task-data-service";

@Component({
  selector: 'app-home-task',
  templateUrl: './home-task.component.html',
  styleUrls: ['./home-task.component.scss']
})
export class HomeTaskComponent implements OnInit {
  tasks: Task[] = [];
  tasksByStatus: { [key: string]: Task[] } = {
    'PENDING': [],
    'IN_PROGRESS': [],
    'COMPLETED': []
  };
  trash = "https://icones8.fr/icon/uUs6P2OHmKJb/corbeille"


  constructor(private taskService: TaskDataService) { }

  ngOnInit() {
    this.loadTasks()
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data
      this.categorizeTasks()
    });
  }

  onTaskCreated() {
    this.loadTasks()
  }

  onTaskUpdated() {
    this.loadTasks()
  }


  categorizeTasks() {
    this.tasksByStatus = {
      'PENDING': this.tasks.filter(task => task.state === 'PENDING'),
      'IN_PROGRESS': this.tasks.filter(task => task.state === 'IN_PROGRESS'),
      'COMPLETED': this.tasks.filter(task => task.state === 'COMPLETED')
    };
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    }, error => {
      console.error('Error occurred while deleting task:', error);
    });
  }
}
