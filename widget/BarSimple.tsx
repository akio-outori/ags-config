import { App, Astal, Gtk, Gdk } from "astal/gtk3"
import { Variable, bind } from "astal"

// Time and date
const time = Variable("--:--").poll(1000, "date '+%H:%M'")
const date = Variable("").poll(60000, "date '+%a %b %d'")

// Hardware monitoring
const cpuUsage = Variable("0").poll(2000, ["bash", "-c", 
    "top -bn1 | grep 'Cpu(s)' | awk '{print int(100 - $8)}'"
])

const ramInfo = Variable("0").poll(2000, ["bash", "-c", 
    "free -m | awk 'NR==2 {printf \"%.0f\", $3/$2*100}'"
])

const gpuInfo = Variable("0").poll(2000, ["bash", "-c", 
    "nvidia-smi --query-gpu=utilization.gpu --format=csv,noheader,nounits | head -1"
])

function Clock() {
    return <box className="clock-box">
        <label className="time" label={bind(time)} />
        <label className="date" label={bind(date)} />
    </box>
}

function SystemStats() {
    return <box className="system-stats">
        <button className="stat-item" onClicked="alacritty -e htop">
            <label label={bind(cpuUsage).as(v => `CPU: ${v}%`)} />
        </button>
        <button className="stat-item" onClicked="alacritty -e htop">
            <label label={bind(ramInfo).as(v => `RAM: ${v}%`)} />
        </button>
        <button className="stat-item" onClicked="nvidia-settings">
            <label label={bind(gpuInfo).as(v => `GPU: ${v}%`)} />
        </button>
    </box>
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        className="BarSimple"
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox className="bar-content">
            <box className="left">
                <button className="launcher" onClicked="wofi --show drun">
                    Apps
                </button>
            </box>
            <box className="center">
                <SystemStats />
            </box>
            <box className="right">
                <Clock />
                <button className="power" onClicked="wlogout">
                    Power
                </button>
            </box>
        </centerbox>
    </window>
}