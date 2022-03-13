# Detection Pivot

DetectionPivot — it is a host intrusion detection system (HIDS) followed by analysis of the results detecting security events in SIEM and obtaining a conclusion about the presence of backdoors.

(Completed HIDS only)

## Setup 

```
# Clone repository:
git clone https://github.com/MasterJOI/Detection-Pivot.git

# launch local web-server:

cd frontend
npm install
npm start

# launch HIDS server:

1. Install the PostgreSQL database from the official website for the respective OS: https://www.postgresql.org/download/
2. Install the pgAdmin 4 database development program: https://www.pgadmin.org/download/
3. Enter the login / password to connect to the database server (preset: login: postgres, password: admin, server port: 5432).
4. Create a database named "detection_pivot"
5. 5. Go to the directory "\DetectionPivot\backend" and execute the following commands in the terminal:

gradlew flywayMigrate
gradlew build
gradlew bootRun
```
## License

Licensed under the [MIT](LICENSE.txt) license.
