import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Task} from "../interfaces/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskDataService {
  private apiUrl = 'http://localhost:8080/api/todolists'

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/`)
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Task>(url)
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/`, task)
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url, task)
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<void>(url)
  }
}
