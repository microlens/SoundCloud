<script>
  import { onMount, afterUpdate } from "svelte";

  const playButton = `<i class=" fa fa-play"></i>`;
  const pauseButton = `<i class=" fa fa-pause"></i>`;

  let player, trackBar;
  let progressPercent = 0;
  let duration;
  let progress = ``;
  let toggleButton = playButton;
  let time = 0;
  export let autoplay = false;
  export let playlist = [];
  export let curentSongIndex;
  let { audioSource, title, artists, songCover, albumCover } =
    playlist[curentSongIndex];
  let progressBarWidth, progressBarLeft;

  onMount(async () => {
    const { left, width } = trackBar.getBoundingClientRect();
    progressBarWidth = width;
    progressBarLeft = left;
  });
  afterUpdate(() => {
    ({ audioSource, title, artists, songCover, albumCover } =
      playlist[curentSongIndex]);
  });

  function setProgress(e) {
    const x = e.clientX - progressBarLeft; //x position within the element.
    progressPercent = x / progressBarWidth;
    time = progressPercent * duration;
  }
  function togglePlay() {
    if (player.paused) {
      player.play();
      toggleButton = pauseButton;
      playerClassName = "player playing";
    } else {
      player.pause();
      toggleButton = playButton;
      playerClassName = "player";
    }
  }
  function onPlaying() {
    toggleButton = pauseButton;
    playerClassName = "player playing";
  }
  function onEnded() {
    toggleButton = playButton;
    playerClassName = "player";
    curentSongIndex =
      curentSongIndex >= playlist.length - 1
        ? curentSongIndex
        : curentSongIndex + 1; //play next song if possible
  }
  function formatTime(seconds) {
    const minutes = parseInt(seconds / 60);
    const onlySeconds = (parseInt(seconds % 60) + "").padStart(2, "0");
    return `${minutes}:${onlySeconds}`;
  }
  function onTimeUpdate() {
    trackBar.style["border-left-width"] =
      Math.ceil((time / duration) * progressBarWidth) + "px";
    progress = `${formatTime(time)} / ${formatTime(duration)}`;
  }
  function onLoadedMetaData() {
    progress = `${formatTime(time)} / ${formatTime(duration)}`;
    autoplay && togglePlay();
  }
</script>

<div class="current-song">
  <div class="songCover">
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={songCover} />
  </div>
  <div class="song-controls">
    <h2>{artists} - {title}</h2>
    <div
      class="progress-bar"
      on:click={setProgress}
      bind:this={trackBar}
      id="track"
    />
    <div class="controls">
      <div class="container">
        <div class="control-button">
          <button class="icon" on:click={() => (time -= 20)}>
            <i class=" fa fa-backward" />
          </button><button class="icon" on:click={togglePlay}>
            {@html toggleButton}
          </button><button class="icon" on:click={() => (time += 20)}>
            <i class=" fa fa-forward" />
          </button>
        </div>
        <div class="time">
          <button class="progress-display" id="progress">
            {progress}
          </button>
        </div>
      </div>
    </div>
    <audio
      src={audioSource}
      bind:this={player}
      bind:currentTime={time}
      bind:duration
      on:timeupdate={onTimeUpdate}
      on:loadedmetadata={onLoadedMetaData}
      on:playing={onPlaying}
      on:ended={onEnded}
      preload="metadata"
    />
  </div>
</div>

<style>
  audio {
    display: none;
  }
  .current-song {
    height: 120px;
    padding: 10px;
    display: flex;
    background: rgba(255, 255, 255, 0.8);
    z-index: 2;
  }
  .songCover {
    width: 100px;
    height: 100px;
    padding: 10px;
    text-align: center;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  .song-controls {
    padding-left: 10px;
    flex: 1;
  }
  .icon {
    cursor: pointer;
  }
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    color: #111;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .control-button {
    grid-area: 1 / 1 / 2 / 4;
  }
  .time {
    grid-area: 1 / 4 / 2 / 6;
  }
  .progress-bar {
    background: #fff;
    border: 0 solid #ffbf00;
    border-width: 0 0 0 1px;
    height: 10px;
    margin: 5px 0;
    border-radius: 5px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    padding-right: 40px;
  }
  .progress-display {
    font-size: 20px;
    min-width: 120px;
  }
  button {
    outline: none;
    border: none;
    background: transparent;
    color: #111;
    font-size: 20px;
    cursor: pointer;
  }
</style>
