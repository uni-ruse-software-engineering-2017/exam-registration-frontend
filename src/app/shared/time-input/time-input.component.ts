import { Component, forwardRef, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { MatSelectChange } from '@angular/material';

const TIME_REGEX = /^(:?[0-1][0-9]|2[0-3]):[0-5][0-9]$/; // [00:00, 23:59]

const isTime = (value: any) => {
  return typeof value === 'string' && TIME_REGEX.test(value);
};

@Component({
  selector: 'ru-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeInputComponent),
      multi: true
    }
  ]
})
export class TimeInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;

  hoursSelectList: any[] = [];
  minutesSelectList: any[] = [];
  propagateChange: (_: any) => {};
  minute: FormControl;
  hour: FormControl;

  value = '00:00';

  writeValue(value: string): void {
    if (value !== undefined && value !== null) {
      if (!isTime(value)) {
        throw Error(
          `<ru-time-input> - invalid value provided - ${value}. Expected time string '00:00' - '23:59'`
        );
      }

      const [hours, minutes] = value.split(':').map(v => +v);

      this.hour.setValue(hours);
      this.minute.setValue(minutes);
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.hour.disable();
      this.minute.disable();
    } else {
      this.hour.enable();
      this.minute.enable();
    }
  }

  constructor() {
    this.hour = new FormControl(0, [Validators.min(0), Validators.max(23)]);
    this.minute = new FormControl(0, [Validators.min(0), Validators.max(59)]);

    this.hoursSelectList = Array.from({ length: 24 }).map((_, i) => ({
      label: i < 10 ? '0' + i : `${i}`,
      value: i
    }));

    this.minutesSelectList = Array.from({ length: 12 }).map((_, i) => ({
      label: i <= 1 ? '0' + i * 5 : `${i * 5}`,
      value: i * 5
    }));
  }

  ngOnInit() {}

  onHourChanged(event: MatSelectChange) {
    this._setInputValue();
  }

  onMinuteChanged(event: MatSelectChange) {
    this._setInputValue();
  }

  _setInputValue() {
    const hours =
      this.hour.value < 10 ? '0' + this.hour.value : this.hour.value;
    const minutes =
      this.minute.value < 10 ? '0' + this.minute.value : this.minute.value;
    this.writeValue(`${hours}:${minutes}`);
    this.propagateChange(this.value);
  }
}
