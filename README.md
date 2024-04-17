<p align="center">
  <img src="architecture.png" alt="Dealerships Django Website" width="460">
</p>

<h1 align="center"> Dealerships Django Website</h>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Build Status" src="https://img.shields.io/badge/build-passing-teal.svg">
</p>

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)

# Overview

<p style="text-align: justify;">
The final capstone project for this course consists of several steps. The project is divided into smaller labs with detailed instructions for each step. Completion of all labs is required for successful project completion.
</p>

## Project Breakdown

### Setup and Cloning

1. **Fork the Repository**: Fork the GitHub repo containing the project template.
2. **Clone Repository**: Clone the repository in the Cloud IDE environment.

### Static Pages

1. Create static pages to fulfill user stories.

### Local Setup

1. **Run Locally**: Run the application locally.
2. **User Management**: Add user management to the Django application.

### Backend Services

1. **Node.js Server**: Create a Node.js server to manage dealers and reviews using MongoDB and Dockerize it.
2. **Deploy Sentiment Analyzer**: Deploy sentiment analyzer on Code Engine.
3. **Django Models and Views**: Create Django models and views to manage car models and car makes.
4. **Proxy Services**: Create Django proxy services and views to integrate dealers and reviews.

### Dynamic Pages

1. **Dealers Page**: Create a page that displays all the dealers.
2. **Reviews Page**: Create a page that displays reviews for a selected dealer.
3. **Add Review Page**: Create a page that lets the end user add a review for a selected dealer.

### CI/CD and Testing

1. **CI/CD Setup**: Set up continuous integration and delivery for code linting.
2. **Run and Test**: Run the application on Cloud IDE and test it locally.
3. **Deployment**: Deploy the application on Kubernetes.

## Solution Architecture

### Technologies Used

- **Django**: Web application framework
- **Node.js**: Backend server for managing dealers and reviews
- **MongoDB**: Database for storing dealer and review data
- **Docker**: Containerization for Node.js server
- **IBM Cloud Code Engine**: Deployment platform for sentiment analyzer
- **SQLite**: Database for storing car make and model data

### Services

#### Dealerships Website (Django Application)

- **Microservices**:
  - `get_cars/`: Get list of cars
  - `get_dealers/`: Get list of dealers
  - `get_dealers/:state`: Get dealers by state
  - `dealer/:id`: Get dealer by ID
  - `review/dealer/:id`: Get reviews for a dealer
  - `add_review/`: Post review about a dealer

- **Database**: SQLite for Car Make and Car Model data

#### Dealerships and Reviews Service (Express Mongo Service)

- **Services**:
  - `/fetchDealers`: Fetch the dealers
  - `/fetchDealer/:id`: Fetch the dealer by ID
  - `/fetchReviews`: Fetch all reviews
  - `/fetchReview/dealer/:id`: Fetch reviews for a dealer by ID
  - `/insertReview`: Insert a review

#### Sentiment Analyzer Service (IBM Cloud Code Engine)

- **Service**:
  - `/analyze/:text`: Analyze the sentiment of the text (returns positive, negative, or neutral)

**Interaction**:
- **Django Proxy Service**: Interacts with "Dealerships and Reviews Service" and "Sentiment Analyzer Service" to provide combined functionality within the Django application.

## Configuration Steps

### Django Environment Setup

1. **Navigate to Server Directory**:
   ```sh
   cd /home/project/xrwvm-fullstack_developer_capstone/server


## Configuration

### 1. Clone the Repository
```sh
git clone https://github.com/nattalliit/xrwvm-ibm-fullstack_developer_capstone.git
cd /home/project/xrwvm-ibm-fullstack_developer_capstone/server
```
### 2. Run the following to set up the Django environment
```sh
pip install django
pip install virtualenv
virtualenv djangoenv
source djangoenv/bin/activate
```
### 3. Install the required packages by running the following command
```sh
python3 -m pip install -U -r requirements.txt
```
### 4. Run the following command to perform model migration
```sh
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
### 5. Open a new terminal and build the front end as before
```sh
cd /home/project/xrwvm-fullstack_developer_capstone/server/frontend
npm install
npm run build
```

### 6. Add host data to server/djangoproj/settings.py
```sh
ALLOWED_HOSTS = ['localhost','https://nrudnikova-8000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai']
CSRF_TRUSTED_ORIGINS = ['https://nrudnikova-8000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai']






