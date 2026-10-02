import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { ContactMeForm } from '../../interfaces/contact-me-form';
import { SendEmailService } from '../../services/send-email.service';
import { SeoService } from '../../services/seo.service';
import { contactFormSchema, emptyContactForm } from './contact-form';

@Component({
  selector: 'app-contact',
  imports: [FormField, FormRoot],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  private readonly sendEmailService = inject(SendEmailService);
  private readonly seoService = inject(SeoService);
  private readonly injector = inject(Injector);

  private readonly emailModal =
    viewChild.required<ElementRef<HTMLDialogElement>>('emailModal');

  readonly emailPopUpHeader = signal('');
  readonly emailPopUpParagraph = signal('');

  readonly model = signal<ContactMeForm>(emptyContactForm());
  readonly contactForm = form(this.model, contactFormSchema, {
    submission: {
      action: () => this.send(),
      onInvalid: (field) =>
        field().errorSummary()[0]?.fieldTree().focusBoundControl(),
    },
  });

  ngOnInit(): void {
    this.seoService.updateMetaTags({
      description:
        'Get in touch with Dan Frunza, a .NET and Angular developer based in Sibiu, Romania.',
      path: '/contact',
    });
  }

  private async send(): Promise<void> {
    this.emailPopUpHeader.set('Hi, ' + this.model().name);
    this.emailPopUpParagraph.set('Sending...');
    // Opened once the new greeting is rendered, so screen readers announce it.
    // As a modal dialog it keeps the page behind it inert, closes with Escape
    // and hands focus back to the submit button when it closes.
    afterNextRender(() => this.emailModal().nativeElement.showModal(), {
      injector: this.injector,
    });

    try {
      await this.sendEmailService.sendEmailJS(this.model());
      this.emailPopUpParagraph.set('Your message was successfully sent!');
      this.contactForm().reset(emptyContactForm());
    } catch (error: unknown) {
      console.error('Error sending the contact message:', error);
      this.emailPopUpParagraph.set(
        'Something went wrong, please send an E-mail to frunzadan96@gmail.com.',
      );
    }
  }

  closeEmailModal(): void {
    this.emailModal().nativeElement.close();
  }
}
