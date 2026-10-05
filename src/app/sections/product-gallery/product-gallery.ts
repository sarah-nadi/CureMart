import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface GallerySlide {
  image: string;
  alt: string;
  badge?: string;
  title: string;
  subtitle?: string;
}

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.html',
  styleUrl: './product-gallery.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown)': 'onKey($event)' },
})
export class ProductGallery {
  readonly badge = 'نقاء التصنيع الصيدلاني';
  readonly title = 'تعرّف على Pile Phage';
  readonly subtitle =
    'تفاصيل المنتج الأيقوني بتغليف دوائي فاخر ومعايير أوروبية متكاملة تضمن أعلى درجات النقاء والفاعلية.';

  // ⚠️ الصور والعناوين دي placeholders، غيّريها بصورك الحقيقية
readonly slides: GallerySlide[] = [
  {
    image: 'WhatsApp Image 2026-10-06 at 1.26.38 AM.jpeg',
    alt: 'علبة وأنبوب بايل فاج',
    badge: 'شهاده اعتماد الجودة',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'معتمد من الهيئه العربية لتنظيم المنتجات الطبية',
  },
  {
    image: 'WhatsApp Image 2026-10-05 at 9.41.28 PM (1).jpeg',
    alt: 'علبة وأنبوب بايل فاج',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'Remus Germany • 50 جرام',
  },
  {
    image: 'WhatsApp Image 2026-10-05 at 9.42.16 PM.jpeg',
    alt: 'علبة وأنبوب بايل فاج',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'Remus Germany • 50 جرام',
  },
  {
    image: 'WhatsApp Image 2026-10-05 at 9.41.30 PM.jpeg',
    alt: 'علبة وأنبوب بايل فاج',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'Remus Germany • 50 جرام',
  },

  {
    image: 'WhatsApp Image 2026-10-05 at 9.41.31 PM.jpeg',
    alt: 'علبة وأنبوب بايل فاج',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'Remus Germany • 50 جرام',
  },
  {
    image: 'Gemini_Generated_Image_6ssppv6ssppv6ssp.jpg',
    alt: 'علبة وأنبوب بايل فاج',
    badge: 'Remus Germany',
    title: 'بايل فاج (Pile Phage)',
    subtitle: 'Remus Germany • 50 جرام',
  },
  // {
  //   image: 'Gemini_Generated_Image_ajnwk2ajnwk2ajnw.jpg',
  //   alt: 'أنبوب بايل فاج',
  //   title: 'أنبوب العلاج الموضعي',
  //   subtitle: 'قوام خفيف سريع الامتصاص',
  // },
  {
    image: 'Gemini_Generated_Image_4zmlt34zmlt34zml.jpg',
    alt: 'علبة بايل فاج',
    title: 'العلبة الخارجية',
    subtitle: 'تغليف دوائي فاخر',
  },
  {
    image: 'Gemini_Generated_Image_c3xnerc3xnerc3xn.jpg',
    alt: 'ختم الأمان',
    badge: 'ختم الأمان والباركود الدولي',
    title: 'التغليف الدوائي الفاخر وموانع العبث',
    subtitle: 'ختم حراري رسمي وورقة أمان فضية لضمان سلامة المنتج من المختبرات الألمانية إلى باب منزلك مباشرة.',
  },
];

  readonly index = signal(0);

  private readonly doc = inject(DOCUMENT);
  private dragStartX: number | null = null;
  private justDragged = false;

  /** 1 = LTR, -1 = RTL */
  private get dirSign(): 1 | -1 {
    return this.doc.documentElement.dir === 'rtl' ? -1 : 1;
  }

  go(step: number): void {
    const n = this.slides.length;
    this.index.update((i) => (i + step + n) % n);
  }

  goTo(i: number): void {
    this.index.set(i);
  }

  /** Signed circular distance of slide i from the active one */
  private offset(i: number): number {
    const n = this.slides.length;
    let d = i - this.index();
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }
slideStyle(i: number): Record<string, string | number> {
  const d = this.offset(i);
  const abs = Math.abs(d);
  return {
    '--d': d,
    '--dir': this.dirSign,
    '--s': abs === 0 ? 1 : abs === 1 ? 0.9 : 0.8,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.85 : 0,
    'pointer-events': abs > 1 ? 'none' : 'auto',
    'z-index': abs === 0 ? 3 : abs === 1 ? 2 : 0,
  };
}

  onSlideClick(i: number): void {
    if (this.justDragged) {
      this.justDragged = false;
      return;
    }
    if (i !== this.index()) this.goTo(i);
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.go(this.dirSign);
    else if (e.key === 'ArrowLeft') this.go(-this.dirSign);
  }

  onPointerDown(e: PointerEvent): void {
    this.dragStartX = e.clientX;
    this.justDragged = false;
  }

  onPointerUp(e: PointerEvent): void {
    if (this.dragStartX === null) return;
    const dx = e.clientX - this.dragStartX;
    this.dragStartX = null;
    if (Math.abs(dx) < 50) return;
    this.justDragged = true;
    // سحب لليمين = السابق في LTR، والتالي في RTL
    this.go(dx > 0 ? -this.dirSign : this.dirSign);
  }

  onPointerCancel(): void {
    this.dragStartX = null;
  }
}