import { Injectable } from '@angular/core';
import {Catalogue} from "./catalogue";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Note, Tag} from "./note";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class EvernoteService {
  //url zu meinem Backend
  private api = 'http://kwmevernote.s2110456024.student.kwmhgb.at/api';
  constructor(private http:HttpClient) {

  }

  //Get All Methoden für die einzelnen Elemente
  getAll():Observable<Array<Catalogue>>{
    return this.http.get<Array<Catalogue>>(`${this.api}/catalogues`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllNotes():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllTodos():Observable<Array<Todo>>{
    return this.http.get<Array<Todo>>(`${this.api}/todo`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllTags():Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tag`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  //Get Single Methoden für die einzelnen Elemente
  getSingle(id:number):Observable<Catalogue>{
    return this.http.get<Catalogue>(`${this.api}/catalogues/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleNote(id:number):Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleTodo(id:number):Observable<Todo>{
    return this.http.get<Todo>(`${this.api}/todo/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingleTag(id:number):Observable<Tag>{
    return this.http.get<Tag>(`${this.api}/tag/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Löschen Methoden für die einzelnen Elemente
  remove(id:number):Observable<any>{
    return this.http.delete(`${this.api}/catalogues/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeNote(id:number):Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeTodo(id:number):Observable<any>{
    return this.http.delete(`${this.api}/todo/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeTag(id:number):Observable<any>{
    return this.http.delete(`${this.api}/tag/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Nach Tags filtern
  getFilteredByTag(tag: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/tag/${tag}`)
      .pipe(retry(3), catchError(this.errorHandler));
  }


  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }

  //Liste erstellen / bearbeiten
  create(catalogue: Catalogue): Observable<any> {
    return this.http.post(`${this.api}/catalogues`, catalogue)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  update(catalogue: Catalogue): Observable<any> {
    return this.http.put(`${this.api}/catalogues/${catalogue.id}`, catalogue)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Notizen erstellen / bearbeiten
  createNote(note: Note): Observable<any>{
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Tags erstellen / bearbeiten
  createTag(tag: Tag): Observable<any>{
    return this.http.post(`${this.api}/tag`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateTag(tag: Tag): Observable<any> {
    return this.http.put(`${this.api}/tag/${tag.id}`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //Todos erstellen / bearbeiten
  createTodo(todo: Todo): Observable<any>{
    return this.http.post(`${this.api}/todo`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.api}/todo/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  //User Details
  getUserDetails(user_id: number):Observable<any>{
    return this.http.get(`${this.api}/user/${user_id}`);
  }


  getAllSearch(searchTerm:string):Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tag/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
}
