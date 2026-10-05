import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Ingredient {
  name: string;
  tag: string;
  text: string;
  benefit: string;
  wide?: boolean;
}

@Component({
  selector: 'app-active-ingredients',
  templateUrl: './active-ingredients.html',
  styleUrl: './active-ingredients.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveIngredients {
  readonly badge = 'الصيغة الصيدلانية';
  readonly title = 'المواد الفعالة ومكونات التركيبة';
  readonly subtitle =
    'مركبات دوائية مدروسة بعناية تعمل معًا بتكامل وتوافق لتسريع التعافي وتسكين الأنسجة.';

  readonly ingredients: Ingredient[] = [
    {
      name: 'Gentamicin',
      tag: 'مضاد بكتيري',
      text: 'مادة فعالة ذات خصائص مضادة للبكتيريا، تحمي الشروخ والمناطق المتضررة من العدوى والملوثات المعوية.',
      benefit: 'حماية موضعية واسعة المدى',
    },
    {
      name: 'Lidocaine + Prilocaine',
      tag: 'تسكين فوري',
      text: 'مواد ذات تأثير مخدر موضعي للمساعدة على تخفيف الألم الحاد والشعور المزعج بالحرقة عند اللمس.',
      benefit: 'تأثير مزدوج ممتد المفعول',
    },
    {
      name: 'Dexpanthenol',
      tag: 'مرمم للأنسجة',
      text: 'يساعد على ترطيب وتهدئة المنطقة المصابة وتحفيز التجدد الطبيعي لطبقات الجلد والغشاء المخاطي المتهيج.',
      benefit: 'ترطيب عميق وسرعة الالتئام',
    },
    {
      name: 'Butanamide',
      tag: 'مليّن ومرطب',
      text: 'يساعد في ترطيب مكان الألم ومنع جفاف الحواف الشرجية مما يقلل الاحتكاك المؤلم أثناء التبرز والجلوس.',
      benefit: 'حماية مرنة للأنسجة المجهدة',
    },
    {
      name: 'Hydrocortisone',
      tag: 'مضاد للالتهاب',
      text: 'يساعد على تخفيف الالتهاب والأعراض المصاحبة مثل انتفاخ الأوردة، الحكة الشديدة، والحرارة الموضعية بجرعة سريرية متوازنة وآمنة.',
      benefit: 'تقليص التورم والاحتقان الوعائي',
      wide: true,
    },
  ];
}