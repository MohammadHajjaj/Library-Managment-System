const mongoose = require('mongoose');
const Book = require('./models/books');


mongoose.connect('mongodb://localhost:27017/projecttest', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongo connected")
    })
    .catch(err => {
        console.log(`mongo error ${err}`)
    })



const books = [
    {
        title: "The heart of business : leadership principles for the next era of capitalism",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781493057603",
        author: "Joly Hubert",
        ISBN: 9781647820381,
        category: "Business and economics",
        description: "A remarkable turnaround by a leader with a remarkable philosophy",
        stock: 4
    },

    {
        title: "Skywalker : a family at war",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780744027310",
        author: "Baver Kristin",
        ISBN: 9780744027310,
        category: "Fiction",
        description: "Leaving no stone unturned in tracing the dynasty's trials and tribulations, this definitive biography of Star Wars' first family explores and explains the deeper, more personal story of the Skywalkers, their characters, motivations, and, against seemingly impossible odds, their ultimate triumph.",
        stock: 6
    },
    {
        title: "The adventures of Tom Sawyer",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780439099400",
        author: "Twain Mark",
        ISBN: 9780439099400,
        category: "Fiction",
        description: "The adventures of a mischievous young boy and his friends growing up in a Mississippi River town in the nineteenth century. ",
        stock: 7
    },
    {
        title: "Black girl, call home",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780593197141",
        author: "Mans Jasmine",
        ISBN: 9780593197141,
        category: "Poetry",
        description: "A journey to find truth, belonging, and healing. ",
        stock: 5
    },
    {
        title: "Singer come from afar : poems",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781597098885",
        author: "Kim Robert",
        ISBN: 9781597098885,
        category: "Poetry",
        description: "This book considers war and peace, pandemic struggles, Earth imperatives, a seeker's spirit, and forging kinship. ",
        stock: 7
    },
    {
        title: "How to be better by being worse : poems",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781950774234",
        author: "Jannise Justin",
        ISBN: 9781950774340,
        category: "Poetry",
        description: "poetry collection subverts the self-help genre to celebrate drag culture, queer identity, and breaking the rules",
        stock: 4
    },
    {
        title: "Water I won't touch",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781556596179",
        author: "Kayleb Rae",
        ISBN: 9781556596179,
        category: "Autobiographical poetry",
        description: "A life raft and a self-portrait, concerned with the vitality of trans people living in a dangerous and inhospitable landscape",
        stock: 4
    },
    {
        title: "Reliquary",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781945588679",
        author: "Wender Abigail",
        ISBN: 9781945588679,
        category: "Poetry",
        description: "An introspective lyric on how the opiate crisis alters families and futures.",
        stock: 9
    },
    {
        title: "No way : an American Tao Te Ching",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780807173992",
        author: "Romtvedt David",
        ISBN: 9780807173992,
        category: "Poetry",
        description: "Explores the art of living in the fast-paced, dangerous, unpredictable contemporary world.",
        stock: 6
    },
    {
        title: "Sunshine girl : an unexpected life",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780525480259",
        author: "Margulies Julianna",
        ISBN: 9780525480259,
        category: "Autobiographies",
        description: "Known for her outstanding performances on The Good Wife and ER, Julianna Margulies now unleashes her sharp talent with a powerful debut memoir chronicling her life and her work, examining from within, her journey from chaos to calm.",
        stock: 2
    },
    {
        title: "The happiest man on Earth : the beautiful life of an Auschwitz survivor",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780063097681",
        author: "Jaku Eddie",
        ISBN: 9780063097681,
        category: "Autobiographies",
        description: "A one hundred-year-old Holocaust survivor who, despite all he suffered, shares his wisdom and reflects on how he has led his best possible life, talking warmly and openly about the power of gratitude, tolerance, and kindness.",
        stock: 5
    },
    {
        title: "Zero fail : the rise and fall of the Secret Service",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780399589010",
        author: "Leonnig Carol",
        ISBN: 9780399589010,
        category: "Politcal Science",
        description: "Carol Leonnig has been covering the Secret Service for The Washington Post for most of the last decade, bringing to light the gaffes and scandals that plague the agency today.",
        stock: 4
    },
    {
        title: "The vegan meat cookbook : meatless favorites, made with plants",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781984858887",
        author: "Miyoko Nishimoto",
        ISBN: 9781984858887,
        category: "Cookbooks",
        description: "More than 100 recipes for meals featuring vegan meat, and recipes for making your own DIY vegan meats and cheese",
        stock: 7
    },
    {
        title: "Radical longevity : the powerful plan to sharpen your brain, strengthen your body, and reverse the symptoms of aging",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780738286167",
        author: "Ann Louise,",
        ISBN: 9780738286167,
        category: "Health and Fitness",
        description: "We all seem to be searching for the fountain of youth-whether it's sleep more, eat less, go keto, go vegan, or intermittently fast--but the truth is there's no single thing that will keep the diseases of aging at bay.",
        stock: 8
    },
    {
        title: "The premonition : a pandemic story",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780393881554",
        author: "Lewis Michael",
        ISBN: 9780393881554,
        category: "Political Science",
        description: "For those who could read between the lines, the censored news out of China was terrifying. But the president insisted there was nothing to worry about. Fortunately, we are still a nation of skeptics.",
        stock: 2
    },
    {
        title: "No one succeeds alone : learn everything you can from everyone you can",
        image: "http://imagesa.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9780358454618",
        author: "Joly Hubert",
        ISBN: 9780358454618,
        category: "Biography",
        description: "The inspirational story of Compass CEO Robert Reffkin-born black and raised Jewish-and the vital lessons he learned to help him overcome life's daunting obstacles",
        stock: 4
    },
    {
        title: "On the job : the untold story of worker centers and the new fight for wages, dignity, and health",
        image: "http://imagesb.btol.com/ContentCafe/Jacket.aspx?UserID=ContentCafeClient&Password=Client&Return=T&Type=L&Value=9781493057603",
        author: "Monforton Celeste",
        ISBN: 9781647820381,
        category: "History",
        description: "The inspiring story of worker centers that are cropping up across the country and transforming the labor movement",
        stock: 7
    },


]


const seedDB = async () => {
    await Book.deleteMany({});
    await Book.insertMany(books)
        .then(res => {
            console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
}

seedDB()

