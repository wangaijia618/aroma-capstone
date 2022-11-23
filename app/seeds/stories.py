from app.models import db, Story, environment, SCHEMA

def seed_stories():
    stories = [
        Story(
            user_id=1,
            title='aaaaaaa',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='bbbbbb',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='ccccccccc',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='ddddddddddd',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
         Story(
            user_id=1,
            title='eeeeeeeeeee',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
            created_at='2022-06-06 10:00:00',
            updated_at='2022-06-06 11:12:13'),
      #6
         Story(
            user_id=1,
            title='fffffffffffff',
            story='AUTHENTICATION REQUIRED: True',
            img='https://i.etsystatic.com/11355547/r/il/a5a52a/4028770018/il_794xN.4028770018_a7fk.jpg',
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
