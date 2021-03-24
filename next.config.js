const { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } = require('next/constants')

module.exports = (phase) => {

    if (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) {
        return {
            env: {
                SERVER_URL: process.env.SERVER_URL,
            }
        }
    }

    return {
        env: {
            SERVER_URL: "https://localhost:5001",
        },
    }
}
