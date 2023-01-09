from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', bio='This is 100% the real demo user.', profile_photo='https://images.pexels.com/photos/1759530/pexels-photo-1759530.jpeg?auto=compress&cs=tinysrgb&w=1600')
    mfk = User(
        username='Francis724', email='mfk@aa.io', password='password', bio='I am new and amazing.', profile_photo='https://images.pexels.com/photos/1300345/pexels-photo-1300345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    lutens = User(
        username='Nuit de Cellophane', email='lutens@aa.io', password='password', bio='Nights in August are the best.', profile_photo='https://images.pexels.com/photos/2791043/pexels-photo-2791043.jpeg?auto=compress&cs=tinysrgb&w=1600')
    another = User(
        username='another13', email='another@aa.io', password='password', bio='musk! musk! musk!', profile_photo='https://images.pexels.com/photos/1059979/pexels-photo-1059979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
    noir = User(
        username='The Noir', email='noir@aa.io', password='password', bio='It is nice to meet you.', profile_photo='https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=1600')
    gaiac= User(
        username='GaIac10', email='gaiac@aa.io', password='password', bio='looking forward to meeting you again in September', profile_photo='https://images.pexels.com/photos/3750777/pexels-photo-3750777.jpeg?auto=compress&cs=tinysrgb&w=1600')
    fragonard= User(
        username='Fragonard', email='fragonard@aa.io', password='password', bio='Bonjour, everythins is just right~', profile_photo='https://images.pexels.com/photos/8365659/pexels-photo-8365659.jpeg?auto=compress&cs=tinysrgb&w=1600')

    demo.follows.append(mfk)
    demo.follows.append(lutens)
    demo.follows.append(another)
    demo.follows.append(noir)
    demo.follows.append(gaiac)
    fragonard.follows.append(gaiac)
    gaiac.follows.append(fragonard)
    mfk.follows.append(lutens)
    lutens.follows.append(mfk)
    another.follows.append(mfk)

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
