"use strict";

const SELECTOR = {
  ID_APP: "#app",
  ALBUMS_CONTAINER: "albums-container",
  STICKERS_CONTAINER: "stickers-container",
  CLASS_ALBUM: "album",
  CLASS_ALBUM_BODY: "album-body",
  CLASS_ALBUM_ID: "album__id",
  CLASS_ALBUM_TITLE: "album_title",
  CLASS_ACTIVE: "active",
};

const ELEMENT = {
  APP: document.querySelector(SELECTOR.ID_APP),
};

const HTML_TEMPL = {
  ALBUM: `
  <div class="album album-body" data-id="{{id}}">
    <span class="album album__id">Album ID: {{id}}</span>
    <p class="album album__title">{{title}}</p>
  </div>
  `,

  STICKER: `
  <div class="photo">
    <p class="photo__id">
      <span>AlbumId: {{albumId}}</span>
      <span>Id: {{id}}</span>
    </p>
    <img src="{{url}}" alt="photo">
  </div>
  `,

  CONTAINER: `
  <div class={{className}}></div>`,
};
