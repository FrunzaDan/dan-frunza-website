import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContactMeForm } from '../../interfaces/contact-me-form';
import { SendEmailService } from '../../services/send-email.service';
import { ContactComponent } from './contact.component';
import { emptyContactForm } from './contact-form';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let sendEmailService: { sendEmailJS: ReturnType<typeof vi.fn> };

  const validForm: ContactMeForm = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '',
    message: 'Hello there, nice website!',
  };

  const dialog = (): HTMLDialogElement =>
    fixture.nativeElement.querySelector('dialog');

  const submitForm = async (): Promise<void> => {
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    sendEmailService = { sendEmailJS: vi.fn() };

    // jsdom has no modal dialog support, so opening and closing only toggle `open`.
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
    };

    TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [{ provide: SendEmailService, useValue: sendEmailService }],
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  describe('validation', () => {
    it('requires the name, email and message', () => {
      expect(component.contactForm().invalid()).toBe(true);
      expect(component.contactForm.name().errors()[0].message).toBe(
        'Please enter your name.',
      );
      expect(component.contactForm.email().errors()[0].message).toBe(
        'Please enter your email address.',
      );
      expect(component.contactForm.message().errors()[0].message).toBe(
        'Please enter a message.',
      );
    });

    it('leaves the phone number optional but checks its format', () => {
      expect(component.contactForm.phone().valid()).toBe(true);

      component.model.set({ ...validForm, phone: 'call me' });

      expect(component.contactForm.phone().errors()[0].message).toBe(
        'Please enter a valid phone number.',
      );
    });

    it('flags an invalid email format', () => {
      component.model.set({ ...validForm, email: 'not-an-email' });

      expect(component.contactForm.email().errors()[0].message).toBe(
        'Please enter a valid email address.',
      );
    });

    it('does not accept a message of only spaces', () => {
      component.model.set({ ...validForm, message: '           ' });

      expect(component.contactForm.message().invalid()).toBe(true);
    });

    it('accepts a filled-in form', () => {
      component.model.set(validForm);

      expect(component.contactForm().valid()).toBe(true);
    });
  });

  describe('submitting', () => {
    it('does not call the email service when the form is invalid', async () => {
      await submitForm();

      expect(sendEmailService.sendEmailJS).not.toHaveBeenCalled();
      expect(dialog().open).toBe(false);
    });

    it('shows a success message and resets the form when the email is sent', async () => {
      sendEmailService.sendEmailJS.mockResolvedValue(undefined);
      component.model.set(validForm);

      await submitForm();

      expect(sendEmailService.sendEmailJS).toHaveBeenCalledWith(validForm);
      expect(dialog().open).toBe(true);
      expect(component.emailPopUpHeader()).toBe('Hi, Jane Doe');
      expect(component.emailPopUpParagraph()).toBe(
        'Your message was successfully sent!',
      );
      expect(component.model()).toEqual(emptyContactForm());
    });

    it('shows a failure message and keeps what was typed when sending fails', async () => {
      sendEmailService.sendEmailJS.mockRejectedValue(new Error('network'));
      vi.spyOn(console, 'error').mockImplementation(() => undefined);
      component.model.set(validForm);

      await submitForm();

      expect(component.emailPopUpParagraph()).toContain(
        'Something went wrong',
      );
      expect(component.model()).toEqual(validForm);
    });

    it('closes the popup with the OK button', async () => {
      sendEmailService.sendEmailJS.mockResolvedValue(undefined);
      component.model.set(validForm);
      await submitForm();

      dialog().querySelector('button')!.click();

      expect(dialog().open).toBe(false);
    });
  });
});
