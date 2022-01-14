class Collection {
  #albumsList = [];

  async fetch() {
    const list = await PlaceholderAPI.getAlbums();
    this.setAlbumsList(list);

    return Promise.resolve(this.getAlbumsList(list));
  }

  getStickersList(id) {
    return PlaceholderAPI.getStickers(id);
  }

  getAlbumsList() {
    return this.#albumsList;
  }

  setAlbumsList(list) {
    return (this.#albumsList = list);
  }
}
