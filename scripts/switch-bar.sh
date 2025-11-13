#!/bin/bash

# Script to switch between classic and enhanced AGS bar

MODE=${1:-enhanced}

case $MODE in
    classic)
        echo "Switching to classic bar..."
        export AGS_BAR_MODE=classic
        ;;
    enhanced)
        echo "Switching to enhanced bar..."
        export AGS_BAR_MODE=enhanced
        ;;
    gaming)
        echo "Switching to gaming-optimized bar..."
        export AGS_BAR_MODE=enhanced
        # Could add gaming-specific settings here
        ;;
    programming)
        echo "Switching to programming-optimized bar..."
        export AGS_BAR_MODE=enhanced
        # Could add programming-specific settings here
        ;;
    *)
        echo "Usage: $0 [classic|enhanced|gaming|programming]"
        exit 1
        ;;
esac

# Kill existing AGS instance
pkill -x ags

# Wait a moment
sleep 0.5

# Start AGS with the selected mode
if [ "$MODE" = "classic" ]; then
    cd ~/.config/ags && ags run app.ts &
else
    cd ~/.config/ags && ags run app-enhanced.ts &
fi

echo "Bar switched to $MODE mode"