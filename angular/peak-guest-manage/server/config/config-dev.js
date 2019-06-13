module.exports = {
    port: '3200',
    cas: {
        servicePrefix: 'http://localhost:3200',
        serverPath: 'http://192.168.111.217:8080',
        switch: false
    },
    proxy: {
        target: 'http://192.168.111.217:8040',
        AUTH_ID: '3645399f-615a-42f8-89ef-b3caa55a5d44',
        AUTH_USER: 'admin'
    }
}