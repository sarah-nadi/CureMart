import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import emailjs from '@emailjs/browser';
import { EMAILJS } from './emailjs.config';

type PackageId = 'single' | 'course';
type Status = 'idle' | 'sending' | 'success' | 'error';
type FieldName = 'name' | 'phone' | 'governorate' | 'address';

interface Package {
  id: PackageId;
  label: string;
  shortLabel: string;
  price: number;
  priceLabel: string;
  badge?: string;
}

/** يحوّل الأرقام العربية للإنجليزي ويشيل المسافات والرموز و +2 */
function normalizePhone(value: string): string {
  let s = (value ?? '')
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\s\-+()]/g, '');
  if (/^201[0125]\d{8}$/.test(s)) s = '0' + s.slice(2);
  return s;
}

function egPhone(control: AbstractControl): ValidationErrors | null {
  return /^01[0125]\d{8}$/.test(normalizePhone(control.value)) ? null : { phone: true };
}

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly doc = inject(DOCUMENT);

  readonly badge = 'طلب مباشر وسريع';
  readonly title = 'ابدأ رحلة الراحة الآن';
  readonly subtitle = 'السعر شامل الشحن لجميع المحافظات والدفع متاح عند الاستلام';

  readonly whatsappHref =
    'https://wa.me/201025141193?text=' +
    encodeURIComponent('مرحباً 👋 أريد طلب علاج Pile Phage.');

  readonly packages: Package[] = [
    {
      id: 'single',
      label: 'عبوة واحدة (الدرجة الأولى)',
      shortLabel: 'عبوة واحدة (الدرجة الأولى)',
      price: 540,
      priceLabel: '540',
    },
    {
      id: 'course',
      label: 'كورس عبوتين (الدرجة 2 و 3)',
      shortLabel: 'كورس عبوتين (الدرجة 2 و 3)',
      price: 1080,
      priceLabel: '1,080',
      badge: 'الأفضل طلباً',
    },
  ];

  readonly governorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'البحيرة', 'الفيوم', 'الغربية',
    'الإسماعيلية', 'المنوفية', 'المنيا', 'القليوبية', 'الوادي الجديد', 'السويس',
    'الشرقية', 'دمياط', 'بورسعيد', 'جنوب سيناء', 'كفر الشيخ', 'مطروح', 'الأقصر',
    'قنا', 'شمال سيناء', 'سوهاج', 'بني سويف', 'أسيوط', 'أسوان', 'البحر الأحمر',
  ];

  readonly form = this.fb.group({
    package: this.fb.control<PackageId>('single'),
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, egPhone]],
    governorate: ['', Validators.required],
    address: ['', [Validators.required, Validators.minLength(10)]],
    website: [''], // honeypot للبوتات: لازم يفضل فاضي
  });

  readonly status = signal<Status>('idle');

  private readonly packageId = toSignal(this.form.controls.package.valueChanges, {
    initialValue: this.form.controls.package.value,
  });

  readonly selected = computed(
    () => this.packages.find((p) => p.id === this.packageId()) ?? this.packages[0],
  );

  invalid(name: FieldName): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  errorText(name: FieldName): string {
    const e = this.form.controls[name].errors;
    if (!e) return '';
    switch (name) {
      case 'name':
        return e['required'] ? 'من فضلك اكتب اسمك' : 'الاسم قصير جداً';
      case 'phone':
        return e['required']
          ? 'من فضلك اكتب رقم الهاتف'
          : 'اكتب رقم موبايل مصري صحيح (مثال: 01012345678)';
      case 'governorate':
        return 'من فضلك اختر المحافظة';
      case 'address':
        return e['required']
          ? 'من فضلك اكتب العنوان بالتفصيل'
          : 'اكتب العنوان بتفصيل أكثر (المدينة، الحي، الشارع)';
    }
  }

  async submit(): Promise<void> {
    if (this.status() === 'sending') return;

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      // نركز على أول حقل فيه خطأ
      setTimeout(() => {
        this.doc
          .querySelector<HTMLElement>(
            '#order .field.is-invalid input, #order .field.is-invalid select',
          )
          ?.focus();
      });
      return;
    }

    // لو البوت ملّا الحقل المخفي، نتجاهل الطلب بدون ما نبعت حاجة
    if (this.form.controls.website.value) {
      this.status.set('success');
      return;
    }

    const v = this.form.getRawValue();
    const pkg = this.selected();
    this.status.set('sending');

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          name: v.name.trim(),
          phone: normalizePhone(v.phone),
          governorate: v.governorate,
          address: v.address.trim(),
          package: pkg.label,
          price: pkg.priceLabel,
        },
        { publicKey: EMAILJS.publicKey },
      );
      this.form.reset();
      this.status.set('success');
      setTimeout(() =>
        this.doc.querySelector('#order .formcard')?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      );
    } catch {
      this.status.set('error');
    }
  }

  newOrder(): void {
    this.status.set('idle');
  }
}