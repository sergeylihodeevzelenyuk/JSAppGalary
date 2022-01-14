"use strict";

const SELECTOR = {
  ID_POST: "#post-template",
  ID_PHOTO: "#photo-template",
  CLASS_ALBUMS_CONTAINER: "album-container",
  CLASS_PHOTO_CONTAINER: "photo-container",
  CLASS_ALBUM: "album",
  CLASS_ALBUM_BODY: "album-body",
  CLASS_ALBUM_ID: "album__id",
  CLASS_ALBUM_TITLE: "album_title",
  CLASS_ACTIVE: "active",
};

const ELEMENT = {
  ALBUMS_CONTAINER: document.querySelector(
    "." + SELECTOR.CLASS_ALBUMS_CONTAINER
  ),
  PHOTO_CONTAINER: document.querySelector("." + SELECTOR.CLASS_PHOTO_CONTAINER),
};

const HTML = {
  ALBUM_TEMPL: document.querySelector(SELECTOR.ID_POST).innerHTML,
  PHOTO_TEMPL: document.querySelector(SELECTOR.ID_PHOTO).innerHTML,
};

document.addEventListener("DOMContentLoaded", documentOnLoaded);
ELEMENT.ALBUMS_CONTAINER.addEventListener("click", onAlbumsClick);

function documentOnLoaded() {
  PlaceholderAPI.getAlbums().then(init).catch(showError);
}

function onAlbumsClick(e) {
  if (e.target.classList.contains(SELECTOR.CLASS_ALBUM)) {
    const currentAlbum = e.target.closest("." + SELECTOR.CLASS_ALBUM_BODY);
    const id = currentAlbum.getAttribute("data-id");

    PlaceholderAPI.getPhotos(id).then(createPhotoUI).catch(showError);

    toggleActiveClass(currentAlbum);
  }
}

function init(data) {
  createAlbumsUI(data);
  activeFirstAlbum();

  PlaceholderAPI.getPhotos(data[0].id).then(createPhotoUI).catch(showError);
}

function createPhotoUI(photos) {
  let photosHTML = photos.map((photo) => renderPhotoHTML(photo)).join("");
  ELEMENT.PHOTO_CONTAINER.innerHTML = photosHTML;
}

function createAlbumsUI(albums) {
  let albumsHTML = albums.map((album) => renderAlbumHTML(album)).join("");
  ELEMENT.ALBUMS_CONTAINER.innerHTML = albumsHTML;
}

function activeFirstAlbum() {
  const albums = document.querySelectorAll("." + SELECTOR.CLASS_ALBUM_BODY);

  Array.from(albums)[0].classList.add(SELECTOR.CLASS_ACTIVE);
}

function renderAlbumHTML(album) {
  return HTML.ALBUM_TEMPL.replaceAll("{{id}}", album.id).replace(
    "{{title}}",
    album.title
  );
}

function renderPhotoHTML(photo) {
  return HTML.PHOTO_TEMPL.replace("{{url}}", photo.thumbnailUrl)
    .replace("{{id}}", photo.id)
    .replace("{{albumId}}", photo.albumId);
}

function toggleActiveClass(currentAlbum) {
  const prevAlbum = ELEMENT.ALBUMS_CONTAINER.querySelector(
    "." + SELECTOR.CLASS_ACTIVE
  );

  prevAlbum.classList.remove(SELECTOR.CLASS_ACTIVE);
  currentAlbum.classList.add(SELECTOR.CLASS_ACTIVE);
}

function showError(error) {
  alert(error);
}
