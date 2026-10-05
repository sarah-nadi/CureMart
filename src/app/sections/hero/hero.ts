import { ChangeDetectionStrategy, Component } from '@angular/core';

interface TrustItem {
  icon: 'truck' | 'cash' | 'shield';
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  readonly originBadge = 'صنع في ألمانيا • Remus Germany • معتمد أوروبياً CE';
  readonly titleLine1 = 'أقوى وأسرع علاج للبواسير الآن في مصر';
  readonly titleLine2 = 'لفترة محدودة';
  readonly subtitle = 'وداعًا للبواسير بدون جراحة وبدون ألم مع Pile Phage — الحل الفوري والسريع.';

  readonly product = {
    tag: 'علاج بكتيريوفاج أصلي',
    size: '50g • Remus',
    image: 'Gemini_Generated_Image_obw62qobw62qobw6.jpg',
    imageAlt: 'علبة وأنبوب بايل فاج',
    priceLabel: 'السعر الرسمي',
    price: 540,
    currency: 'جنيه',
  };

  readonly trust: TrustItem[] = [
    { icon: 'truck', label: 'شحن مجاني لجميع المحافظات' },
    { icon: 'cash', label: 'دفع عند الاستلام' },
    { icon: 'shield', label: 'تركيبة ألمانية معتمدة' },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}