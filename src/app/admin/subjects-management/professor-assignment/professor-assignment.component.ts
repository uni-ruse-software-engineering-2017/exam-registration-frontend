import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, flatMap, map } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../../core/http-error-handler.service';
import { IProfessorResponse } from '../../../core/models/http-responses';
import { SubjectService } from '../../../core/services/subject.service';
import { IProfessor, ISubject } from '../../../models/professor.model';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'ru-professor-assignment',
  templateUrl: './professor-assignment.component.html',
  styleUrls: ['./professor-assignment.component.scss']
})
export class ProfessorAssignmentComponent implements OnInit {
  form: FormGroup;
  subject: ISubject;
  professors: IProfessor[] = [];
  professorsDropDown: Array<{ label: string; value: string }> = [];

  constructor(
    private subjectService: SubjectService,
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    private errorHandler: HttpErrorHandlerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      professorToAssign: ['', [Validators.required]]
    });

    this.route.params
      .pipe(
        map(params => +params['subjectId']),
        flatMap(id => this.getSubject(id))
      )
      .subscribe(
        subject => {
          this.subject = subject;
          this.getProfessors(this.subject);
        },
        error => this.errorHandler.handle(error)
      );
  }

  getSubject(serviceId: number) {
    return this.subjectService.getById(serviceId);
  }

  getProfessors(subject: ISubject) {
    this.professorService.getAll().subscribe(professors => {
      // the professors who are assigned to this subject
      this.professors = professors.filter(
        p =>
          p.subjectsTeaching.filter(subj => subj.id === subject.id).length > 0
      );

      // the professors for the dropdown (not assigned to this subject)
      this.professorsDropDown = professors
        .filter(
          p =>
            p.subjectsTeaching.filter(subj => subj.id === subject.id).length ===
            0
        )
        .map(p => ({
          label: `${p.fullName} (${p.username})`,
          value: p.username
        }));
    });
  }

  assign() {
    if (this.form.invalid) {
      return false;
    }

    const professorUsername = this.form.value['professorToAssign'] || '';

    this.subjectService
      .addAssignee(this.subject.id, professorUsername)
      .subscribe(
        () => {
          this.getProfessors(this.subject);
          this.form.markAsUntouched();
          this.form.markAsPristine();
        },
        error => this.errorHandler.handle(error)
      );
  }

  unassign(professorUsername: string) {
    this.subjectService
      .removeAssignee(this.subject.id, professorUsername)
      .subscribe(
        () => this.getProfessors(this.subject),
        error => this.errorHandler.handle(error)
      );
  }
}
