# Nodejs Crud Generator

Node js crud generator for expressjs and NestJs

## Documentation

- "-d" for database name
- "-u for user name default root
- "-p for password default no password
- "-h for host default 127.0.0.1
- "-pn for database port number default 3306
- "-m for mode of databse options: "entity" or "mysql" default "mysql"
- "-e for entity path default entities/
- "-o for output type options :"express" | "nest" default "nest"
- "-f for file upload path default "uploads/"

## example :

```
npx nodejs-gen -d testDataBase -u root -p password -m mysql -o express
```

## Features

- NestJs Crud generator
- ExpressJs Crud generator
- generate crud from mysql database
- generate crud from mysql and entity
- generated project depend on typeorm
- ability to do any kind of filter or relation in one query

## Development

Want to contribute? Great!
