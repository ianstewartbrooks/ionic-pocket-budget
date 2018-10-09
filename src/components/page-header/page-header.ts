import { Component, Input } from "@angular/core";
import { ModalAddPage } from "../../pages/modals/modal-add/modal-add";
import { ModalEditPage } from "../../pages/modals/modal-edit/modal-edit";
import { ModalController } from "ionic-angular";

@Component({
  selector: "page-header",
  templateUrl: "page-header.html"
})
export class PageHeaderComponent {
  @Input()
  public pageTitle;
  @Input()
  public pageColor;
  @Input()
  public type;

  constructor(private modalCtrl: ModalController) {}
}
