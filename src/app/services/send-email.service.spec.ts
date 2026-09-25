import { TestBed } from '@angular/core/testing';
import emailjs from '@emailjs/browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { environment } from '../../environments/environment';
import { ContactMeForm } from '../interfaces/contact-me-form';
import { SendEmailService } from './send-email.service';

vi.mock('@emailjs/browser', () => ({
  default: {
    send: vi.fn(),
  },
}));

describe('SendEmailService', () => {
  let service: SendEmailService;

  const form: ContactMeForm = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+40 712 345 678',
    message: 'Hello there, nice website!',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailService);
    vi.mocked(emailjs.send).mockReset();
  });

  it('sends the form fields via emailjs using the configured credentials', async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: 'OK' });

    await service.sendEmailJS(form);

    expect(emailjs.send).toHaveBeenCalledWith(
      environment.emailJSConfig.serviceID,
      environment.emailJSConfig.templateID,
      {
        from_name: form.name,
        from_email: form.email,
        from_phone: form.phone,
        from_message: form.message,
      },
      environment.emailJSConfig.publicKey,
    );
  });

  it('rejects with the EmailJS error when sending fails', async () => {
    const error = new Error('network down');
    vi.mocked(emailjs.send).mockRejectedValue(error);

    await expect(service.sendEmailJS(form)).rejects.toBe(error);
  });
});
