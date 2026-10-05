import { ChangeDetectionStrategy, Component } from '@angular/core';

type FeatureIcon = 'bandage' | 'pulse' | 'applicator' | 'timer' | 'surgery' | 'flask' | 'badge' | 'lab';
type FeatureTone = 'primary' | 'secondary' | 'soft' | 'amber';

interface Feature {
  icon: FeatureIcon;
  tone: FeatureTone;
  title: string;
  text: string;
}

@Component({
  selector: 'app-key-features',
  templateUrl: './key-features.html',
  styleUrl: './key-features.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyFeatures {
  readonly badge = 'المواصفات السريرية';
  readonly title = 'المميزات الرئيسية لعلاج بايل فاج';
  readonly subtitle =
    'عناية متكاملة مصممة بأعلى المقاييس الألمانية لتقديم راحة فورية وحلول موضعية فعالة بدون تدخلات جراحية.';

  readonly features: Feature[] = [
    {
      icon: 'bandage',
      tone: 'primary',
      title: 'يساعد في علاج البواسير الداخلية والخارجية',
      text: 'تغطية مزدوجة ومباشرة لكافة درجات الالتهاب البواسيري وتخفيف الاحتقان الموضعي.',
    },
    {
      icon: 'pulse',
      tone: 'secondary',
      title: 'يساعد في علاج الشروخ الشرجية',
      text: 'يعزز بيئة الشفاء السريعة للأنسجة الرقيقة المتشققة ويحد من تكرار النزف والألم.',
    },
    {
      icon: 'applicator',
      tone: 'soft',
      title: 'استخدام موضعي وسهل',
      text: 'قوام خفيف سريع الامتصاص، مزود بأداة تطبيق دقيقة ومريحة للمريض في المنزل.',
    },
    {
      icon: 'timer',
      tone: 'amber',
      title: 'إحساس بالراحة من أول استخدام',
      text: 'مركبات تخدير موضعي تبدأ بالعمل الفوري لتهدئة الحرقة، الحكة، والألم الحاد.',
    },
    {
      icon: 'surgery',
      tone: 'secondary',
      title: 'بديل موضعي للعلاج الجراحي في الحالات المناسبة',
      text: 'يغنيك عن فترات التعافي الجراحية الصعبة متى ما تم الالتزام بالكورس المقترح.',
    },
    {
      icon: 'flask',
      tone: 'primary',
      title: 'يحتوي على مواد فعالة متعددة',
      text: 'تركيبة تآزرية تجمع بين مضادات البكتيريا، التسكين، والترطيب وإزالة التورم.',
    },
    {
      icon: 'badge',
      tone: 'soft',
      title: 'حاصل على علامة الجودة الأوروبية',
      text: 'مطابق لمعايير الأمان CE للصناعات الدوائية والعلاجية المتطورة.',
    },
    {
      icon: 'lab',
      tone: 'primary',
      title: 'من إنتاج شركة Remus الألمانية',
      text: 'أبحاث حيوية متقدمة وتصنيع فائق الدقة وفق اشتراطات المختبرات الألمانية.',
    },
  ];
}