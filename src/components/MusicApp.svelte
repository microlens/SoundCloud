<!-- Adapted from https://github.com/gotomi/gotomi.info -->

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

<div class="music-app chunk">
  <div class="playlist">
    <ul>
      {#each playlist as item, index}
        <li
          class={index === curentSongIndex ? "active-song" : ""}
          on:click={() => changeSong(index)}
        >
          🎹 {item.title}
        </li>
      {/each}
    </ul>
  </div>
  <MusicPlayer {playlist} autoplay={autoplay} bind:curentSongIndex />
</div>

<style>
  .music-app {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: flex-start;
    grid-gap: 1rem;
  }
  .playlist li,
  .playlist ul {
    list-style: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }
  .playlist li.active-song {
    color: var(--main-bg-color2)
  }
  @media (max-width: 480px) {
    .music-app {
      grid-template-columns: 1fr;
    }
    .playlist li{
      display: inline;
    }
  }
  .playlist {
    background-color: var(--main-bg-color);
    padding: 1rem;
    border-radius: 5px;
    font-size: 90%;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  .playlist ul {
    list-style-type: square;
  }
</style>