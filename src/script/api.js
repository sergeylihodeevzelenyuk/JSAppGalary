class PlaceholderAPI {
  static URL = "https://jsonplaceholder.typicode.com/";
  static HEADERS = {
    Accept: "application/json",
    "Content-type": "application/json; charset=UTF-8",
  };

  static getAlbums() {
    return fetch(`${this.URL}` + "albums", {
      method: "GET",
      headers: this.HEADERS,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${res.status}. Can't get albums from server!`);
    });
  }

  static getStickers(id) {
    return fetch(`${this.URL}` + "photos?albumId=" + id, {
      method: "GET",
      headers: this.HEADERS,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(
        `${res.status}. Can't get this albums photo from server!`
      );
    });
  }
}
