module.exports = {
    port: '3200',
    cas: {
        servicePrefix: 'http://localhost:3200',
        serverPath: 'http://192.168.111.216:8080',
        switch: false
    },
    proxy: {
        target: 'http://192.168.111.212:8040',
        AUTH_ID: '97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8',
        AUTH_USER: 'admin'
    }
}