import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { first } from 'rxjs/operators';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private cfr: ComponentFactoryResolver) {
  }

  openErrorModal(errorMsg: string): void {
    const factory = this.cfr.resolveComponentFactory(ModalComponent);
    const cmp = factory.create(Injector.create({providers: []}));
    cmp.instance.message = errorMsg;
    cmp.changeDetectorRef.detectChanges();
    try {
      document.body.appendChild(cmp.location.nativeElement);
    } catch (e) {
    }

    cmp.instance.closed.pipe(first()).subscribe(() => {
      console.log('close2');
      cmp.destroy();
      cmp.hostView.destroy();
      cmp.hostView.detectChanges();
      document.body.removeChild(cmp.location.nativeElement);
    }, e => console.log('e', e), () => console.log('end'));
  }
}
