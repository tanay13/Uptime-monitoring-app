//config variables


//container for all the env

var environments = {}

// staging (default) env

environments.staging = {
    'port':3000,
    'envName':'staging'
}

//production environment

environments.production = {
    'port':5000,
    'envname':'production'
}

//determine which env to be passed as a CL argument

var currentEnv = typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : ""

// check the current env is one of the environments above

var environmentToExport = typeof(environments[currentEnv])=='object'?environments[currentEnv]:environments.staging


//export the module

module.exports = environmentToExport;