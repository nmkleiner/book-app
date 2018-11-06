import { storageService } from "./storage.service.js";
import { utilService } from "./util.service.js";

const BOOKS_KEY = "books";
var booksDB = [];
const API_KEY = "AIzaSyAy0MEnLAI1gBNxTT2DBtw440qGgNzZb8c";
export const bookService = {
  query,
  getBookById,
  addReview,
  removeReview,
  loadBooks,
  addGoogleBook,
  nextBook,
  prevBook
};

function addReview(bookId, review) {
  var book = booksDB.find(book => book.id === bookId);
  if (!book.reviews) book.reviews = [];
  book.reviews.push(review);
  storageService.store(BOOKS_KEY, booksDB);
}

function removeReview(reviewIdx, bookId) {
  var book = booksDB.find(book => book.id === bookId);
  book.reviews.splice(reviewIdx, 1);
  storageService.store(BOOKS_KEY, booksDB);
}

function query() {
  var books = storageService.load(BOOKS_KEY);
  if (!books) {
    books = generateBooks();
    storageService.store(BOOKS_KEY, books);
  }
  booksDB = books;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(booksDB);
    }, 500);
  });
}

function getBookById(bookId) {
  return query().then(books => books.find(book => book.id === bookId));
}

function prevBook(bookId) {
  const bookIdx = booksDB.findIndex(book => book.id === bookId);
  const book = booksDB[bookIdx - 1]? booksDB[bookIdx - 1] : booksDB[booksDB.length - 1];

  return Promise.resolve(book);
}

function nextBook(bookId) {
  const bookIdx = booksDB.findIndex(book => book.id === bookId);
  const book = booksDB[bookIdx + 1] ? booksDB[bookIdx + 1] : booksDB[0];

  return Promise.resolve(book);
}

function nextCar(carId) {
  const carIdx = cars.findIndex(car => car.id === carId);
  const car = cars[carIdx + 1] ? cars[carIdx + 1] : cars[0];

  return Promise.resolve(car);
}

function loadBooks(searchKey) {
  // GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey

  var prmRes = axios.get(
    `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchKey}&key=${API_KEY}`
  );
  var prmData = prmRes.then(res => res.data);
  return prmData;
}

function addGoogleBook(googleBook) {
  booksDB.push(googleBook);
  storageService.store(BOOKS_KEY, booksDB);
}

function generateBooks() {
  var prm = {
    kind: "books#volumes",
    totalItems: 415,
    items: [
      {
        kind: "books#volume",
        id: "CFdcCy_AYAkC",
        etag: "l8Pcq1IXeuk",
        selfLink: "https://www.googleapis.com/books/v1/volumes/CFdcCy_AYAkC",
        volumeInfo: {
          title: "Mastering the Art of French Cooking",
          authors: ["Julia Child", "Louisette Bertholle", "Simone Beck"],
          publisher: "Knopf",
          publishedDate: "2011-10-05",
          description:
            "For over fifty years, New York Times bestseller Mastering the Art of French Cooking has been the definitive book on the subject for American readers. Featuring 524 delicious recipes, in its pages home cooks will find something for everyone, from seasoned experts to beginners who love good food and long to reproduce the savory delights of French cuisine, from historic Gallic masterpieces to the seemingly artless perfection of a dish of spring-green peas. Here Julia Child, Simone Beck, and Louisette Bertholle break down the classic foods of France into a logical sequence of themes and variations rather than presenting an endless and diffuse catalogue of dishes. Throughout, the focus is on key recipes that form the backbone of French cookery and lend themselves to an infinite number of elaborations—bound to increase anyone’s culinary repertoire. With over 100 instructive illustrations to guide readers every step of the way, Mastering the Art of French Cooking deserves a place of honor in every kitchen in America.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9780307958174"
            },
            {
              type: "ISBN_10",
              identifier: "0307958175"
            }
          ],
          readingModes: {
            text: true,
            image: false
          },
          pageCount: 684,
          printType: "BOOK",
          categories: ["Cooking"],
          averageRating: 4.5,
          ratingsCount: 79,
          maturityRating: "NOT_MATURE",
          allowAnonLogging: true,
          contentVersion: "2.6.3.0.preview.2",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=CFdcCy_AYAkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=CFdcCy_AYAkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=CFdcCy_AYAkC&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=1&source=gbs_api",
          infoLink:
            "https://play.google.com/store/books/details?id=CFdcCy_AYAkC&source=gbs_api",
          canonicalVolumeLink:
            "https://market.android.com/details?id=book-CFdcCy_AYAkC"
        },
        saleInfo: {
          country: "IL",
          saleability: "FOR_SALE",
          isEbook: true,
          listPrice: {
            amount: 109.0,
            currencyCode: "ILS"
          },
          retailPrice: {
            amount: 109.0,
            currencyCode: "ILS"
          },
          buyLink:
            "https://play.google.com/store/books/details?id=CFdcCy_AYAkC&rdid=book-CFdcCy_AYAkC&rdot=1&source=gbs_api",
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 1.09e8,
                currencyCode: "ILS"
              },
              retailPrice: {
                amountInMicros: 1.09e8,
                currencyCode: "ILS"
              }
            }
          ]
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY",
          epub: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Mastering_the_Art_of_French_Cooking-sample-epub.acsm?id=CFdcCy_AYAkC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=CFdcCy_AYAkC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "For over fifty years, New York Times bestseller Mastering the Art of French Cooking has been the definitive book on the subject for American readers."
        }
      },
      {
        kind: "books#volume",
        id: "iH_zZJlLzgcC",
        etag: "J30oUZ+EheU",
        selfLink: "https://www.googleapis.com/books/v1/volumes/iH_zZJlLzgcC",
        volumeInfo: {
          title: "French Cooking",
          authors: ["BHB International"],
          publisher: "Continental Enterprises Group",
          publishedDate: "1997-03-01",
          description:
            "The recipes that make up this legendary cuisine are from all the regions of France and it is these regional specialties that make French cooking so fascinating. Each easy-to-follow recipe has been thoroughly kitchen tested to ensure perfect results every time. Over 45 full-color photographs illustrate 30 authentic French recipes, from Burgundy's Coq au Vin to Brittany's Maules Mariniere.",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "1858336791"
            },
            {
              type: "ISBN_13",
              identifier: "9781858336794"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 72,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=iH_zZJlLzgcC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=iH_zZJlLzgcC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=iH_zZJlLzgcC&q=french+cooking&dq=french+cooking&hl=&as_pt=BOOKS&cd=2&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=iH_zZJlLzgcC&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/French_Cooking.html?hl=&id=iH_zZJlLzgcC"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=iH_zZJlLzgcC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "The recipes that make up this legendary cuisine are from all the regions of France and it is these regional specialties that make French cooking so fascinating."
        }
      },
      {
        kind: "books#volume",
        id: "hOMq-krXb84C",
        etag: "jlSSHraOIhg",
        selfLink: "https://www.googleapis.com/books/v1/volumes/hOMq-krXb84C",
        volumeInfo: {
          title: "Cool French Cooking",
          subtitle: "Fun and Tasty Recipes for Kids",
          authors: ["Lisa Wagner"],
          publisher: "ABDO",
          publishedDate: "2011-01-01",
          description:
            "Introduces cooking terms, techniques, and utensils and offers easy-to-prepare recipes for French meals and side dishes.",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "1617146609"
            },
            {
              type: "ISBN_13",
              identifier: "9781617146602"
            }
          ],
          readingModes: {
            text: false,
            image: true
          },
          pageCount: 32,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "2.0.0.0.preview.1",
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=hOMq-krXb84C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=hOMq-krXb84C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=hOMq-krXb84C&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=3&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=hOMq-krXb84C&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/Cool_French_Cooking.html?hl=&id=hOMq-krXb84C"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Cool_French_Cooking-sample-pdf.acsm?id=hOMq-krXb84C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=hOMq-krXb84C&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "Introduces cooking terms, techniques, and utensils and offers easy-to-prepare recipes for French meals and side dishes."
        }
      },
      {
        kind: "books#volume",
        id: "keY46I9eKoAC",
        etag: "uH/HSW383hs",
        selfLink: "https://www.googleapis.com/books/v1/volumes/keY46I9eKoAC",
        volumeInfo: {
          title: "Country French cooking",
          authors: ["Sunset Publishing Staff"],
          publisher: "Sunset Books/Sunset Publishing Corporation",
          publishedDate: "1981-09",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "0376024240"
            },
            {
              type: "ISBN_13",
              identifier: "9780376024244"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 128,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=keY46I9eKoAC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=keY46I9eKoAC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=keY46I9eKoAC&q=french+cooking&dq=french+cooking&hl=&as_pt=BOOKS&cd=4&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=keY46I9eKoAC&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/Country_French_cooking.html?hl=&id=keY46I9eKoAC"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=keY46I9eKoAC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        }
      },
      {
        kind: "books#volume",
        id: "P6rco25fCycC",
        etag: "DkU6j097Jns",
        selfLink: "https://www.googleapis.com/books/v1/volumes/P6rco25fCycC",
        volumeInfo: {
          title: "Love, God, and the Art of French Cooking",
          authors: ["James F. Twyman"],
          publisher: "Hay House, Inc",
          publishedDate: "2011-12-01",
          description:
            'Imagine meeting a French chef who is much more than what he seems. In this true story, James Twyman enters the mystical world of Roger Dufau, the owner of a bed-and-breakfast outside Toronto, who dishes out lessons on love and God just as easily as he does the most delicious cuisine. Follow James as he undergoes a profound transformation, exploring his past relationships and dissolving negative patterns. In this remarkably personal account, James learns to release his fears and fully open his heart-perhaps for the first time. "Food is one of the closest things we have to real spirituality," Roger explains, then goes on to teach the true meaning of abundance, and how our passion can be used to create new worlds and serve humanity. This is a book that will stir your heart as well as offer hints on how you too can become a master chef-not only of French cuisine, but of your own life. It is a recipe for living, and speaks with an intimacy that everyone can appreciate and understand.',
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781401935245"
            },
            {
              type: "ISBN_10",
              identifier: "1401935249"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 169,
          printType: "BOOK",
          categories: ["Self-Help"],
          averageRating: 3.0,
          ratingsCount: 1,
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.7.7.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=P6rco25fCycC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=P6rco25fCycC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=P6rco25fCycC&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=5&source=gbs_api",
          infoLink:
            "https://play.google.com/store/books/details?id=P6rco25fCycC&source=gbs_api",
          canonicalVolumeLink:
            "https://market.android.com/details?id=book-P6rco25fCycC"
        },
        saleInfo: {
          country: "IL",
          saleability: "FOR_SALE",
          isEbook: true,
          listPrice: {
            amount: 58.0,
            currencyCode: "ILS"
          },
          retailPrice: {
            amount: 58.0,
            currencyCode: "ILS"
          },
          buyLink:
            "https://play.google.com/store/books/details?id=P6rco25fCycC&rdid=book-P6rco25fCycC&rdot=1&source=gbs_api",
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 5.8e7,
                currencyCode: "ILS"
              },
              retailPrice: {
                amountInMicros: 5.8e7,
                currencyCode: "ILS"
              }
            }
          ]
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Love_God_and_the_Art_of_French_Cooking-sample-epub.acsm?id=P6rco25fCycC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Love_God_and_the_Art_of_French_Cooking-sample-pdf.acsm?id=P6rco25fCycC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=P6rco25fCycC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "This is a book that will stir your heart as well as offer hints on how you too can become a master chef-not only of French cuisine, but of your own life."
        }
      },
      {
        kind: "books#volume",
        id: "bCDR8qClrKkC",
        etag: "XF7h3qsaWgo",
        selfLink: "https://www.googleapis.com/books/v1/volumes/bCDR8qClrKkC",
        volumeInfo: {
          title:
            "Wolfgang Puck's Modern French Cooking for the American Kitchen",
          subtitle:
            "Recipes Form the James Beard Award-Winning Chef-Owner of Spago",
          authors: ["Wolfgang Puck"],
          publisher: "Houghton Mifflin Harcourt",
          publishedDate: "1998-09-09",
          description:
            "The chef of Los Angeles's Ma Maison restaurant offers more than 200 recipes, based on la nouvelle cuisine, adapted to American ingredients and methods, and includes tips on presentation and wine and seasonal menus",
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: "0395935202"
            },
            {
              type: "ISBN_13",
              identifier: "9780395935200"
            }
          ],
          readingModes: {
            text: false,
            image: true
          },
          pageCount: 304,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=bCDR8qClrKkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=bCDR8qClrKkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=bCDR8qClrKkC&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=6&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=bCDR8qClrKkC&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/Wolfgang_Puck_s_Modern_French_Cooking_fo.html?hl=&id=bCDR8qClrKkC"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Wolfgang_Puck_s_Modern_French_Cooking_fo-sample-pdf.acsm?id=bCDR8qClrKkC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=bCDR8qClrKkC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "The chef of Los Angeles&#39;s Ma Maison restaurant offers more than 200 recipes, based on la nouvelle cuisine, adapted to American ingredients and methods, and includes tips on presentation and wine and seasonal menus"
        }
      },
      {
        kind: "books#volume",
        id: "SmMWyHGz6vMC",
        etag: "kBcgQhnIRu8",
        selfLink: "https://www.googleapis.com/books/v1/volumes/SmMWyHGz6vMC",
        volumeInfo: {
          title: "100 Recipes of French Cooking for Christmas and Holidays",
          authors: ["Pierre-Emmanuel Malissin"],
          publisher: "Syllabaire éditions",
          description:
            "Recipes for your holiday meals, Christmas, Thanksgiving. Appetizers,Shells and Crustaceans,Fish,Poultry, Meats and Game Meats,Cheeses, Desserts.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9782365040297"
            },
            {
              type: "ISBN_10",
              identifier: "2365040292"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 109,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: true,
          contentVersion: "1.1.1.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=SmMWyHGz6vMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=SmMWyHGz6vMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=SmMWyHGz6vMC&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=7&source=gbs_api",
          infoLink:
            "https://play.google.com/store/books/details?id=SmMWyHGz6vMC&source=gbs_api",
          canonicalVolumeLink:
            "https://market.android.com/details?id=book-SmMWyHGz6vMC"
        },
        saleInfo: {
          country: "IL",
          saleability: "FOR_SALE",
          isEbook: true,
          listPrice: {
            amount: 4.0,
            currencyCode: "ILS"
          },
          retailPrice: {
            amount: 4.0,
            currencyCode: "ILS"
          },
          buyLink:
            "https://play.google.com/store/books/details?id=SmMWyHGz6vMC&rdid=book-SmMWyHGz6vMC&rdot=1&source=gbs_api",
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 4000000.0,
                currencyCode: "ILS"
              },
              retailPrice: {
                amountInMicros: 4000000.0,
                currencyCode: "ILS"
              }
            }
          ]
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true
          },
          pdf: {
            isAvailable: true
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=SmMWyHGz6vMC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "Recipes for your holiday meals, Christmas, Thanksgiving. Appetizers,Shells and Crustaceans,Fish,Poultry, Meats and Game Meats,Cheeses, Desserts."
        }
      },
      {
        kind: "books#volume",
        id: "iik-AQAAIAAJ",
        etag: "1Rj3spUmsCc",
        selfLink: "https://www.googleapis.com/books/v1/volumes/iik-AQAAIAAJ",
        volumeInfo: {
          title: "French cooking en famille",
          authors: ["Jacques Burdick"],
          publisher: "Fawcett",
          publishedDate: "1989-09-01",
          description:
            "More than just a cookbook, French Cooking En Famille offers a richly personal philosophy of food--how it is to be planned, prepared and shared by the French householder day to day with the entire clan.",
          industryIdentifiers: [
            {
              type: "OTHER",
              identifier: "UCSC:32106014871336"
            }
          ],
          readingModes: {
            text: false,
            image: false
          },
          pageCount: 346,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "preview-1.0.0",
          language: "en",
          previewLink:
            "http://books.google.com/books?id=iik-AQAAIAAJ&dq=french+cooking&hl=&as_pt=BOOKS&cd=8&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=iik-AQAAIAAJ&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/French_cooking_en_famille.html?hl=&id=iik-AQAAIAAJ"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "NO_PAGES",
          embeddable: false,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: false
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=iik-AQAAIAAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "NONE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "More than just a cookbook, French Cooking En Famille offers a richly personal philosophy of food--how it is to be planned, prepared and shared by the French householder day to day with the entire clan."
        }
      },
      {
        kind: "books#volume",
        id: "SJegZ9GkgDYC",
        etag: "hFLQS+kZ/4o",
        selfLink: "https://www.googleapis.com/books/v1/volumes/SJegZ9GkgDYC",
        volumeInfo: {
          title: "Cooking the French Way",
          authors: ["Lynne Marie Waldee"],
          publisher: "Lerner Books [UK]",
          publishedDate: "2009",
          description:
            "An introduction to the cooking of France, featuring basic recipes for everyday breakfast, lunch, and dinner dishes, as well as typical menus and a brief description of the special features of a French table setting.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9780761342779"
            },
            {
              type: "ISBN_10",
              identifier: "076134277X"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 72,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: false,
          contentVersion: "0.0.2.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=SJegZ9GkgDYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=SJegZ9GkgDYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=SJegZ9GkgDYC&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=9&source=gbs_api",
          infoLink:
            "http://books.google.com/books?id=SJegZ9GkgDYC&dq=french+cooking&hl=&as_pt=BOOKS&source=gbs_api",
          canonicalVolumeLink:
            "https://books.google.com/books/about/Cooking_the_French_Way.html?hl=&id=SJegZ9GkgDYC"
        },
        saleInfo: {
          country: "IL",
          saleability: "NOT_FOR_SALE",
          isEbook: false
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true,
            acsTokenLink:
              "http://books.google.com/books/download/Cooking_the_French_Way-sample-epub.acsm?id=SJegZ9GkgDYC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
          },
          pdf: {
            isAvailable: false
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=SJegZ9GkgDYC&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "An introduction to the cooking of France, featuring basic recipes for everyday breakfast, lunch, and dinner dishes, as well as typical menus and a brief description of the special features of a French table setting."
        }
      },
      {
        kind: "books#volume",
        id: "gxDLCQAAQBAJ",
        etag: "1xJSYCEbUD4",
        selfLink: "https://www.googleapis.com/books/v1/volumes/gxDLCQAAQBAJ",
        volumeInfo: {
          title: "Revolutionary French Cooking",
          authors: ["Daniel Galmiche"],
          publisher: "Duncan Baird Publishers",
          publishedDate: "2014-05-10",
          description:
            "This book is a must for all who want to learn the art of great cooking' - James Martin 'French food has undergone a transformation - in this book Daniel shows you how to master contemporary French recipes in your own home' - Heston Blumenthal In Revolutionary French Cooking much loved-chef Daniel Galmiche applies his approachable, easy-to-follow style to the new wave of modern French cuisine. Staying close to the French maxim of starting with quality ingredients and cooking them brilliantly, Daniel shows you how to rejuvenate and energize classic French style with unusual marriages of ingredients and flavours and unexpected twists. The result is over 100 exciting recipes for starters, mains, sides and desserts that are bursting with vibrant tastes, textures and aromas. These recipes are all simple to prepare at home, and throughout the book there are instructive features on the techniques used, such as water baths, which you'll quickly master. This is a book for lovers of heart-warming, beautiful food and a fresh taste of France.",
          industryIdentifiers: [
            {
              type: "ISBN_13",
              identifier: "9781848992214"
            },
            {
              type: "ISBN_10",
              identifier: "1848992211"
            }
          ],
          readingModes: {
            text: true,
            image: true
          },
          pageCount: 224,
          printType: "BOOK",
          categories: ["Cooking"],
          maturityRating: "NOT_MATURE",
          allowAnonLogging: true,
          contentVersion: "1.10.9.0.preview.3",
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false
          },
          imageLinks: {
            smallThumbnail:
              "http://books.google.com/books/content?id=gxDLCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            thumbnail:
              "http://books.google.com/books/content?id=gxDLCQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          },
          language: "en",
          previewLink:
            "http://books.google.com/books?id=gxDLCQAAQBAJ&printsec=frontcover&dq=french+cooking&hl=&as_pt=BOOKS&cd=10&source=gbs_api",
          infoLink:
            "https://play.google.com/store/books/details?id=gxDLCQAAQBAJ&source=gbs_api",
          canonicalVolumeLink:
            "https://market.android.com/details?id=book-gxDLCQAAQBAJ"
        },
        saleInfo: {
          country: "IL",
          saleability: "FOR_SALE",
          isEbook: true,
          listPrice: {
            amount: 27.0,
            currencyCode: "ILS"
          },
          retailPrice: {
            amount: 27.0,
            currencyCode: "ILS"
          },
          buyLink:
            "https://play.google.com/store/books/details?id=gxDLCQAAQBAJ&rdid=book-gxDLCQAAQBAJ&rdot=1&source=gbs_api",
          offers: [
            {
              finskyOfferType: 1,
              listPrice: {
                amountInMicros: 2.7e7,
                currencyCode: "ILS"
              },
              retailPrice: {
                amountInMicros: 2.7e7,
                currencyCode: "ILS"
              }
            }
          ]
        },
        accessInfo: {
          country: "IL",
          viewability: "PARTIAL",
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: "ALLOWED",
          epub: {
            isAvailable: true
          },
          pdf: {
            isAvailable: true
          },
          webReaderLink:
            "http://play.google.com/books/reader?id=gxDLCQAAQBAJ&hl=&as_pt=BOOKS&printsec=frontcover&source=gbs_api",
          accessViewStatus: "SAMPLE",
          quoteSharingAllowed: false
        },
        searchInfo: {
          textSnippet:
            "This book is a must for all who want to learn the art of great cooking&#39; - James Martin &#39;French food has undergone a transformation - in this book Daniel shows you how to master contemporary French recipes in your own home&#39; - Heston ..."
        }
      }
    ]
  };
  return prm.items;
}
// function createBook() {
//     var imgBaseUrl = 'http://coding-academy.org/books-photos/'
//     var book = {
//         id: utilService.makeId(),
//         title: utilService.makeLorem(10),
//         publishedDate: utilService.getRandomInt(1900, 2000),
//         thumbnail: imgBaseUrl + utilService.getRandomInt(1, 21) + '.jpg',
//     }
//     return book;
// }
