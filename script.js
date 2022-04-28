Amplitude.init({
  songs: [
    {
      name: "Chỉ Buồn Hôm Nay",
      artist: "Lê Thu Quyên",
      album: "Single",
      url: "./music/track/Le-Thu-Quyen_Chi-Buon-Hom-Nay.mp3",
      cover_art_url: "./music/cover/Le-Thu-Quyen_Chi-Buon-Hom-Nay.png",
    },
    {
      name: "The Nights",
      artist: "Lê Thu Quyên",
      album: "Single",
      url: "./music/track/Le-Thu-Quyen_The-Nights.mp3",
      cover_art_url: "./music/cover/Le-Thu-Quyen_The-Nights.png",
    },
    {
      name: "Ánh Sáng Đời Tôi",
      artist: "Lương Tố Uyên",
      album: "Single",
      url: "./music/track/Luong-To-Uyen_Anh-Sang-Doi-Toi.mp3",
      cover_art_url: "./music/cover/Luong-To-Uyen_Anh-Sang-Doi-Toi.png",
    },
    {
      name: "Nàng Thơ",
      artist: "Lưu Mạnh Hiệp",
      album: "Single",
      url: "./music/track/Luu-Manh-Hiep_Nang-Tho.mp3",
      cover_art_url: "./music/cover/Luu-Manh-Hiep_Nang-Tho.png",
    },
    {
      name: "Em Mệt Rồi",
      artist: "Phạm Thị Ngọc Hà",
      album: "Single",
      url: "./music/track/Pham-Thi-Ngoc-Ha_Em-Met-Roi.mp3",
      cover_art_url: "./music/cover/Pham-Thi-Ngoc-Ha_Em-Met-Roi.png",
    },
    {
      name: "Hơn Cả Yêu",
      artist: "Trần Huyền Trang",
      album: "Single",
      url: "./music/track/Tran-Huyen-Trang_Hon-Ca-Yeu.mp3",
      cover_art_url: "./music/cover/Tran-Huyen-Trang_Hon-Ca-Yeu.png",
    },
  ],
});

/*
  Shows the playlist
*/
document
  .getElementsByClassName("show-playlist")[0]
  .addEventListener("click", function () {
    document
      .getElementById("white-player-playlist-container")
      .classList.remove("slide-out-top");
    document
      .getElementById("white-player-playlist-container")
      .classList.add("slide-in-top");
    document.getElementById("white-player-playlist-container").style.display =
      "block";
  });

/*
  Hides the playlist
*/
document
  .getElementsByClassName("close-playlist")[0]
  .addEventListener("click", function () {
    document
      .getElementById("white-player-playlist-container")
      .classList.remove("slide-in-top");
    document
      .getElementById("white-player-playlist-container")
      .classList.add("slide-out-top");
    document.getElementById("white-player-playlist-container").style.display =
      "none";
  });
