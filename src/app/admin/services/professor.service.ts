import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { INewProfessor, IProfessor } from '../../models/professor.model';

const API_URL = environment.API_URL;

@Injectable()
export class ProfessorService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${API_URL}/professors`) as Observable<IProfessor[]>;
  }

  getById(id: number) {
    return this.http.get(`${API_URL}/professors/${id}`) as Observable<
      IProfessor
    >;
  }

  create(professor: INewProfessor) {
    return this.http.post(`${API_URL}/professors`, professor) as Observable<
      IProfessor
    >;
  }
}
