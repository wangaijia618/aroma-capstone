from app.models import db, Story, environment, SCHEMA

def seed_stories():
    stories = [
        Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
      #6
         Story(
            user_id=1,
            title='',
            story='',
            img='',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),

    ]




    for story in stories:
        db.session.add(story)

    db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_stories():
    db.session.execute('TRUNCATE stories RESTART IDENTITY CASCADE;')
    db.session.commit()
