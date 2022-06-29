import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {


  @Output() fileDropped = new EventEmitter<any>();
  @HostBinding('style.background-color') private background = '#ffffff';

  // Dragover Event
  @HostListener('dragover', ['$event'])
  dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ECEDF1';
  }
  // Dragleave Event
  @HostListener('dragleave', ['$event'])
  public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = 'rgba(35, 35, 35, 0.6)';
  }
  // Drop Event
  @HostListener('drop', ['$event'])
  public drop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#ECEDF1';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
