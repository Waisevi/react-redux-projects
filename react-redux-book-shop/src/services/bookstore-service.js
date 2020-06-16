export default class BookstoreService {
  data = [
    {
      id: 1,
      title: 'Search for Meaning',
      author: 'Viktor Frankl',
      price: 20,
      coverImage: 'https://cdn1.ozone.ru/multimedia/c650/1010440139.jpg'
    },
    {
      id: 2,
      title: 'American Kingpin',
      author: 'Nick Bilton',
      price: 14,
      coverImage: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533640136l/35108939._SX318_.jpg'
    }
  ];

  getBooks(){
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 1000);
    });
  }
}
