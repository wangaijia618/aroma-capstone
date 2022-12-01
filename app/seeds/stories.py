from app.models import db, Story, environment, SCHEMA

def seed_stories():
    stories = [
        Story(
            user_id=1,
            title='Amouage Love Tuberose: Indulgent White Floral Eggnog',
            story="Amouage’s Love Tuberose portrays its main tuberose theme in more or less the richest, most orchestral way you can shape the flower – buttery, fruity, green, spicy, dewy, aquatic, tropical, heady, and milky. The most significant talking-point when reviewing literary reactions to the scent is usually its lactonic qualities, through which Amouge has made a milkshake out of tuberose petals. The effect is beguiling and unforgettable, so indulgent and overflowing with curve, undulation, whip, and ripple that you can almost taste a sense of double cream or custard in your mouth, all the while retaining its core identity as an indolic white flower, maxed-out in a sensual, dramatic, and high-impact dress. ",
            img='https://fimgs.net/himg/o.Go1YSunUorU.jpg'),
         Story(
            user_id=2,
            title='Petali e Spade by Nobile 1942',
            story="To smell the opening of Petali e Spade by Nobile 1942 is to smell a fragrance which feels like a homage to the vintage scents of yesteryear. It’s a huge opening, full of aldehydes which race, screaming, from the bottle. Supremely powdery, but with the lift of citrus and white peach fluttering about in the background, when you smell the start of the scent it is very easy to understand the “swords” part of the fragrance’s name. The aldehydes give that adrenaline feel and you know, right from the start that love it or hate it this isn’t going to be a boring scent.",
            img='https://images.pexels.com/photos/1122875/pexels-photo-1122875.jpeg?auto=compress&cs=tinysrgb&w=600'),
      #3
         Story(
            user_id=3,
            title='Tom Ford Private Rose Garden: a Rose Pilgrimage',
            story="Tom Ford has already grown roses in his garden. There is the luxurious, vinous, vicious rose Noir de Noir, slightly touched by wilting, frantically fragrant through the aromas of autumn woods and truffles.  There is the warm, ambery, coffee, smoky, raucous Café Rose. There is the cheeky, sly, sweet and spicy Rose Prick, flavored with gooseberry and rose jam, covered with red maple leaves.  This year, Tom Ford has offered a whole rose garden in bloom. Rose de Russie, Rose D'Amalfi and Rose de Chine are three sisters with completely different personalities. What they have in common is the luxury and depth characteristic of all Tom Ford perfumes and a dominant note of rose.",
            img='https://fimgs.net/himg/o.tJ2U1YIFWBN.jpg'),

         Story(
            user_id=4,
            title='How to find discontinued perfumes and fragrances',
            story="Sometimes our favorite fragrances become discontinued or just plain hard to find. Sadly, if a fragrance is discontinued there is the possibility that you may never find another bottle. But let's not let that stop us – If it's not made anymore, then you are going to have to try that little bit harder to find it. Why did [fragrance company] stop making [my favourite fragrance]? Is a question we often get. Well, the main reason in 99% of cases is - not enough people purchased the perfume for them to justify continuing to make the scent. Other reasons are that the perfume was a limited editon to begin with, or that the fragrance contains ingredients that are no longer able to be used, and the sales aren't big enough to justify the expense in reformulating the fragrance. Check out every Perfume Shop, Department Store, Chemist, Beauty Shop, Discount Stores and anywhere that has a slim possibility of carrying your cologne. Make it a number one priority when you visit a new town. We're talking about the independent stores here really - most larger chains tend to have a high turnover. Check out eBay and other internet auction sites. You can find many rare beasts on eBay,  but be prepared to pay over the odds if it's highly sought after. If the fragrance has been discontinued for many years, be aware that the fragrance may have grown weaker or changed totally",
            img='https://images.pexels.com/photos/2101704/pexels-photo-2101704.jpeg?auto=compress&cs=tinysrgb&w=1600'),


         Story(
            user_id=5,
            title="What is 'Eau de Toilette'",
            story="If you wear fragrances then you've probably noticed the words 'Eau de Toilette' on your bottle. But what does it mean? The term Eau de Toilette is French and literally means 'Toliet Water' - in fact some older perfumes in English speaking countries would use the term 'toilet water' as a description instead of eau de toilette, though after a while it's likely that marketing got involved and decided the french terminology sounded more classy!  But why toilet? Surely something as lovely smelling as perfume shouldn't be associated with, well, where you do your number two's... Eau de Toilette refers to a certain dilution of Parfum vs Alcohol and Water. It can range from 5% - 15% of the total formula depending on the fragrance. A higher strength fragrance would be an Eau de Parfum, which typically 10% - 20%. You're probably thinking that the Venn Diagram that shows what is an Eau de Toilette is and what is an Eau de Parfum is has a fair bit of an overlap. And you're right. There's no official or legal definition of how much parfum is used, so it's a bit of a guessing game. However, if a fragrance line has an Eau de Toilette and Eau de Parfum then you know that the Eau de Toilette is going to have less parfum than the Eau de Parfum.",
            img='https://images.pexels.com/photos/5760907/pexels-photo-5760907.jpeg?auto=compress&cs=tinysrgb&w=600'),

      #6
         Story(
            user_id=1,
            title='A guide to choosing and buying fragrance',
            story="When buying and choosing a fragrance, it can be very easy to get overwhelmed with the large choices available to you. Your nose can get confused by the amount of smells you've tried and you end up buying something that smells like a old dirty sack. Here are a few hints and tips when buying fragrance, so that you come out with something you want. Take a minute to think about what you want. If it's a present, are you buying it because you want to buy a fragrance or because you've been told to buy a fragrance. Fragrance is a really good idea for a present when you can't think of anything else! If it is for a present for someone, try and find out what fragrances they have used in the past, even if its just Brut or something, it doesn't matter, it will give the store's fragrance consultant something to go on.",
            img='https://images.pexels.com/photos/3171624/pexels-photo-3171624.jpeg?auto=compress&cs=tinysrgb&w=1600'),
      #7
         Story(
            user_id=1,
            title='Bitter Peaches: Peaches in Perfumery',
            story=" A peach fragrance gets me interested more often than not. I like it because it is a hard profile to do right or realistically. Most vintage ones while beautiful are mostly figurative takes on peach to my nose, like La Nuit, Mitsouko, and Femme but I love them nonetheless. Otherwise, countless disappointments when sampling niche and designers. But when it is done well the profile is probably one of my favorite fruit notes beside citruses. I especially prefer it when its profile is both watery, sour, and tart or green, metallic, leathery with bitter tobacco facets like how it is generally rendered through tea.Bear with me because peach, apricots and nectarines are so similar in profile that they can be experienced interchangeably. It all depends on your perception. But to me they are so close that I generally ignore the semantics of the notes list. But if you're inclined to differentiate, in scent peach is the least tart most sweet, followed by apricots which are less sweet, then nectarines are the most tart and the least sweet.",
            img='https://images.pexels.com/photos/5403478/pexels-photo-5403478.jpeg?auto=compress&cs=tinysrgb&w=1600')

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
