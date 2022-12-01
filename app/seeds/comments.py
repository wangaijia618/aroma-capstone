from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comments = [
        Comment(
            user_id=1,
            story_id=4,
            content='This is something that requires a lot of attentions. We need to look into it',
            ),
        Comment(
            user_id=1,
            story_id=5,
            content='Thank you for this insightful, entertaining, and informative article! I look forward to reading more of your writing and am grateful to have "met" you on here:-) '
            ),
        Comment(
            user_id=3,
            story_id=1,
            content='wonderful article, thank you'
            ),
        Comment(
            user_id=2,
            story_id=1,
            content='I love your article.'
            ),
        Comment(
            user_id=5,
            story_id=3,
            content='Very informative post. Thanks for sharing'
           ),
        Comment(
            user_id=6,
            story_id=4,
            content='Hi, a very cool idea! please give a link to the chat bot or to the site where you can immediately try'
            ),
        Comment(
            user_id=7,
            story_id=5,
            content='Great Job! I am currently working on something similar.'
            ),
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
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
