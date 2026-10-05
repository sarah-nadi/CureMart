import { ChangeDetectionStrategy, Component } from '@angular/core';

type ConditionIcon = 'internal' | 'external' | 'fissure' | 'fistula';

interface Condition {
  icon: ConditionIcon;
  title: string;
  text: string;
}

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.html',
  styleUrl: './conditions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Conditions {
  readonly badge = 'التشخيص والرعاية';
  readonly title = 'مناسب لكل من الحالات التالية';
  readonly subtitle = 'عناية طبية متخصصة ومصممة بأعلى معايير الأمان دون الحاجة لأي قلق.';

  readonly conditions: Condition[] = [
    {
      icon: 'internal',
      title: 'البواسير الداخلية',
      text: 'يساعد في تقليص الأوردة المتضخمة داخل القناة الشرجية ويوقف النزيف الخفيف والشعور بالثقل.',
    },
    {
      icon: 'external',
      title: 'البواسير الخارجية',
      text: 'يهدئ الكتل الخارجية المتورمة ويزيل الإحساس بالحرقان والشد والتهيج أثناء الجلوس أو المشي.',
    },
    {
      icon: 'fissure',
      title: 'الشروخ الشرجية',
      text: 'يسرّع التئام التشققات الجلدية الحادة والمزمنة ويزيل الألم الحاد التابع لعملية الإخراج.',
    },
    {
      icon: 'fistula',
      title: 'الناسور الشرجي',
      text: 'يعمل كعناية موضعية مساعدة للتطهير والسيطرة على الإفرازات والتورمات الجانبية المؤلمة.',
    },
  ];
}