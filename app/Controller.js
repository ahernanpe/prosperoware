import { Controller } from "cx/ui";
import casual from "./casual";

export default class PageController extends Controller {
  init() {
    super.init();
    this.idSeq = 0;
    console.log(this.generateRecords());
    this.store.set("data", this.generateRecords());
  }

  generateRecords(node) {
    if (!node || node.$level < 5)
      return Array.from({ length: 5 }).map(() => ({
        id: ++this.idSeq,
        fullName: casual.full_name,
        phone: casual.phone,
        city: casual.city,
        notified: casual.coin_flip,
        $leaf: casual.coin_flip
      }));
  }
}
