import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../interfaces/Task";

@Component({
  selector: 'app-create-new-button',
  templateUrl: './create-new-button.component.html',
  styleUrls: ['./create-new-button.component.scss']
})
export class CreateNewButtonComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  private _task: Task | null = null;

  @Input()
  set task(value: Task | null) {
    this._task = value;
  }

  get task(): Task | null {
    return this._task;
  }

  @Output() taskCreated = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  openModal() {
    this.isModalOpen = true;
  }

  handleModalClose(event: boolean) {
    this.isModalOpen = event;
  }

  handleTaskCreation() {
    this.taskCreated.emit();
  }

  handleTaskUpdate() {
    this.taskUpdated.emit();
  }
}
