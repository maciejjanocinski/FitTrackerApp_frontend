import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import axios from "axios";
import {backendBaseUrl} from "../../../apiUtils";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    userData: any;
    UserDataForm: FormGroup = new FormGroup({});
    UserDataFormError: string = '';
    isFormEnabled: boolean = false;

    isPasswordFormEnabled: boolean = false;
    passwordFormError: string = '';
    passwordForm: FormGroup = new FormGroup({});

    isUsernameFormEnabled: boolean = false;
    usernameFormError: string = '';
    usernameForm: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.getUser();
        this.passwordForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmNewPassword: ['', Validators.required],
        });

    }
    authHeader  = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    getUser() {
        axios
            .get<any>(backendBaseUrl + '/user/', this.authHeader)
            .then((response) => {
                this.userData = response.data;

                this.UserDataForm = this.formBuilder.group({
                    name: [`${this.userData.name}`, Validators.required],
                    surname: [`${this.userData.surname}`, Validators.required],
                    gender: [`${this.userData.gender}`, Validators.required],
                    email: [`${this.userData.email}`, Validators.required],
                    phone: [`${this.userData.phone}`, Validators.required],
                });

                this.usernameForm = this.formBuilder.group({
                    username: [`${this.userData.username}`, Validators.required],
                });

                this.UserDataForm.disable();
                this.passwordForm.disable();
                this.usernameForm.disable();

            })
            .catch((error) => {
                console.log(error);
            });
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
            .patch<any>(backendBaseUrl + '/user/',editUserDto, this.authHeader).then((response) => {
                this.userData = response.data;
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
            gender: this.userData.gender,
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

    isFormDisabled() {
        return !this.isFormEnabled;
    }

    isPasswordFormDisabled() {
        return !this.isPasswordFormEnabled;
    }

    isUsernameFormDisabled() {
        return !this.isUsernameFormEnabled;
    }


}
