import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-float',
  templateUrl: './whatsapp-float.html',
  styleUrl: './whatsapp-float.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFloat {
  // رقم مصري بصيغة دولية (01025141193 → 201025141193)
  readonly phone = '201025141193';
  readonly message = 'مرحباً 👋 أود الاستفسار عن علاج Pile Phage وطريقة الطلب.';
  readonly href = `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
}