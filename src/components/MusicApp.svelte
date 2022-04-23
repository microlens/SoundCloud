<script>
  import MusicPlayer from "./MusicPlayer.svelte";
  export let playlist = [];
  let curentSongIndex = 0;
  let autoplay;
  function changeSong(index) {
    curentSongIndex = index;
    autoplay = true;
  }
</script>

<div class="player">
  <MusicPlayer {playlist} {autoplay} bind:curentSongIndex />
  <div class="song-list">
    {#each playlist as item, index}
      <div
        class={index === curentSongIndex ? "active" : ""}
        on:click={() => changeSong(index)}
      >
        <div class="songCover">
          <!-- svelte-ignore a11y-missing-attribute -->
          <img src={item.songCover} />
        </div>
        <div class="song-details">
          <h2>{item.title}</h2>
          <p>{item.artists}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .player {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 430px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
  }
  .song-list {
    height: calc(100% - 120px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 8px 32px 0 rgba(32, 38, 135, 0.2);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    overflow-y: auto;
  }
  .song-list::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }
  .song-list::-webkit-scrollbar-thumb {
    width: 4px;
    background: #fff;
  }
  .song-list > div {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
  }
  .song-list > div.active {
    background: rgba(255, 255, 255, 0.25);
  }
  .song-list > div .songCover {
    width: 50px;
    height: 50px;
    text-align: center;
    padding: 10px;
  }
  .song-list > div .songCover img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .song-list > div .song-details {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .song-list > div .song-details h2 {
    font-size: 16px;
    margin: 0px 0px 2px;
    color: #fff;
  }
  .song-list > div .song-details p {
    color: #eee;
    font-size: 15px;
    margin: 0px;
  }
</style>
