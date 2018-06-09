import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IExamResponse } from '../models/http-responses';
const API_URL = environment.API_URL;

interface IExamQuery {
  professorId?: number;
  subjectId?: number;
  startDate?: string;
}

@Injectable()
export class ExamService {
  constructor(private http: HttpClient) {}

  getAll(query: IExamQuery = {}) {
    return this.http.get(`${API_URL}/exams`, {
      params: new HttpParams({ fromObject: query as any })
    }) as Observable<IExamResponse[]>;
  }

  getById(examId: number) {
    return this.http.get(`${API_URL}/exams/${examId}`) as Observable<
      IExamResponse
    >;
  }
}
