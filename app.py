
import os
from flask import Flask, render_template, request, flash, redirect, session, g
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User
from sqlalchemy.exc import IntegrityError
from forms import UserAddForm, LoginForm

CURR_USER_KEY = "curr_user"

app = Flask(__name__)

# Get DB_URI from environ variable (useful for production/testing) or,
# if not set there, use development local db.
app.config['SQLALCHEMY_DATABASE_URI'] = (
    os.environ.get('DATABASE_URL', 'postgresql:///capstone_1_db'))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', "it's a secret")
toolbar = DebugToolbarExtension(app)

connect_db(app)

##############################################################################
# User signup/login/logout

@app.before_request
def add_user_to_g():
    """If we're logged in, add current user to Flask global object."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None

def do_login(user):
    """log in user"""

    session[CURR_USER_KEY] = user.id



@app.route('/signup', methods=["GET", "POST"])
def signup():
    """display signup page"""

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                name = form.name.data,
                username = form.username.data,
                password = form.password.data
            )
            db.session.commit()
        
        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form = form)

        do_login(user)

        return redirect('/')

    else:
        return render_template('users/signup.html', form = form)

@app.route('/login', methods=["GET", "POST"])
def login():

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                form.password.data)

        if user:
            do_login(user)
            flash(f"Welcome back, {user.name}!", "success")
            return redirect("/")
        
        flash("Invalid credentials.", "danger")

    return render_template("users/login.html", form = form)

@app.route('/logout')
def logout():
    """Handle logout of user"""
    flash(f"You are now logged out.", "info")
    session.pop('curr_user')
    return redirect('/login')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Shows user profile"""

    user = User.query.get_or_404(user_id)

    return render_template('users/detail.html', user = user)



@app.route('/')
def homepage():
    """show homepage"""

    if g.user:

        return render_template('home.html')
    
    else:
        return render_template('home-anon.html')
