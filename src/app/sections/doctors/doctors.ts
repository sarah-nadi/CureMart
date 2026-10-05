import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface DoctorSlide {
  label: string;
  topic: string;
  duration: string;
  videoSrc?: string; // ملف mp4 (مثلاً assets/videos/doctor-1.mp4)
  poster?: string;
  name: string;
  role: string;
  affiliation: string;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown)': 'onKey($event)' },
})
export class Doctors {
  readonly badge = 'الشهادات والآراء الطبية';
  readonly title = 'رأي الأطباء والمتخصصين';
  readonly subtitle =
    'رؤية سريرية دقيقة وتقييمات من نخبة الأطباء والاستشاريين لآلية عمل علاج بايل فاج ودوره في تجنب التدخلات الجراحية.';

  // ⚠️ كل البيانات دي placeholders، لازم تتبدل ببيانات أطباء حقيقيين وموافقين
  readonly slides: DoctorSlide[] = [
    {
      label: 'تسجيل استشاري #1',
      topic: 'آلية عمل البكتيريوفاج في علاج البواسير',
      duration: '02:10',
      name: 'اسم الطبيب / الاستشاري المعتمد',
      videoSrc: 'WhatsApp Video 2026-10-04 at 1.35.44 AM.mp4',
      role: 'استشاري الجراحة العامة',
      affiliation: 'الاعتماد الطبي والمستشفى الاستشاري',
    },
    {
      label: 'تسجيل استشاري #2',
      topic: 'البروتوكول العلاجي والجرعات',
      duration: '01:45',
      name: 'اسم الطبيب / الاستشاري المعتمد',
      role: 'استشاري أمراض القولون والمستقيم',
      videoSrc: 'WhatsApp Video 2026-10-04 at 1.35.34 AM.mp4',
      affiliation: 'الاعتماد الطبي والمستشفى الاستشاري',
    },
   
  ];

  readonly index = signal(0);
  /** index الكارت اللي الفيديو شغال فيه (أو null) */
  readonly playing = signal<number | null>(null);

  private readonly doc = inject(DOCUMENT);
  private dragStartX: number | null = null;
  private justDragged = false;

  /** 1 = LTR, -1 = RTL */
  private get dirSign(): 1 | -1 {
    return this.doc.documentElement.dir === 'rtl' ? -1 : 1;
  }

  go(step: number): void {
    const n = this.slides.length;
    this.playing.set(null);
    this.index.update((i) => (i + step + n) % n);
  }

  goTo(i: number): void {
    this.playing.set(null);
    this.index.set(i);
  }

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

  onPlay(i: number): void {
    if (this.justDragged) return; // ضغطة جت بعد سحب
    if (i !== this.index()) {
      this.goTo(i);
      return;
    }
    if (this.slides[i].videoSrc) this.playing.set(i);
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
    this.go(dx > 0 ? -this.dirSign : this.dirSign);
  }

  onPointerCancel(): void {
    this.dragStartX = null;
  }
}