# Enhanced AGS Bar for Hyprland

## Features

### 🎨 Visual Enhancements
- **Glassmorphism effects** with backdrop blur and transparency
- **Smooth animations** with cubic-bezier curves
- **Modern rounded corners** and gradient backgrounds
- **Dynamic color themes** via Wallust integration
- **Hover effects** with lifting animations and scale transforms

### 📊 Hardware Monitoring
- **CPU**: Usage percentage and temperature monitoring
- **GPU**: NVIDIA GPU usage, temperature, and memory (RTX 4070 Ti detected)
- **RAM**: Usage percentage and actual GB used
- **Network**: Real-time upload/download speeds with IEC formatting

### 🎮 Profile Modes
- **Programming Mode**: Quick access to VS Code, Terminal, Firefox
- **Gaming Mode**: Full hardware monitoring display for performance tracking

### 🎵 Media Integration
- Compact media player with play/pause controls
- Shows current track and artist
- MPRIS integration for all media players

### 🔧 System Features
- Workspace indicators with clickable navigation
- Update notifier with package count
- Volume control with mute detection
- Interactive clock with calendar launch
- Power menu integration

## Installation

1. **Ensure dependencies are installed:**
```bash
# Core dependencies
paru -S ags hyprland wofi wlogout pavucontrol

# For hardware monitoring
paru -S nvidia-utils lm_sensors btop

# For media control
paru -S playerctl

# Optional tools
paru -S gnome-calendar brightnessctl
```

2. **Enable the enhanced bar:**
```bash
# Switch to enhanced mode
~/.config/ags/scripts/switch-bar.sh enhanced

# Or add to Hyprland startup
echo "exec-once = ~/.config/ags/scripts/switch-bar.sh enhanced" >> ~/.config/hypr/hyprland.conf
```

3. **Add enhanced animations to Hyprland:**
```bash
# Add to your hyprland.conf
echo "source = ~/.config/hypr/settings/animations-enhanced.conf" >> ~/.config/hypr/hyprland.conf
```

4. **Configure keybindings:**
```bash
# Add to your hyprland.conf
echo "source = ~/.config/hypr/settings/keybinds-enhanced.conf" >> ~/.config/hypr/hyprland.conf
```

## Usage

### Switching Bar Modes
```bash
# Enhanced mode (default)
~/.config/ags/scripts/switch-bar.sh enhanced

# Classic mode (original bar)
~/.config/ags/scripts/switch-bar.sh classic

# Gaming optimized
~/.config/ags/scripts/switch-bar.sh gaming

# Programming optimized
~/.config/ags/scripts/switch-bar.sh programming
```

### Keyboard Shortcuts
- `Super + Shift + B` - Switch to enhanced bar
- `Super + Shift + C` - Switch to classic bar
- `Super + Shift + G` - Gaming mode
- `Super + Shift + P` - Programming mode
- `Super + Shift + R` - Reload AGS

### Customization

#### Colors
Edit `/home/jeff/.cache/wallust/ags-colors.scss` or let Wallust manage themes automatically.

#### Widget Visibility
Edit `BarEnhanced.tsx` to show/hide specific widgets:
- Comment out widgets you don't need
- Rearrange widget order in the left/center/right modules

#### Hardware Monitoring Intervals
Adjust polling intervals in `BarEnhanced.tsx`:
- GPU/CPU: 2000ms (2 seconds) default
- Network: 2000ms with 1-second sampling
- Volume: 1000ms (1 second)

## Troubleshooting

### Bar not showing
```bash
# Check AGS is running
pgrep ags

# Restart AGS
pkill -x ags && cd ~/.config/ags && ags run app-enhanced.ts
```

### Hardware stats not working
```bash
# Check NVIDIA driver
nvidia-smi

# Check sensors
sensors-detect
sensors
```

### Media player not detecting
```bash
# Check MPRIS players
playerctl --list-all
```

## Performance Tips

1. **Reduce animations** if experiencing lag:
   - Edit `animations-enhanced.conf`
   - Reduce blur passes in decoration section

2. **Disable unused widgets**:
   - Remove hardware monitors if not gaming
   - Disable media player if not using

3. **Adjust polling intervals**:
   - Increase intervals for less frequent updates
   - Reduces CPU usage

## Credits
Based on AGS (Aylur's GTK Shell) with inspiration from:
- end-4/dots-hyprland
- Material Design principles
- Modern Linux rice community