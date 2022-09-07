"""Add Favorites tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_favorite_model.py


import os
from unittest import TestCase

from models import db, connect_db, User, Favorites, Crypto

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///capstone_test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class FavoriteAddTestCase(TestCase):
    """Test for Favorites added to db."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Favorites.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(name="testname",
                                    username="testusername",
                                    password="testpassword")

        db.session.commit()

    def test_add_favorite(self):
        """Can user add a favorite?"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/api/favorites/1", data={"id": 1,
                                                    "user_id": 2,
                                                    "crypto_id": 3 })

            # Make sure it posts
            self.assertEqual(resp.status_code, 201)

            favorite = Favorites.query.one()
            self.assertEqual(favorite.id, 1 )
            self.assertEqual(favorite.user_id, 2 )
            self.assertEqual(favorite.crypto_id, 3 )
