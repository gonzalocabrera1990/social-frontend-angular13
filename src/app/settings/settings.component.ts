import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { RootState } from '../models/store/indexStore';
import { selectUser } from '../models/store/user/user.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;
  @ViewChild('cform') settingsFormDirective: any;
  check!: boolean;
  statusCheck!: string;
  loading!: boolean;
  status: boolean = true
  errMess!: string;
  formErrors: any = {
    'firstname': '',
    'lastname': '',
    'phrase': ''
  };

  validationMessages: any = {
    'firstname': {
      'maxlength':     'FirstName cannot be more than 30 characters long.'
    },
    'lastname': {
      'maxlength':     'Lastname cannot be more than 30 characters long.'
    },
    'phrase': {
      'maxlength':     'Phrase cannot be more than 100 characters long.'    }
  };

  constructor(private fb: FormBuilder, private userService: UsersService, 
    private router: Router, private store:Store<RootState>) { }

  ngOnInit() {
    this.store.select(state => state.user)
    .subscribe(data => {
      if(data.user){
        this.check = data.user.publicStatus
        this.statusCheck = data.user.publicStatus ? "Private user." : "Public user."
      }
       }, err => this.errMess = err)
    this.createForm();
  }
  
  createForm() {
    this.settingsForm = this.fb.group({
      firstname: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      lastname: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      phrase: ['', [Validators.minLength(2), Validators.maxLength(100)]],
      status: ['', Validators.required]
    }, { validator:this.atLeastOneValidator()});
    this.settingsForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  private atLeastOneValidator = () => {
    return (settingsForm : any) => {
        let controls = settingsForm.controls;
        if ( controls ) {
            let theOne = Object.keys(controls).find(key=> controls[key].value!=='');
            if ( !theOne ) {
                return {
                    atLeastOneRequired : {
                        text : 'At least one should be selected'
                    }
                }
            }
        }
        return null;
    };
};

  onValueChanged(data?: any) {
    if (!this.settingsForm) { return; }
    const form = this.settingsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  onSubmit() {
    this.loading = true
    this.userService.settingsUsers(this.settingsForm.value)
    .subscribe(resp =>{
      this.loading = false;
      this.router.navigate(['/userpage']);
    })
    this.settingsFormDirective.resetForm();
    this.settingsForm.reset({
      comment: ''
    });
  }
}
