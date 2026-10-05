import { ChangeDetectionStrategy, Component } from '@angular/core';

type StepIcon = 'calendar' | 'thumb' | 'shield';

interface Step {
  no: string;
  tag: string;
  title: string;
  text: string;
  foot: string;
  icon: StepIcon;
  featured?: boolean;
}

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.html',
  styleUrl: './protocol.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Protocol {
  readonly badge = 'بروتوكول الجرعات';
  readonly title = 'طريقة الاستخدام والبروتوكول العلاجي';
  readonly subtitle = 'استخدام Pile Phage كدهان موضعي منتظم يضمن النتائج السريرية المثلى واستعادة الراحة.';

  readonly steps: Step[] = [
    {
      no: '01',
      tag: 'الدرجة الأولى',
      title: 'مرة واحدة يومياً — عبوة واحدة',
      text: 'تكفي عبوة واحدة من Pile Phage لحالات البواسير والشروخ في درجتها الأولى، مع الاستخدام المنتظم مرة واحدة مساءً قبل النوم.',
      foot: 'كورس وقائي وسريع',
      icon: 'calendar',
    },
    {
      no: '02',
      tag: 'الدرجة الثانية والثالثة',
      title: 'مرتين يومياً لمدة أسبوعين — كورس من عبوتين',
      text: 'يُطبق الدهان صباحاً ومساءً بانتظام لمدة 14 يوماً متواصلاً لضمان انكماش الأوردة والتئام الشروخ المتكررة.',
      foot: 'الخيار الأكثر طلباً وفاعلية',
      icon: 'thumb',
      featured: true,
    },
    {
      no: '03',
      tag: 'طريقة الاستخدام',
      title: 'يستخدم Pile Phage كدهان موضعي',
      text: 'تنظيف وتجفيف المنطقة بلطف بماء فاتر، ثم وضع كمية مناسبة من الدهان برفق على موضع الإصابة الداخلي أو الخارجي دون فرك عنيف.',
      foot: 'إرشادات طبية واضحة ومرفقة',
      icon: 'shield',
    },
  ];
}