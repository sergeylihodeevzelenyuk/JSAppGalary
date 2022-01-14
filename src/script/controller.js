class Controller {
  #container;

  constructor(container) {
    this.#container = container;
    this.albumsCollection = new Collection();
    this.albumsView = new AlbumsView(this.#container, {
      onClick: (id) => this.getAlbumsStickers(id),
    });
    this.stickersView = new StickersView();

    this.stickersView.appendTo(this.#container);

    this.albumsCollection
      .fetch()
      .then((list) => {
        this.albumsView.renderAlbumsList(list);
        return list;
      })
      .then((list) => list[0].id)
      .then((id) => this.albumsCollection.getStickersList(id))
      .then((list) => this.stickersView.renderStickersList(list))
      .catch(this.stickersView.showServerError);
  }

  getAlbumsStickers(id) {
    this.albumsCollection
      .getStickersList(id)
      .then((list) => this.stickersView.renderStickersList(list))
      .catch(this.stickersView.showServerError);
  }
}
