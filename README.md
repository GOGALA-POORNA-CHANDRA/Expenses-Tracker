Expenses Tracker

A simple and intuitive Expenses Tracker application built using Spring Boot, Spring Data JPA, MySQL, and REST APIs. This project allows users to track their daily expenses, categorize them, and view summaries.

⸻

Features
	•	Add, update, and delete expenses.
	•	Categorize expenses (e.g., Food, Travel, Bills, etc.).
	•	Retrieve all expenses or filter by category/date.
	•	RESTful API design for easy integration with frontend applications.
	•	MySQL database for storing expense records.
	•	H2 console enabled for quick database inspection during development.

⸻

Technologies Used
	•	Java 21
	•	Spring Boot 3
	•	Spring Data JPA
	•	MySQL
	•	H2 Database (for testing)
	•	Maven (build and dependency management)

⸻

Getting Started

Prerequisites
	•	Java 21 or above
	•	Maven
	•	MySQL (or any relational database)

Steps to Run
	1.	Clone the repository:
      git clone https://github.com/GOGALA-POORNA-CHANDRA/Expenses-Tracker.git
  2.	Navigate to the project directory:
      cd Expenses-Tracker
  3.  Update database credentials in application.properties:
      spring.datasource.url=jdbc:mysql://localhost:3306/tracker?useSSL=false&allowPublicKeyRetrieval=true
      spring.datasource.username=YOUR_DB_USERNAME
      spring.datasource.password=YOUR_DB_PASSWORD
  4.  Build and run the project:
      mvn spring-boot:run
  	5.	Access the APIs using Postman at:
    http://localhost:8080/api/expenses


    
⸻

API Endpoints
	•	GET /api/expenses – Get all expenses
	•	GET /api/expenses/{id} – Get expense by ID
	•	POST /api/expenses – Add a new expense
	•	PUT /api/expenses/{id} – Update an existing expense
	•	DELETE /api/expenses/{id} – Delete an expense

⸻

Future Improvements
	•	Add user authentication and authorization using JWT.
	•	Integrate with a frontend (React/Angular) for a complete web app.
	•	Generate reports and charts for expense summaries.

⸻

Author

Poorna Yadav
GitHub: GOGALA-POORNA-CHANDRA
