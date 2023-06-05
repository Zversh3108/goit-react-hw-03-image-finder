import axios from 'axios';
export default class GalleryApiServise {
  API_KEY = '34966531-d731aa6138bbacb35975da1df';
  BASE_URL = 'https://pixabay.com/api/';
  page = 1;
  options = new URLSearchParams({
    q: '',
    page: this.page,
    key: this.API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });
  resetPage() {
    this.page = 1;
    this.options.set('q', this.page.toString());
  }
  newPage() {
    this.page += 1;
    this.options.set('q', this.page.toString());
  }
  async fetchPhotos(searchWord) {
    try {
      this.options.set('q', searchWord);
      this.options.set('page', this.page);

      const response = await axios.get(
        `${this.BASE_URL}?${this.options.toString()}`
      );

      const { hits, totalHits, total } = response.data;

      if (hits.length === 0) {
        throw new Error();
      }

      return { hits, totalHits, total };
    } catch (error) {
      throw new Error(`No photos with name: ${searchWord}`);
    }
  }
}
