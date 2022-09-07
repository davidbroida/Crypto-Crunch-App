from optparse import Values
# from secrets import token_urlsafe
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

def connect_db(app):

    db.app = app
    db.init_app(app)


class Favorites(db.Model):

    __tablename__ = "favorites"

    id = db.Column(db.Integer, primary_key = True)

    user_id = db.Column(db.Integer,
        db.ForeignKey('users.id', ondelete='CASCADE'),
        nullable = False,
        )
    
    crypto_id = db.Column(
        db.Integer,
        db.ForeignKey('cryptos.id', ondelete='CASCADE'),
        nullable = False,
        )

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'crypto_id': self.crypto_id,
        }



class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(50), nullable = False)
    username = db.Column(db.String(50), nullable = False)
    password = db.Column(db.Text, nullable = False)

    # favorites = db.relationship(
    #     "User",
    #     secondary="favorites",
    #     primaryjoin=(Favorites.user_id == id),
    #     secondaryjoin =(Favorites.crypto_id == id),
    # )

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
        }



    @classmethod
    def signup(cls, name, username, password):
        """Sign up user
        
        Hashe password and add user to system
        """

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            name = name,
            username = username,
            password = hashed_pwd
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):
        """ Find user with 'username' and 'password'.
        Class method which searches for a user whose password hash matches this password and if it finds such as user returns that user object.
        
        If a matching user cant be found or the password is wrong it returns False.
        """

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False



class Crypto(db.Model):

    __tablename__ = "cryptos"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    crypto_name = db.Column(db.String(50), nullable = False, unique = True)
    price = db.Column(db.Text)
    percent = db.Column(db.Float)
    marketcap = db.Column(db.Text)

    def serialize(self):
        return {
            'id': self.id,
            'crypto_name': self.crypto_name,
            'price': self.price,
            'percent': self.percent,
            'marketcap': self.marketcap
        }



# INSERT INTO cryptos (crypto_name) Values
# ('BTC'),
# ('ETH'),
# ('BNB'),
# ('ADA'),
# ('SOL'),
# ('XRP'),
# ('LUNA'),
# ('DOT'),
# ('DOGE'),
# ('AVAX');

# INSERT INTO favorites (user_id,crypto_id) Values
# (1,1),
# (1,2),
# (1,9);




# SELECT name, crypto_name
# FROM users
# JOIN Favorites
# ON favorites.user_id = users.id
# JOIN cryptos
# ON favorites.crypto_id = cryptos.id;