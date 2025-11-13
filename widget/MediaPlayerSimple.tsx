import { Gtk } from "astal/gtk3"
import { Variable, bind } from "astal"

// Simple media player using playerctl commands
const playerInfo = Variable({
    title: "",
    artist: "",
    playing: false
}).poll(1000, ["bash", "-c", `
    status=$(playerctl status 2>/dev/null || echo "No player")
    if [ "$status" = "Playing" ] || [ "$status" = "Paused" ]; then
        title=$(playerctl metadata title 2>/dev/null || echo "Unknown")
        artist=$(playerctl metadata artist 2>/dev/null || echo "Unknown Artist")
        echo "{ \\"title\\": \\"$title\\", \\"artist\\": \\"$artist\\", \\"playing\\": $([ "$status" = "Playing" ] && echo "true" || echo "false") }"
    else
        echo "{ \\"title\\": \\"\\", \\"artist\\": \\"\\", \\"playing\\": false }"
    fi
`], (out) => {
    try {
        return JSON.parse(out);
    } catch {
        return { title: "", artist: "", playing: false };
    }
})

export function CompactMediaPlayer() {
    return <button className="media-compact" onClicked="playerctl play-pause">
        {bind(playerInfo).as(info => {
            if (!info.title) {
                return <label className="media-icon" label="󰝚" />
            }
            
            return <box>
                <label className="media-icon" label={info.playing ? "󰏤" : "󰐊"} />
                <label 
                    className="media-label" 
                    label={`${info.title} - ${info.artist}`}
                    truncate={true}
                    max_width_chars={30}
                />
            </box>
        })}
    </button>
}