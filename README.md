
## The To-Do App

A simple demonstration using Jquery, node, express, and pg to display a list of tasks that can be added to and updated.

**Here are the specific components for the challenge:**

* A front end experience that allows a user to create a Task.
* When the Task is created, it is stored inside of a database (SQL)
* Whenever a Task is created the front end refreshes to show all tasks that need to be completed.
* Each Task has an option to 'Complete' or 'Delete'.
* When a Task is complete, its visual representation changes on the front end.
* Whether or not a Task is complete is also be stored in the database.
* Deleting a Task removes it both from the front end as well as the Database.

### Demonstrated Technologies

* HTML
* CSS
* Javascript
* Jquery
* node
* express
* pg
* postgreSQL


### Setup

### Download this repository

* npm install

### Create a Database

Create a new database through Postico. Use the name `weekend-to-do-app`.

### Database Structure

A `database.sql` text file in the repo includes a `CREATE TABLE` query, as well as a query to add some test data.

### Start

* npm start

server defaults to port: 5000

