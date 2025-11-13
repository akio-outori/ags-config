# AGS Bar Configuration Status

## Current Setup (as of Nov 9, 2024)

### Active Configuration Files
- **Main App**: `app-enhanced.ts` (launched by Hyprland)
- **Bar Widget**: `widget/BarEnhanced.tsx`
- **Styles**: `style-minimal-bar.scss`
- **Auto-restart**: `ags-monitor.sh`
- **Git Repo**: `~/.config/ags/ags-hyprland-config/`

### Bar Specifications
- **Height**: 22px (reduced from 44px)
- **Width**: Nearly full screen (margin: 8px 2px)
- **Position**: Top center
- **Opacity**: 0.9
- **Font**: JetBrainsMono Nerd Font, 10-11px

### Current Widgets (Left to Right)

#### Left Section
1. **Launcher** (󱓞) - Opens wofi app launcher
2. **Shortcuts** (󰌌) - Shows Hyprland keybindings

#### Center Section
- Empty (reserved for future use)

#### Right Section  
1. **Updates** - Only visible when updates available
2. **CPU** - Shows usage % and both CCD temps (45°/42°C format)
3. **GPU** - Shows wattage and temperature 
4. **RAM** - Shows percentage and GB used
5. **Network** - Download/upload speeds
6. **Volume** - Percentage with dynamic icon
7. **Clock** - Time and date
8. **Power** - Logout/shutdown menu

### Monitoring Details
- **CPU Temp**: Reads Tccd1 and Tccd2 (actual die temps)
- **GPU**: Shows power draw in watts from nvidia-smi
- **RAM**: Calculates used memory excluding cache/buffers
- **Update Frequency**: 
  - Temps/GPU: 1 second
  - CPU/RAM/Network: 2 seconds
  - Updates check: 5 minutes

### Auto-restart Configuration
- Bar automatically restarts if crashed
- Startup script: `~/.config/hypr/scripts/startup.sh`
- Wallpaper switch: `~/.config/hypr/scripts/wallpaper-switch.sh`
- Both scripts use `app-enhanced.ts`

### Known Issues/Future Work
1. Bar width controlled by margins (inverse relationship)
2. Some GTK3 CSS limitations (no transform, flex, max-width)
3. btop not installed (CPU widget falls back to htop)

### Key Commands
```bash
# Restart AGS manually
killall gjs 2>/dev/null
cd ~/.config/ags && ags run app-enhanced.ts &

# View shortcuts
grep "^bind = " ~/.config/hypr/hyprland.conf

# Monitor AGS
~/.config/ags/ags-monitor.sh

# Git operations
cd ~/.config/ags/ags-hyprland-config
git status
git push origin master
```

### Color Theme
- Colors pulled from: `/home/jeff/.cache/wallust/ags-colors.scss`
- Updates automatically with wallpaper changes (Super+W)
- Variables: $bar-bg, $text, $accent, $widget-bg, $urgent, etc.

### Recent Changes (This Session)
1. Fixed CPU temp to show both CCDs
2. Changed GPU from % to wattage
3. Added shortcuts button for keybindings
4. Reduced bar height by 50%
5. Expanded bar to nearly full width
6. Improved widget spacing
7. Fixed htop launch command

### Dependencies
- ags (Aylur's GTK Shell)
- sensors (lm_sensors)
- nvidia-smi
- alacritty
- wofi
- wallust (for colors)
- JetBrainsMono Nerd Font