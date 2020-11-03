// VARIABLES

//DOM ELEMENTS
const playListInput = document.getElementById("playlistName");
const createPlaylistBtn = document.getElementById("createPlaylistBtn");
const playlistContainer = document.querySelector(".sideNav__playlist");
const playListTitle = document.querySelector(".playlistTitle");
const usernameTyped = document.getElementById("username");
const passwordTyped = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const usernameSpan = document.getElementById("usernameSpan");
let currentUser = "";
let imgAvatar = document.getElementById("img-avatar");
const logooutBtn = document.getElementById("logout");
const albumSongsNodes = document.querySelectorAll(".table-album tr");
const musicPlayer = document.getElementById("music-player");
const favIcon = document.querySelector(".fav-icon");
const artistContainer = document.querySelector(".artists__container");
const albumsFav = document.querySelector(".albums-fav");

//VARIABLES
let playLists = [];
let favArt = [];
let laterAddedPlaylist = [];
let currentFavArtist = [];
let current_album = {};
let album_id = 0;
let Album_instance = {};

let hamburger = document.querySelector(".navBar__hamburger");
const indexNavbar = document.querySelector(".index__navBar");
const defaultUser = {
  username: "Guest",
  password: "guest",
  avatar:
    "https://www.kindpng.com/picc/m/52-525992_woman-question-mark-clip-art-question-mark-face.png",
  playlists: ["Guest Playlist"],
};

const users = [
  {
    username: "rita.petillo",
    name: "Rita",
    password: "rita1234",
    avatar:
      "https://img2.pngio.com/avatar-female-person-user-woman-young-icon-avatar-person-png-512_512.png",
    playlists: ["Rita's Playlist", "Italian Songs"],
    favArt: [
      {
        name: "ColdPlay",
        code: "4gzpq5DPGxSnKTe4SA8HAU",
        image:
          "https://i.scdn.co/image/6397b6a29c8d9081412e09feb53600f8c9a18313",
        background:
          "https://i.scdn.co/image/1ff3b3c63751ef3615e703c9853c433c3f45f4e7",
      },
    ],
  },
  {
    username: "nello",
    name: "Nello",
    password: "nello1234",
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg",
    playlists: ["Top Italia", "90' Songs"],
  },
  {
    username: "fede",
    name: "Federico",
    password: "fede1234",
    avatar:
      "https://cdn0.iconfinder.com/data/icons/avatar-25/64/avatar-man-beard-brown-long-hair-beard-512.png",
    playlists: ["Top USA", "Top Global'"],
  },
  defaultUser,
];

// FUNCTIONS
const displayMobileMenu = () => {
  console.log(indexNavbar);
  indexNavbar.classList.toggle("d-none");
};

const createPlaylist = (user) => {
  const newPlaylist = playListInput.value;
  playLists.push(newPlaylist);
  localStorage.setItem("playLists", JSON.stringify(playLists));
  playListInput.value = "";
  console.log(JSON.parse(localStorage.getItem("playLists")));
  clearPlaylist();
  renderPlaylist();
};
const renderPlaylist = () => {
  playLists = JSON.parse(localStorage.getItem("playLists"));
  playLists.forEach((playlist, i) => {
    let a = document.createElement("a");
    a.href = `playlist.html?${playlist}`;
    a.innerHTML = `<span class="sideNav__nav-play-thumb text-white"><i class="fas fa-music"></i></span><span> ${playlist}</span>`;
    playlistContainer.appendChild(a);
  });
};

const clearPlaylist = () => {
  while (
    !playlistContainer.lastElementChild.classList.value.includes(
      "sideNav__nav-addPlay"
    )
  ) {
    playlistContainer.removeChild(playlistContainer.lastChild);
  }
};

const login = () => {
  //getting user and pass typed
  let userTped = usernameTyped.value;
  let password = passwordTyped.value;
  //retrive the user
  let user = validateUsername(userTped);
  //validate password
  let passMatch = user?.password === password;
  let userFound = user !== undefined ? true : false;
  //if the user exist and the password match
  if (userFound && passMatch) {
    //save the user in the local storage and go to index
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    //else activate warning text
    let loginWarn = document.querySelector(".login-warning");
    loginWarn.classList.remove("d-none");
  }
};
const logout = () => {
  currentUser = "";
  localStorage.clear();
  window.location.href = "login.html";
};
const renderUsername = (username) => {
  usernameSpan.innerHTML = username.name;
  imgAvatar.src = username.avatar;
};

const validateUsername = (username) => {
  return users.find((user) => user.username === username);
};

/////////---------UPLOAD USER PLAYLIST----------//////////////

const updatePlaylist = (username) => {
  let user = users.find((user) => user.username === username.username);
  if (localStorage.getItem(localStorage.getItem("playLists"))) {
    playlists = localStorage.getItem(localStorage.getItem("playLists"));
  } else {
    playLists = [...playLists, ...username.playlists];
    localStorage.setItem("playLists", JSON.stringify(playLists));
  }
  console.log(localStorage.getItem("playLists"));
};

/////////---------UPLOAD USER FAV ARTISTS----------//////////////

const loafFavArt = (username) => {
  let user = users.find((user) => user.username === username.username);
  if (localStorage.getItem(localStorage.getItem("favArt"))) {
    playlists = localStorage.getItem(localStorage.getItem("favArt"));
  } else {
    favArt = [...favArt, ...username.favArt];
    // localStorage.setItem('playLists', JSON.stringify(playLists))
  }
  console.log(favArt);
};
/////////---------PLAY SONG----------//////////////
const playSong = (code) => {
  musicPlayer.src = `https://open.spotify.com/embed/track/${code}`;
  console.log(document.querySelector("iframe"));
  document.querySelector("iframe").click();
};

/////-------FETCH ALBUMS------/////
const fetchAlbum = async (albumCode) => {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${albumCode}/albums`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer BQD5AJ1q_0VA1NZNTNqKzCV4Bu9EW56HKHvneN6aMShh1TFFLxsxai8DdJ9JAXgIHc6-b2dNCbKiWvIfuQ-4Nm1IGK0J4pigI6rT42srGngZ8mdmS1Av8ou_n-KwqdtZ8H-hejDUiO9BKTOL2k3L9mm0U__dhj1UvC5EH9OzxaXPsBtyIeKe5fJCukG2JGY",
      },
    }
  );
  const data = await res.json();
  return data;
};

///----PRINT FAV ARTISTS-----///
const renderFavArtists = () => {
  favArt.forEach((artist) => {
    let div = document.createElement("div");
    let divClasses = [
      "col-6",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "text-center",
    ];
    div.classList.add(...divClasses);
    div.innerHTML = `       <a href="albums-fav.html?${artist.code}" class="">
                            <div class="card card-spotify">
                                <img src="${artist.image}"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        ${artist.name}
                                    </h5>
                                   
                                </div>
                            </div>
                        </a>`;

    artistContainer.appendChild(div);
  });
};

///----PRINT FAV ARTISTS ALBUMS-----///
const renderFavArtistsAlbums = (artSelected) => {
  let artistTitle = document.querySelector(".artist-title");
  let jumboFavArt = document.querySelector(".jumbotron-art-fav");
  artistTitle.innerHTML = artSelected.name;
  jumboFavArt.style.backgroundImage = `url(${artSelected.background})`;
  currentFavArtist.items.forEach((album) => {
    let div = document.createElement("div");
    let divClasses = [
      "col-6",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
      "text-center",
    ];
    div.classList.add(...divClasses);
    div.innerHTML = `       <a href="albums-fav.html?${album.name}" class="">
                            <div class="card card-spotify">
                                <img src="${album.images[1].url}"
                                    class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">
                                        ${album.name}
                                    </h5>
                                   
                                </div>
                            </div>
                        </a>`;

    albumsFav.appendChild(div);
  });
};

////////Albums Logic////////////

const Album = {
  name: "",
  year: "",
  number_of_songs: "",
  picture: "",
  loadPicture: function () {
    //load Picture in Artist Page
    let img = document.querySelector(".single-album img");
    img.setAttribute("src", this.picture);
  },
  loadName: function () {
    let name_element = document.querySelector(".single-album h5");
    name_element.textContent = this.name;
  },
  songList: [{ code: "", title: "", duration: "" }],
  loadSongs: function () {
    let song_list = document.querySelectorAll(".song-list tr");
    for (let i = 0; i < song_list.length; i++) {
      song_list[
        i
      ].firstElementChild.nextElementSibling.textContent = this.songList[
        i
      ].title;
      song_list[i].lastElementChild.textContent = this.songList[i].duration;
    }
    console.log(song_list[0].firstElementChild.nextElementSibling.textContent);
    console.log(song_list[0].lastElementChild.textContent);
  },

  loadSongsAndYear: function () {
    let node = document.querySelector(".buttons-wrapper h6");

    let year = node.textContent.substring(0, 4);
    let songs_n = node.textContent.substring(6, 9);

    year = this.year;
    songs_n = this.number_of_songs;

    node.textContent = year + " - " + songs_n + " songs";
    console.log(node);
  },

  playSong_: function () {
    let icons = document.querySelectorAll(".table th");
    let songs = this.songList;
    for (let i = 0; i < icons.length; i++) {
      icons[i].addEventListener("click", function () {
        icons[i].id = i;
        playSong(songs[icons[i].id].code);
      });
    }
  },
};

// ON WINDOW LOAD

window.onload = function () {
  /////////---------MOBILE NAV TOGGLE IN INDEX----------//////////////
  hamburger?.addEventListener("click", displayMobileMenu);

  //Instantiate Album Object
  if (window.location.href.indexOf("single-album") != -1) {
    album_id = location.search.substring(1);
    current_album = Discography.albums[album_id];
    Album_instance = Object.create(Album);
    Album_instance.name = current_album.name;
    Album_instance.year = current_album.year;
    Album_instance.number_of_songs = current_album.number_of_songs;
    Album_instance.picture = current_album.picture;
    Album_instance.songList = current_album.songs;
    Album_instance.loadPicture();
    Album_instance.loadSongsAndYear();
    Album_instance.loadSongs();
    Album_instance.playSong_();
    Album_instance.loadName();
  }

  /////////---------LOGIN----------//////////////
  //add login event
  loginBtn?.addEventListener("click", login);
  // const currentUser = localStorage.getItem('currentUser')
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  currentUser ? currentUser : defaultUser;
  renderUsername(currentUser);
  updatePlaylist(currentUser);
  clearPlaylist();
  renderPlaylist();
  loafFavArt(currentUser);

  /////////---------LOGOUT----------//////////////
  logooutBtn?.addEventListener("click", logout);

  /////////---------PLAY SONGS----------//////////////
  if (albumSongsNodes) {
    [...albumSongsNodes].forEach((album, i) => {
      album.addEventListener("click", () => {
        playSong(albumQueenBohemian[i]);
      });
    });
  }

  if (window.location.href.indexOf("albums-fav") != -1) {
    let code = location.search.substring(1);
    let artistFiltered = favArt.find((artist) => artist.code === code);
    fetchAlbum(code)
      .then((res) => (currentFavArtist = res))
      .then((res) => renderFavArtistsAlbums(artistFiltered));
  }

  /////////---------RENDER FAV ARTISTS-----------//////////////

  if (window.location.href.indexOf("artists") != -1) {
    renderFavArtists();
  }

  /////////---------PLAYLIST-----------//////////////
  //create a new lateral playlist
  createPlaylistBtn?.addEventListener("click", createPlaylist);
  //display playlist page
  //I'm looking for the playlist name so that I can display it in the playlist page.
  if (location.search.substring(1)) {
    let queryString = location.search.substring(1);
    let playListSelected = queryString.split("|")[0];
    console.log(playListSelected);
    //when the window load, I render the title of the playlist
    playListTitle.innerHTML = playListSelected;
    playLists.push(playListSelected);
  }
  /////////---------LIKED ALBUMS-----------//////////////
  favIcon?.addEventListener("click", () => {
    favIcon.classList.toggle("fas");
    const bedge = document.getElementById("bedge");
    bedge.classList.toggle("d-none");
  });
};
