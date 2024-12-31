import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CreditingService } from '../../services/crediting.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ReceiveMethod } from '../../interfaces/receive-method';
import { PricingPlan } from '../../interfaces/pricing-plan';
import { Credit } from '../../interfaces/credit';
import { User } from '../../interfaces/user';
import { FileToUpload } from '../../interfaces/file-to-upload';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-credit-form',
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    CardModule,
    ButtonModule,
    SelectModule,
    InputNumberModule,
  ],
  templateUrl: './credit-form.component.html',
  styleUrl: './credit-form.component.css',
})
export class CreditFormComponent implements OnInit {
  pricingPlans: PricingPlan[] | undefined;
  receiveMethods: ReceiveMethod[] | undefined;
  uploadedFiles: FileToUpload[] = [];

  @ViewChild('fileUpload') fileUpload: any;

  constructor(
    private creditingService: CreditingService,
    private messageService: MessageService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.creditingService.getReceiveMethodsList().subscribe({
      next: (data) => {
        this.receiveMethods = data;
      },
      error: (error) => {
        console.error('Unable to load receive methods list', error);
      },
    });

    this.creditingService.getPricingPlansList().subscribe({
      next: (data) => {
        this.pricingPlans = data;
      },
      error: (error) => {
        console.error('Unable to load pricing plans list', error);
      },
    });
  }

  creditForm = new FormGroup({
    amount: new FormControl(100, [Validators.required, Validators.min(100)]),
    selectedReceiveMethod: new FormControl<ReceiveMethod | null>(null, [Validators.required]),
    selectedPricingPlan: new FormControl<PricingPlan | null>(null, [Validators.required]),
    filesUpload: new FormControl<FileToUpload[]>([], [Validators.required]),
  });

  onFileUpload(event: any) {
    const files = event.files as File[];

    const { validFiles, errors } = this.fileUploadService.validateFiles(files);

    if (errors.length > 0) {
      errors.forEach((error) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error,
          life: 3000,
        })
      );
    }

    this.uploadedFiles = [...this.uploadedFiles, ...validFiles];

    this.creditForm.patchValue({ filesUpload: this.uploadedFiles });
  }

  onFileRemove(event: any) {
    if (this.uploadedFiles) {
      this.uploadedFiles = this.uploadedFiles.filter((file) => file.name !== event.file.name);
    }

    this.creditForm.patchValue({ filesUpload: this.uploadedFiles });
  }

  handleSubmit() {
    if (this.creditForm.valid) {
      const userInLocalStorage = localStorage.getItem('user');
      if (!userInLocalStorage) {
        console.error('User data not found in localStorage');
        return;
      }
      const userObject = JSON.parse(userInLocalStorage);

      const creditData = {
        userId: userObject.id as User,
        userEmail: userObject.email as User,
        ...this.creditForm.value,
      };

      this.creditingService.registerNewCredit(creditData as Credit).subscribe({
        next: (response) => {
          this.uploadedFiles = [];
          this.creditForm.reset(); // Сбрасываем всю форму
          this.creditForm.patchValue({ filesUpload: this.uploadedFiles });
          if (this.fileUpload) {
            this.fileUpload.clear();
          }
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Credit successfully registered!',
            life: 3000,
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Credit register failed!',
            life: 3000,
          });
          console.error('Failed to save credit:', err);
        },
      });
    }
  }

  get amount() {
    return this.creditForm.controls['amount'];
  }
}
