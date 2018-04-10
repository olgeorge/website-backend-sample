const loadSecrets = require('./src/scripts/loadSecrets');

const buildConfig = stage => {
    const secrets = loadSecrets.load(stage);

    return {
        client: 'mysql',
        connection: {
            database: secrets.DB_NAME,
            host: secrets.DB_HOST,
            user: secrets.DB_USER,
            password: secrets.DB_PASSWORD,
            timezone: "UTC",
            charset: 'utf8',
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './db/migrations',
        },
    };
};

module.exports = {
    get prod() {
        return buildConfig('prod');
    },

    get dev() {
        return buildConfig('dev');
    },
};
