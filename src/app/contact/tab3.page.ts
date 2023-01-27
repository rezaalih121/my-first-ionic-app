import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  dateExample = new Date().toISOString();
  contactForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      givenDate: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }
  get errorControl() {
    return this.contactForm.controls;
  }

  getDate(e: any) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    //this.contactForm.get('givenDate').setValue(date, { onlyself: true });
  }

  submitForm() {
    console.log('submitForm');
    this.isSubmitted = true;
    if (!this.contactForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.contactForm.value);
      return true;
    }
    const fv = this.contactForm.value;
  }
}
