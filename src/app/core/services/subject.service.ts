import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ISubject } from '../../models/professor.model';

const API_URL = environment.API_URL;

@Injectable()
export class SubjectService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${API_URL}/subjects`) as Observable<ISubject[]>;
  }

  getById(subjectId: number) {
    return this.http.get(`${API_URL}/subjects/${subjectId}`) as Observable<
      ISubject
    >;
  }

  create(subject: ISubject) {
    return this.http.post(`${API_URL}/subjects`, subject) as Observable<
      ISubject
    >;
  }

  update(subjectId: number, subjectData: ISubject) {
    return this.http.patch(
      `${API_URL}/subjects/${subjectId}`,
      subjectData
    ) as Observable<ISubject>;
  }

  remove(subjectId: number) {
    return this.http.delete(`${API_URL}/subjects/${subjectId}`);
  }
}
