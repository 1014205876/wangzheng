export default {
    loadMap() {
        return new Promise((resolve, reject) => {
            window['onLoad'] = function () {
                resolve(true)
            }
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = 'https://webapi.amap.com/maps?v=1.4.14&key=6fa4c245ea68923673e4912266989d10&callback=onLoad'
            script.onerror = reject
            document.head.appendChild(script)
        })

    }
}