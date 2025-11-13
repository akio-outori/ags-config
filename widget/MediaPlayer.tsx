import { Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"

let mpris: any = null;
try {
    const Mpris = (await import("gi://AstalMpris" as any)).default;
    mpris = Mpris.get_default();
} catch (e) {
    console.log("MPRIS not available, media player disabled");
}

// Media player state
const playerInfo = Variable({
    title: "",
    artist: "",
    album: "",
    artUrl: "",
    playing: false,
    canPlay: false,
    canPause: false,
    canNext: false,
    canPrev: false,
    position: 0,
    length: 0
}).poll(500, () => {
    const player = mpris.get_players()[0]
    if (!player) {
        return {
            title: "No media playing",
            artist: "",
            album: "",
            artUrl: "",
            playing: false,
            canPlay: false,
            canPause: false,
            canNext: false,
            canPrev: false,
            position: 0,
            length: 0
        }
    }
    
    return {
        title: player.title || "Unknown",
        artist: player.artist || "Unknown Artist",
        album: player.album || "",
        artUrl: player.art_url || "",
        playing: player.playback_status === "Playing",
        canPlay: player.can_play,
        canPause: player.can_pause,
        canNext: player.can_go_next,
        canPrev: player.can_go_previous,
        position: player.position || 0,
        length: player.length || 0
    }
})

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function MediaPlayer() {
    return <box className="media-player">
        {bind(playerInfo).as(info => {
            if (!info.title || info.title === "No media playing") {
                return <box className="media-empty">
                    <label className="media-no-player" label="󰝚 No media" />
                </box>
            }
            
            return <box className="media-content">
                {/* Album Art */}
                {info.artUrl && (
                    <box 
                        className="media-art"
                        css={`
                            background-image: url("${info.artUrl}");
                            background-size: cover;
                            background-position: center;
                        `}
                    />
                )}
                
                {/* Track Info */}
                <box className="media-info" vertical>
                    <label 
                        className="media-title" 
                        label={info.title}
                        truncate
                        max_width_chars={20}
                    />
                    <label 
                        className="media-artist" 
                        label={info.artist}
                        truncate
                        max_width_chars={20}
                    />
                </box>
                
                {/* Controls */}
                <box className="media-controls">
                    <button 
                        className="media-btn"
                        sensitive={info.canPrev}
                        onClicked={() => {
                            const player = mpris.get_players()[0]
                            if (player) player.previous()
                        }}
                    >
                        <label label="󰒮" />
                    </button>
                    
                    <button 
                        className="media-btn play-pause"
                        sensitive={info.playing ? info.canPause : info.canPlay}
                        onClicked={() => {
                            const player = mpris.get_players()[0]
                            if (player) player.play_pause()
                        }}
                    >
                        <label label={info.playing ? "󰏤" : "󰐊"} />
                    </button>
                    
                    <button 
                        className="media-btn"
                        sensitive={info.canNext}
                        onClicked={() => {
                            const player = mpris.get_players()[0]
                            if (player) player.next()
                        }}
                    >
                        <label label="󰒭" />
                    </button>
                </box>
            </box>
        })}
    </box>
}

export function CompactMediaPlayer() {
    return <button className="media-compact" onClicked={() => {
        const player = mpris.get_players()[0]
        if (player) player.play_pause()
    }}>
        {bind(playerInfo).as(info => {
            if (!info.title || info.title === "No media playing") {
                return <label className="media-icon" label="󰝚" />
            }
            
            return <box>
                <label className="media-icon" label={info.playing ? "󰏤" : "󰐊"} />
                <label 
                    className="media-label" 
                    label={`${info.title} - ${info.artist}`}
                    truncate
                    max_width_chars={30}
                />
            </box>
        })}
    </button>
}