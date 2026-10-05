import { ChangeDetectionStrategy, Component } from '@angular/core';

type TrustIcon = 'badge' | 'flag' | 'support';
type TrustTone = 'mint' | 'secondary' | 'primary';

interface TrustItem {
  icon: TrustIcon;
  tone: TrustTone;
  title: string;
  text: string;
}

@Component({
  selector: 'app-trust-strip',
  templateUrl: './trust-strip.html',
  styleUrl: './trust-strip.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrustStrip {
  readonly items: TrustItem[] = [
    {
      icon: 'badge',
      tone: 'mint',
      title: 'علامة الجودة الأوروبية',
      text: 'حاصل على شهادة CE المطابقة للمعايير الصيدلانية الصارمة بالاتحاد الأوروبي.',
    },
    {
      icon: 'flag',
      tone: 'secondary',
      title: 'من إنتاج شركة Remus الألمانية',
      text: 'إنتاج وتعبئة في مختبرات متطورة بألمانيا لضمان أقصى نقاء للمواد الفعالة.',
    },
    {
      icon: 'support',
      tone: 'primary',
      title: 'متابعة أثناء الاستخدام وبعده',
      text: 'فريق صيدلي متخصص متاح لمتابعة التطور العلاجي واستفسارات المريض بسرية تامة.',
    },
  ];
}