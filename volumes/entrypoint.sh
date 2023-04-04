#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo Database details...
echo "----------------------------------"
echo  host: $DB_HOST:$DB_PORT
echo  database: $DB_DATABASE
echo  username: $DB_USER
echo "----------------------------------"

init_db () {

  echo create database will start...
  INPUT_SQL_FILE="create-database.sql"

  # run the init script to create the DB
  until /opt/mssql-tools/bin/sqlcmd -U $DB_USER -P $DB_PASSWORD -i /tmp/create-database.sql > /dev/null 2>&1
  do
    echo -e "\033[31mSQL server is unavailable - sleeping"

    # Sleep for a second....
    sleep 3
  done

  echo -e "\033[32mDone... Database is running on ${DB_HOST}"
}

# Run init_db and start a SQL Server
init_db & /opt/mssql/bin/sqlservr