from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='This is 100% the real demo user.', profile_photo='')
    mfk = User(
        username='Francis724', email='mfk@aa.io', password='password', bio='I am new and amazing.', profile_photo='')
    lutens = User(
        username='Nuit de Cellophane', email='lutens@aa.io', password='password', bio='Nights in August are the best.', profile_photo='')
    another = User(
        username='another13', email='another@aa.io', password='password', bio='musk! musk! musk!', profile_photo='')
    noir = User(
        username='The Noir', email='noir@aa.io', password='password', bio='It is nice to meet you.', profile_photo='')
    gaiac= User(
        username='GaIac10', email='gaiac@aa.io', password='password', bio='looking forward to meeting you again in September', profile_photo='')
    fragonard= User(
        username='Fragonard', email='fragonard@aa.io', password='password', bio='Bonjour, everythins is just right~', profile_photo='')

    db.session.add(demo)
    db.session.add(mfk)
    db.session.add(lutens)
    db.session.add(another)
    db.session.add(noir)
    db.session.add(gaiac)
    db.session.add(fragonard)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
