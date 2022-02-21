
import os
from flask import Flask, render_template, request, flash, redirect, session, g, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Favorites, Crypto
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
    cryptos = Crypto.query.all()
    favorites = Favorites.query.filter(Favorites.user_id == user_id).all()

    return render_template('users/detail.html', user = user, favorites = favorites, cryptos = cryptos)


################### PAGES #########################


@app.route('/')
def homepage():
    """show homepage"""

    if g.user:

        user = g.user
        user_id = user.id
        cryptos = Crypto.query.all()
        favorites = Favorites.query.filter(Favorites.user_id == user_id).all()

        return render_template('home.html', cryptos = cryptos, favorites = favorites, user = user)

    else:
        return render_template('home-anon.html')



################ CONVERT DB DATA TO JSON ###########################################


@app.route('/api/favorites')
def list_favorites():
    all_favorites = [favorite.serialize() for favorite in Favorites.query.all()]
    return jsonify(favorites=all_favorites)

@app.route('/api/users')
def list_users():
    all_users = [user.serialize() for user in User.query.all()]
    return jsonify(users=all_users)

@app.route('/api/cryptos')
def list_cryptos():
    all_cryptos = [crypto.serialize() for crypto in Crypto.query.all()]
    return jsonify(cryptos = all_cryptos)


#####################  HANDLE ADD AND DELETE FAVORITES    ##########################




@app.route('/api/favorites/<int:user_id>', methods = ['POST'])
def add_favorite(user_id):

    user = g.user
    new_favorite = Favorites(user_id= user.id,
                            crypto_id = request.json["crypto_id"])
                            
    db.session.add(new_favorite)
    db.session.commit()
    response_json = jsonify(favorite= new_favorite.serialize())
    # flash('Added to favorites!', 'success');
    return (response_json, 201)



@app.route('/api/favorites/<int:crypto_id>', methods=["DELETE"])
def delete_favorite(crypto_id):
   
    favorite = Favorites.query.filter(Favorites.crypto_id == crypto_id).first()
    # favorite = Favorites.query.get_or_404(crypto_id)
    db.session.delete(favorite)
    db.session.commit()
    flash('Removed from favorites.', 'danger');
    return jsonify(message="deleted")


#####################  ADD CRYPTO TO DATABASE    ##########################




@app.route('/api/cryptos', methods = ['POST'])
def add_crypto():

    new_crypto = Crypto(crypto_name = request.json['crypto_name'],
                        price = request.json['price'],
                        percent = request.json['percent'],
                        marketcap = request.json['marketcap'])

    db.session.add(new_crypto)
    db.session.commit()

    response_json = jsonify(crypto= new_crypto.serialize())
    return(response_json, 201)




@app.route('/info/<symbol>/<price>/<percent>/<mc>')
def details_page(symbol,price, percent, mc):


    
    # return render_template ("users/info.html", symbol = symbol, price =price,percent =percent,mc = mc)
    return render_template('users/info.html', symbol = symbol, price = price, percent = percent, mc = mc)






# @app.route('/api/favorites/<int:id>', methods=["PATCH"])
# def update_favorite(id):
#     favorite = Favorites.query.get_or_404(id)
#     favorite.user_id = request.json.get('user_id', favorite.user_id)
#     favorite.crypto_id = request.json.get('cryto_id', favorite.cryptos_id)
#     db.session.commit()
#     return jsonify(favorite=favorite.serialize())

# @app.route('/api/favorites/<int:id>', methods=["DELETE"])
# def delete_favorite(id):
#     favorite = Favorites.query.get_or_404(id)
#     db.session.delete(favorite)
#     db.session.commit()
#     return jsonify(message="deleted")


# @app.route('/api/favorites/<int:id>')
# def get_favorite(id):
#     favorite = Favorites.query.get_or_404(id)
#     return jsonify(favorite= favorite.serialize())