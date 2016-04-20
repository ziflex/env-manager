module.exports = {
    name: 'development',
    test: {
        server: {
            port: 9090,
            singleRun: false
        },
        paths: 'development'
    },
    build: {
        watch: true
    }
};
