class AlbumsView {
  #rootEl;
  #options;

  constructor(container, options) {
    this.initState(container);
    this.#rootEl = container.querySelector("." + SELECTOR.ALBUMS_CONTAINER);
    this.#rootEl.addEventListener("click", (e) => this.onRootElClick(e));
    this.#options = options;
  }

  onRootElClick(e) {
    if (e.target.classList.contains(SELECTOR.CLASS_ALBUM)) {
      const currentAlbum = e.target.closest("." + SELECTOR.CLASS_ALBUM_BODY);
      const id = currentAlbum.getAttribute("data-id");

      this.#options.onClick(id);
      this.toggleActiveClass(currentAlbum);
    }
  }

  initState(el) {
    el.insertAdjacentHTML("beforeEnd", this.renderContainerHtml());
  }

  renderContainerHtml() {
    return HTML_TEMPL.CONTAINER.replace(
      "{{className}}",
      SELECTOR.ALBUMS_CONTAINER
    );
  }

  renderAlbumsList(list) {
    let albumsHTML = list.map((album) => this.renderAlbumHTML(album)).join("");

    this.#rootEl.innerHTML = albumsHTML;
    this.activeFirstAlbum();
  }

  renderAlbumHTML(album) {
    return HTML_TEMPL.ALBUM.replaceAll("{{id}}", album.id).replace(
      "{{title}}",
      album.title
    );
  }

  activeFirstAlbum() {
    const albums = document.querySelectorAll("." + SELECTOR.CLASS_ALBUM_BODY);

    Array.from(albums)[0].classList.add(SELECTOR.CLASS_ACTIVE);
  }

  toggleActiveClass(currentAlbum) {
    const prevAlbum = this.#rootEl.querySelector("." + SELECTOR.CLASS_ACTIVE);

    prevAlbum.classList.remove(SELECTOR.CLASS_ACTIVE);
    currentAlbum.classList.add(SELECTOR.CLASS_ACTIVE);
  }
}
