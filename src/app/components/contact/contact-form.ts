import {
  email,
  maxLength,
  minLength,
  pattern,
  required,
  schema,
} from '@angular/forms/signals';
import { ContactMeForm } from '../../interfaces/contact-me-form';
import { NOT_BLANK, PHONE_PATTERN } from '../../shared/form-patterns';

export const NAME_MIN_LENGTH = 2;
export const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 1000;

export const emptyContactForm = (): ContactMeForm => ({
  name: '',
  email: '',
  phone: '',
  message: '',
});

export const contactFormSchema = schema<ContactMeForm>((p) => {
  required(p.name, { message: 'Please enter your name.' });
  pattern(p.name, NOT_BLANK, { message: 'Please enter your name.' });
  minLength(p.name, NAME_MIN_LENGTH, {
    message: `Name must be at least ${NAME_MIN_LENGTH} characters.`,
  });

  required(p.email, { message: 'Please enter your email address.' });
  email(p.email, { message: 'Please enter a valid email address.' });

  // The phone number is optional, so only its format is checked once filled in.
  pattern(p.phone, PHONE_PATTERN, {
    message: 'Please enter a valid phone number.',
  });

  required(p.message, { message: 'Please enter a message.' });
  pattern(p.message, NOT_BLANK, { message: 'Please enter a message.' });
  minLength(p.message, MESSAGE_MIN_LENGTH, {
    message: `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
  });
  maxLength(p.message, MESSAGE_MAX_LENGTH, {
    message: `Message can be at most ${MESSAGE_MAX_LENGTH} characters.`,
  });
});
