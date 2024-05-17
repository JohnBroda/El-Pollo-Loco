
/**
 * Represents a collection of audio files used in the game.
 */

class AUDIO {
    character = [
        new Audio('audio/character/jump_sound.MP3'), 
        new Audio('audio/character/walking_sound.MP3'), 
        new Audio('audio/character/hurt_sound.MP3'), 
        new Audio('audio/character/death_sound.MP3'),
        new Audio('audio/character/head_jump_sound.mp3'),
        new Audio('audio/character/snoring_sound.mp3')
    ]

    throwableobjects = [
        new Audio('audio/throw/throw_sound.MP3'), 
        new Audio('audio/throw/bottle_break_sound.MP3')
    ]


    collectables =  [
        new Audio('audio/collect/coin_collect.wav'), 
        new Audio('audio/collect/salsa_collect.MP3')]

    chickenboss = [
        new Audio('audio/enemies/chickenboss/chickenboss_alert.MP3'),
        new Audio('audio/enemies/chickenboss/chickenboss_attack.MP3'),
        new Audio('audio/enemies/chickenboss/chickenboss_hurt.MP3'),
        new Audio('audio/enemies/chickenboss/chickenboss_dead.MP3'),
    ]

    chicken = [
        new Audio('audio/enemies/chicken/chicken_death_sound.MP3'),
    ]

    chick = [
        new Audio('audio/enemies/chick/chick_sound.MP3')
    ]

    backgroundmusic = [
        new Audio('audio/background/background_music.mp3'),
        new Audio('audio/background/death_music.mp3'),
        new Audio('audio/background/victory_music.mp3')
    ]

    /**
     * Creates sounds array and muteAll().
     */

    constructor(){
        this.sounds = []
        this.muteAll()
        this.mute = false
    }
    
    /**
     * Mutes or unmutes all audio files based on the mute status.
     */

    muteAll() {
        Object.values(this).forEach(soundArray => {
            soundArray.forEach(sound => {
                setInterval(() => {
                    this.sounds =  sound
                    this.sounds.muted = this.mute
                }, 1000/24);
            });
        });
    }


}