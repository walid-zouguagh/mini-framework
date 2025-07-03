import { rout } from "./router.js"

export let currentVdom = null

export function updateVdom(new_dome) {
    currentVdom = new_dome
}


export function render() {
    rout.handleRouteChange()
}