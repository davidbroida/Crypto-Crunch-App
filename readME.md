Welcome to Crypto Crunch's documentation. Get started by installing the proper tools to run/ use the app and explore all of its features. 

Crypto Crunch is a simple cryptocurrency web application built with a python/ flask back-end and JavaScript front-end. Once registered, users can browse market statistics for the top 10 crypto currencies, view a live news feed and charted history for each top 10 coin. Additionally, users have the ability to favorite crypto currencies from the home page and add/ remove from their favorites list which is accessable via clicking on their username in the navbar. To view charting & additional details about any project simply click on the desired table row to view additional details. The additional details page displays a 30-day historical price chart along with simple market statistics about each crypto currency. 

To get started, make sure that you have Python 2.7.16 or higher installed on your computer which can be downloaded at https://www.python.org/downloads/. Next inside of the directory with the project files set up a virtual enviornment from the command line in your terminal:

$ python3 -m venv venv

Activate your virtual environment:

$ source venv/bin/activate

Install Flask: 

$ pip install flask 

Make a requirements.txt file in the directory with a list of all of the software needed for the project

$ pip3 freeze > requirements.txt

Run the project files from terminal 

$ ipython3

$ %run app.py

Create the database

$ db.create_all()

$ quit 

$ flask run

The project file should be running on Running on http://127.0.0.1:5000/

Type that URL into your browser and begin to use the app! 

To use the app 
1. Sign up/ log in
2. Click the star icon to favorite a crypto currency
3. View your favorites by clicking your username in the navbar 
4. Click the star icon a 2nd time to remove a crypto currency from your favorites list 
5. Click on any coin to view the details page for that coin






