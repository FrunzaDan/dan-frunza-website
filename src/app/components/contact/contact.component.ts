import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly contactForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[+]?[0-9\s()-]{7,20}$/)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected readonly submitted = signal(false);

  protected onSubmit(): void {
    this.submitted.set(true);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // TODO: send this via EmailJS once the backend is wired up.
    console.log(this.contactForm.getRawValue());
  }
}
