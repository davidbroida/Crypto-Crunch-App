from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

bcrypt = Bcrypt()
db = SQLAlchemy()

def connect_db(app):

    db.app = app
    db.init_app(app)

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(50), nullable = False)
    username = db.Column(db.String(50), nullable = False)
    password = db.Column(db.Text, nullable = False)

    # favorites = db.relationship("User")

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
