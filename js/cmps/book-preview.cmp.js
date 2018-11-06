import { utilService } from "../services/util.service.js";

export default {
  props: ["book"],
  template: `
    <section class="book-preview d-flex flex-column justify-content-between">
        <router-link :to="bookDetailsLink"><a>{{book.volumeInfo.title}}</a></router-link>
        <h3 v-for="author in book.volumeInfo.authors">{{author}}</h3>
        <img v-if="book.volumeInfo.imageLinks" :src="book.volumeInfo.imageLinks.thumbnail"/>
        <h3 v-if="book.saleInfo.listPrice" v-bind:class="{'green-text': isCheap, 'red-text': isExpensive}">{{currencySymbol}}{{book.saleInfo.listPrice.amount}}</h3>
        <h3 v-if="!book.saleInfo.listPrice"  class="red-text">This book is not for sale.</h3>
    </section>
    `,
    created() {

    },
  computed: {
    currencySymbol() {
      var currencyCode = this.book.saleInfo.listPrice.currencyCode;
      return utilService.getCurrencySymbol(currencyCode);
    },
    isCheap() {
      return this.book.saleInfo.listPrice.amount < 20;
    },
    isExpensive() {
      return this.book.saleInfo.listPrice.amount > 150;
    },
    bookDetailsLink() {
      return `/book/${this.book.id}`;
    }
  }
};
