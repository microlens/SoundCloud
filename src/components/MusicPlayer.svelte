<script>
  import { onMount, afterUpdate } from "svelte";
  let player, trackBar;
  let progressPercent = 0;
  let playerClassName = "player";
  let duration;
  let progress = ``;
  const playButton = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="50">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
  </svg>`;
  const pauseButton = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="50">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
  </svg>`;
  const rewindButton = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="28">
    <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
  </svg>`;
  const forwardButton = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" width="28">
    <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
  </svg>`;
  let toggleButton = playButton;
  let time = 0;
  export let autoplay = false;
  export let playlist = [];
  export let curentSongIndex;
  let { audioSource, title, artists, trackCover, albumCover } =
    playlist[curentSongIndex];
  let progressBarWidth, progressBarLeft;
  onMount(async () => {
    const { left, width } = trackBar.getBoundingClientRect();
    progressBarWidth = width;
    progressBarLeft = left;
  });
  afterUpdate(() => {
    ({ audioSource, title, artists, trackCover, albumCover } =
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
  let globalID;
  function onTimeUpdate() {
    trackBar.style["border-left-width"] =
      Math.ceil((time / duration) * progressBarWidth) + "px";
    progress = `${formatTime(time)} / ${formatTime(duration)}`;
    globalID = requestAnimationFrame(onTimeUpdate);
  }
  function onLoadedMetaData() {
    progress = `${formatTime(time)} / ${formatTime(duration)}`;
    autoplay && togglePlay();
  }
</script>

<div class="audioplayer">
  <div>
    <div class={playerClassName}>
      <img src={trackCover} class="author" alt="" width="200" height="200" />
      <img src={albumCover} class="cover-bg" alt="" width="200" height="200" />
    </div>
  </div>
  <div class="panel">
    <h2 class="podcast-title">
      <span class="icon" on:click={togglePlay}>{@html toggleButton}</span>
      {artists} - {title}
    </h2>

    <div
      class="progress-bar"
      on:click={setProgress}
      bind:this={trackBar}
      id="track"
    />

    <div class="controls">
      <span class="icon" on:click={() => (time -= 15)}
        >{@html rewindButton}</span
      >
      <span class="icon" on:click={() => (time += 15)}
        >{@html forwardButton}</span
      >
      <span class="progress-display" id="progress">{progress}</span>
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
  .progress-bar {
    background: var(--player-theme-progress-bg-color);
    border: 0 solid var(--player-theme-progress-color);
    border-width: 0 0 0 1px;
    height: 10px;
    margin: 5px 0;
    border-radius: 5px;
  }
  .podcast-title {
    font-size: 16px;
    font-weight: 900;
    padding: 1rem 0 0 0;
    margin: 0;
  }
  .audioplayer .icon {
    cursor: pointer;
  }
  .audioplayer span {
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
  }
  .audioplayer .progress-display {
    min-width: 48px;
    height: 21px;
    line-height: 21px;
  }
  .audioplayer {
    position: relative;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto 3fr;
    align-self: baseline;
    background-color: var(--player-theme-bg-color);
    color: var(--player-theme-color);
    max-width: 860px;
    font-family: "Noto Sans", Arial, sans-serif;
    font-size: 13px;
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    .audioplayer {
      grid-template-columns: 2fr 5fr;
    }
  }
  .panel {
    padding: 0 10px 0 30px;
    position: relative;
    align-self: flex-start;
  }
  @media all and (min-width: 600px) {
    .player {
      max-width: 120px;
    }
  }
  .player img {
    width: 100%;
    height: auto;
    display: block;
  }
  .player {
    flex: 1 1 120px;
    margin: 10px;
    position: relative;
    z-index: 1;
  }
  .player .author {
    position: absolute;
    z-index: 2;
    transform-origin: 100% 100%;
    transform: translate(220%, 220%);
    width: 36%;
    transition: transform 0.3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
  .player.playing img.author {
    width: 90%;
    transform: translate(5%, 5%);
  }
  .player.playing img.cover-bg {
    filter: blur(1px);
  }
</style>
