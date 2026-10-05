import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  templateUrl: './announcement-bar.html',
  styleUrl: './announcement-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBar {
  readonly badge = 'عرض محدود';
  readonly text = 'شحن مبرد مجاني وسريع لجميع المحافظات والدفع متاح عند الاستلام';
}