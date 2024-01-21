import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";
import {animate, style, transition, trigger} from "@angular/animations";
import {BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {DeleteModalComponent} from "./deleteModal.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.3s ease-in-out', style({opacity: 1})),
      ]),
    ]),
  ],
})
export class UserComponent implements OnInit {
  userData: any;

  bodyMetricsForm: FormGroup = new FormGroup({});
  bodyMetricsError: string = '';
  isBodyMetricsFormEnabled: boolean = false;

  UserDataForm: FormGroup = new FormGroup({});
  UserDataFormError: string = '';
  isFormEnabled: boolean = false;

  isPasswordFormEnabled: boolean = false;
  passwordFormError: string = '';
  passwordForm: FormGroup = new FormGroup({});

  isUsernameFormEnabled: boolean = false;
  usernameFormError: string = '';
  usernameForm: FormGroup = new FormGroup({});

  isDeleteFormEnabled: boolean = false;
  deleteFormError: string = '';
  deleteForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
    this.deleteForm = this.formBuilder.group({
      deletePassword: ['', Validators.required],
    });

  }

  authHeader = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }

  getUser() {
    axios
      .get<any>(backendBaseUrl + '/user/', this.authHeader)
      .then((response) => {
        console.log(response.data)
        this.userData = response.data;

        this.UserDataForm = this.formBuilder.group({
          name: [`${this.userData.name}`, Validators.required],
          surname: [`${this.userData.surname}`, Validators.required],
          gender: [`${this.userData.gender}`, Validators.required],
          email: [`${this.userData.email}`, Validators.required],
          phone: [`${this.userData.phone}`, Validators.required],
        });

        this.bodyMetricsForm = this.formBuilder.group({
          gender: [`${this.userData.bodyMetrics.gender}`, Validators.required],
          birthDate: [`${this.userData.bodyMetrics.birthDate}`, Validators.required],
          height: [`${this.userData.bodyMetrics.height}`, Validators.required],
          weight: [`${this.userData.bodyMetrics.weight}`, Validators.required],
          neck: [`${this.userData.bodyMetrics.neck}`, Validators.required],
          waist: [`${this.userData.bodyMetrics.waist}`, Validators.required],
          hip: [`${this.userData.bodyMetrics.hip}`, Validators.required],
        });

        this.usernameForm = this.formBuilder.group({
          username: [`${this.userData.username}`, Validators.required],
        });

        this.UserDataForm.disable();
        this.passwordForm.disable();
        this.usernameForm.disable();
        this.deleteForm.disable();
        this.bodyMetricsForm.disable();

      })
      .catch((error) => {
        console.log(error);
      });
  }

  editBodyMetrics() {
    if (this.UserDataForm.invalid) {
      this.UserDataFormError = "Please fill all fields";
      return;
    }

    const formValues = this.bodyMetricsForm.value;

    const editUserDto: any = {
      gender: formValues.gender,
      birthDate: formValues.birthDate,
      height: formValues.height,
      weight: formValues.weight,
      neck: formValues.neck,
      waist: formValues.waist,
      hip: formValues.hip,
    };

    axios
      .post<any>(backendBaseUrl + '/body-metrics/', editUserDto, this.authHeader).then((response) => {
      this.userData = response.data;
      console.log(response.data)
      this.UserDataForm.reset();
      this.UserDataFormError = '';
      this.getUser();
    })
      .catch((error) => {
        this.UserDataFormError = error.response.data;
      });

    this.isBodyMetricsFormEnabled = false;
    this.bodyMetricsForm.disable();
  }

  editUserData() {
    if (this.UserDataForm.invalid) {
      this.UserDataFormError = "Please fill all fields";
      return;
    }

    const formValues = this.UserDataForm.value;
    const usernameData = this.usernameForm.value;

    const editUserDto: any = {
      username: usernameData.username,
      name: formValues.name,
      surname: formValues.surname,
      gender: formValues.gender,
      email: formValues.email,
      phone: formValues.phone,
    };

    axios
      .patch<any>(backendBaseUrl + '/user/', editUserDto, this.authHeader).then((response) => {
      this.userData = response.data;
      console.log(response.data)
      this.UserDataForm.reset();
      this.UserDataFormError = '';
      this.getUser();
    })
      .catch((error) => {
        this.UserDataFormError = error.response.data;
      });

    this.isFormEnabled = false;
    this.UserDataForm.disable();
  }

  editPassword() {
    if (this.passwordForm.invalid) {
      this.passwordFormError = "Please fill all fields";
      return;
    }

    const formValues = this.passwordForm.value;

    const editPasswordDto: any = {
      oldPassword: formValues.oldPassword,
      newPassword: formValues.newPassword,
      confirmNewPassword: formValues.confirmNewPassword,
    };

    axios
      .patch<any>(backendBaseUrl + '/user/password', editPasswordDto, this.authHeader)
      .then((response) => {
        this.passwordForm.reset();
        this.passwordFormError = '';
        this.getUser();
      })
      .catch((error) => {
        this.passwordFormError = error.response.data;
      });

    this.isPasswordFormEnabled = false;
    this.passwordForm.disable();
  }

  editUsername() {
    if (this.usernameForm.invalid) {
      this.usernameFormError = "Please fill all fields";
      return;
    }

    const formValues = this.usernameForm.value;

    const editUserDto: any = {
      username: formValues.username,
      name: this.userData.name,
      surname: this.userData.surname,
      email: this.userData.email,
      phone: this.userData.phone,
    };

    console.log(editUserDto);

    axios
      .patch<any>(backendBaseUrl + '/user/', editUserDto, this.authHeader)
      .then((response) => {
        localStorage.setItem('token', response.data);
        this.authHeader = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
        this.usernameForm.reset();
        this.usernameFormError = '';
        this.getUser();
      })
      .catch((error) => {
        this.usernameFormError = error.response.data;
      });

    this.isUsernameFormEnabled = false;
    this.usernameForm.disable();
  }

  deleteProfile() {
    if (this.deleteForm.invalid) {
      this.deleteFormError = "Please fill all fields";
      return;
    }

    const formValues = this.deleteForm.value;

    const deleteProfileDto: any = {
      password: formValues.deletePassword,
    };

    axios
      .delete<any>(backendBaseUrl + '/user/', {
        data: deleteProfileDto,
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
      })
      .then((response) => {
        this.deleteForm.reset();
        this.deleteFormError = '';
        localStorage.removeItem('token');
        const modalRef = this.modalService.show(DeleteModalComponent);
        this.router.navigate(['/auth/register']);
      })
      .catch((error) => {
        this.deleteFormError = error.response.data;
      }).finally(() => {
    });

    this.isDeleteFormEnabled = false;
    this.deleteForm.disable();
  }

  toggleBodyMetricsForm() {
    this.isBodyMetricsFormEnabled = !this.isBodyMetricsFormEnabled;

    if (this.isBodyMetricsFormEnabled) {
      this.bodyMetricsForm.enable();
    } else {
      this.bodyMetricsForm.disable();
    }
  }

  toggleForm() {
    this.isFormEnabled = !this.isFormEnabled;

    if (this.isFormEnabled) {
      this.UserDataForm.enable();
    } else {
      this.UserDataForm.disable();
    }
  }

  togglePasswordForm() {
    this.isPasswordFormEnabled = !this.isPasswordFormEnabled;

    if (this.isPasswordFormEnabled) {
      this.passwordForm.enable();
    } else {
      this.passwordForm.disable();
    }
  }

  toggleUsernameForm() {
    this.isUsernameFormEnabled = !this.isUsernameFormEnabled;

    if (this.isUsernameFormEnabled) {
      this.usernameForm.enable();
    } else {
      this.usernameForm.disable();
    }
  }

  toggleDeleteForm() {
    this.isDeleteFormEnabled = !this.isDeleteFormEnabled;

    if (this.isDeleteFormEnabled) {
      this.deleteForm.enable();
    } else {
      this.deleteForm.disable();
    }
  }

  isBodyMetricsFormDisabled() {
    return !this.isBodyMetricsFormEnabled;
  }

  isFormDisabled() {
    return !this.isFormEnabled;
  }

  isPasswordFormDisabled() {
    return !this.isPasswordFormEnabled;
  }

  isUsernameFormDisabled() {
    return !this.isUsernameFormEnabled;
  }

  isDeleteFormDisabled() {
    return !this.isDeleteFormEnabled;
  }

}
