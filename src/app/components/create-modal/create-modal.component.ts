import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskDataService} from "../../services/task-data-service";
import {Task} from "../../interfaces/Task";

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {

  @Output() closeModalEvent = new EventEmitter<boolean>()
  @Input("isModalOpen") isModalOpen: boolean = false
  @Output() taskCreated = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();
  @Input() task: Task | null = null;

  isEditionMode: boolean = false;

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private taskService: TaskDataService) {
    this.taskForm = this.formBuilder.group({
      title: [this.task ? this.task.title : '', Validators.required],
      description: [this.task ? this.task.description : ''],
      state: [this.task ? this.task.state : 'PENDING', Validators.required]
    });
  }

  ngOnInit() {
    if (this.task) {
      this.isEditionMode = !!this.task;
      if (this.task) {
        this.taskForm.setValue({
          title: this.task.title,
          description: this.task.description,
          state: this.task.state
        });
      } else {
        this.taskForm.reset({
          title: '',
          description: '',
          state: 'PENDING'
        });
      }
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isEditionMode) {
        const updatedTask: Task = {
          id: this.task!.id,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          state: this.taskForm.value.state
        };
        this.taskService.updateTask(updatedTask).subscribe(result => {
          this.taskUpdated.emit();
          this.closeModal();
        });
      } else {
        const newTask: Task = {
          id: null,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          state: this.taskForm.value.state
        };
        this.taskService.addTask(newTask).subscribe(result => {
          this.taskCreated.emit();
          this.closeModal();
        });
      }
    }
  }

  closeModal() {
    this.closeModalEvent.emit(false)
  }

}
