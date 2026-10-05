import { ChangeDetectionStrategy, Component } from '@angular/core';

type ReasonIcon = 'nosurgery' | 'bolt' | 'kit' | 'touch';
type ReasonTone = 'mint' | 'deep' | 'peach';

interface Reason {
  icon: ReasonIcon;
  tone: ReasonTone;
  title: string;
  text: string;
  note: string;
}

@Component({
  selector: 'app-why-choose',
  templateUrl: './why-choose.html',
  styleUrl: './why-choose.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyChoose {
  readonly badge = 'الفعالية الطبية';
  readonly title = 'لماذا تختار بايل فاج (Pile Phage)؟';
  readonly subtitle =
    'حل سريع وموضعي بدون الحاجة للجراحة في الحالات المناسبة، يمنحك الراحة الكاملة بأسلوب آمن ودقيق.';

  readonly tech = {
    title: 'تقنية البكتيريوفاج الموجهة',
    text: 'استهداف البكتيريا الضارة دون الإخلال بالتوازن الحيوي',
  };

  readonly reasons: Reason[] = [
    {
      icon: 'nosurgery',
      tone: 'mint',
      title: 'بدون جراحة',
      text: 'استخدام موضعي يساعد على تجنب التدخل الجراحي ومخاطره في الحالات المناسبة دون الحاجة لفترات نقاهة مرهقة.',
      note: 'آمن للاستخدام المنزلي',
    },
    {
      icon: 'bolt',
      tone: 'mint',
      title: 'تخفيف الألم',
      text: 'يحتوي على مواد ذات تأثير مخدر موضعي تعزل المستقبلات العصبية وتوفر هدوءًا سريعاً للحرقة والوخز المؤلم.',
      note: 'تأثير ملحوظ من الدقائق الأولى',
    },
    {
      icon: 'kit',
      tone: 'deep',
      title: 'مضاد للبكتيريا والالتهابات',
      text: 'يساعد على تطهير منطقة الإصابة والعناية بها، وتقليص حجم الأوعية الدموية المتورمة وإيقاف التدهور الميكروبي.',
      note: 'تطهير شامل ومستمر',
    },
    {
      icon: 'touch',
      tone: 'peach',
      title: 'سهولة الاستخدام',
      text: 'يستخدم كدهان موضعي وبطريقة بسيطة وسريعة لا تسبب أي إزعاج أو اتساخ، مع امتصاص جلدي فائق التوافق.',
      note: 'تطبيق سريع دون فوضى',
    },
  ];
}