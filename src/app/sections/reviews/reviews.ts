import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface ReviewShot {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKey($event)',
    '(window:resize)': 'measure()',
  },
})
export class Reviews {
  readonly badge = 'تجارب حقيقية';
  readonly title = 'آراء عملائنا';
  readonly subtitle = 'انطباعات موثقة من عملاء استعادوا عافيتهم وراحتهم باستخدام علاج بايل فاج.';

  // حطي الاسكرينات في src/assets/reviews/ باسم review-1.jpg ... review-8.jpg
  // (غيّري length لو العدد مختلف، أو الامتداد لو webp)
  readonly shots: ReviewShot[] = Array.from({ length: 10 }, (_, i) => ({
    src: `assets/reviews/review-${i + 1}.jpg`,
    alt: `رأي عميل رقم ${i + 1}`,
  }));

  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');
  private readonly doc = inject(DOCUMENT);

  readonly active = signal(0);
  readonly atStart = signal(true);
  readonly atEnd = signal(false);
  readonly lightbox = signal<number | null>(null);

  private ticking = false;

  constructor() {
    afterNextRender(() => this.measure());
  }

  /** 1 = LTR, -1 = RTL */
  private get dirSign(): 1 | -1 {
    return this.doc.documentElement.dir === 'rtl' ? -1 : 1;
  }

  /** عرض الكارت + المسافة اللي بينه وبين اللي بعده */
  private step(): number {
    const el = this.scroller().nativeElement;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }

  measure(): void {
    const el = this.scroller().nativeElement;
    const step = this.step();
    if (!step) return;

    // في RTL قيمة scrollLeft سالبة، فبناخد المطلق
    const pos = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    const atEnd = max > 4 && pos > max - 4;

    this.atStart.set(pos < 4);
    this.atEnd.set(atEnd);
    this.active.set(atEnd ? this.shots.length - 1 : Math.round(pos / step));
  }

  onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.measure();
    });
  }

  go(dir: 1 | -1): void {
    this.scroller().nativeElement.scrollBy({
      left: dir * this.dirSign * this.step(),
      behavior: 'smooth',
    });
  }

  goTo(i: number): void {
    this.scroller().nativeElement.scrollTo({
      left: this.dirSign * i * this.step(),
      behavior: 'smooth',
    });
  }

  /* Lightbox */
  open(i: number): void {
    this.lightbox.set(i);
    this.doc.body.style.overflow = 'hidden';
  }

  close(): void {
    this.lightbox.set(null);
    this.doc.body.style.overflow = '';
  }

  lbGo(step: number): void {
    const n = this.shots.length;
    this.lightbox.update((i) => (i === null ? i : (i + step + n) % n));
  }

  onKey(e: KeyboardEvent): void {
    if (this.lightbox() === null) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowRight') this.lbGo(this.dirSign);
    else if (e.key === 'ArrowLeft') this.lbGo(-this.dirSign);
  }
}