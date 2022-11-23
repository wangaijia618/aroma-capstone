from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comments = [
        Comment()
    ]




    for comment in comments:
        db.session.add(comment)

    db.session.commit()







# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
