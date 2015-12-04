// Update with your config settings.
module.exports = {

  development: {
    client: 'postgresql',
    connection: "postgresql://adam:password@172.17.0.3:5432/aptjuju_dev",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'apt_juju_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: "postgresql://adam:password@172.17.0.3:5432/aptjuju_prod",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'apt_juju_migrations'
    }
  }

};
