import { App } from "astal/gtk3"
import style from "./style.scss"
import BarSimple from "./widget/BarSimple"

App.start({
    css: style,
    main() {
        App.get_monitors().map(BarSimple)
    },
})