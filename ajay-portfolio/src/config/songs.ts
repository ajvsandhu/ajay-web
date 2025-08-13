// Add your songs here - just put the filename and info!
// Drop your MP3 files in public/my-song.mp3/ and list them here

export const mySongs = [
 

  {
    filename: "song1.mp3",           
    title: "Inside Outside",     
    artist: "Mac Miller"          
  },

  {
    filename: "song2.mp3",           
    title: "The Modern Age",     
    artist: "The Strokes"           
  },

  {
    filename: "song3.mp3",           
    title: "VeLDÁ",      
    artist: "Bad Bunny"         
  },

  {
    filename: "song4.mp3",           
    title: "Breath (In The Air)",     
    artist: "Pink Floyd"          
  },

  {
    filename: "song5.mp3",           
    title: "Reborn",    
    artist: "Kanye West"          
  },

  
  // Add more songs like this:
  // {
  //   filename: "chill-beats.mp3",
  //   title: "CHILL STUDY BEATS", 
  //   artist: "LO-FI PRODUCER"
  // },
  // {
  //   filename: "focus-music.mp3",
  //   title: "DEEP FOCUS MODE",
  //   artist: "AMBIENT SOUNDS"
  // }
];

// Auto-generate the full paths (you don't need to touch this)
export const songs = mySongs.map(song => ({
  src: `/my-song.mp3/${song.filename}`,
  title: song.title,
  artist: song.artist
})); 