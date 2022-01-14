class StickersView {
  appendTo(el) {
    el.insertAdjacentHTML("beforeEnd", this.renderContainerHtml());
  }

  renderContainerHtml() {
    return HTML_TEMPL.CONTAINER.replace(
      "{{className}}",
      SELECTOR.STICKERS_CONTAINER
    );
  }

  renderStickersList(list) {
    const rootEl = document.querySelector("." + SELECTOR.STICKERS_CONTAINER);
    let stickersHTML = list
      .map((sticker) => this.renderPhotoHTML(sticker))
      .join("");

    rootEl.innerHTML = stickersHTML;
  }

  renderPhotoHTML(sticker) {
    return HTML_TEMPL.STICKER.replace("{{url}}", sticker.thumbnailUrl)
      .replace("{{id}}", sticker.id)
      .replace("{{albumId}}", sticker.albumId);
  }

  showServerError(error) {
    alert(error);
  }
}
