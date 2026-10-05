import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnouncementBar } from './sections/announcement-bar/announcement-bar';
import { Hero } from './sections/hero/hero';
import { KeyFeatures } from './sections/key-features/key-features';
import { WhatsappFloat } from './sections/whatsapp-float/whatsapp-float';
import { WhyChoose } from './sections/why-choose/why-choose';
import { ProductGallery } from './sections/product-gallery/product-gallery';
import { ActiveIngredients } from './sections/active-ingredients/active-ingredients';
import { Conditions } from './sections/conditions/conditions';
import { Protocol } from './sections/protocol/protocol';
import { TrustStrip } from './sections/trust-strip/trust-strip';
import { Doctors } from './sections/doctors/doctors';
import { Reviews } from './sections/reviews/reviews';
import { OrderForm } from './sections/order-form/order-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnnouncementBar, Hero, KeyFeatures, WhatsappFloat, WhyChoose, ProductGallery, ActiveIngredients, Conditions, Protocol, TrustStrip, Doctors, Reviews, OrderForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CureMart');
}
