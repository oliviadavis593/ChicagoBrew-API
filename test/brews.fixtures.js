function makeBrewsArray() {
    return [
        {
            id: 1,
            name: '18th Street Brewery',
            address: '5725 Miller Ave, Gary, IN 46403',
            phone_number: '(219) 803-0820',
            details: '18th Street Brewery was founded as a home brewery by Drew Fox in 2010. After years of hands-on learning and exploration, 18th Street Brewery became official with the release of SINISTER DIPA in 2013. Shortly after the SINISTER release, we opened a 3,200 square foot brewpub in an old dry cleaner’s building in Gary, IN. Quickly outgrowing that space, we purchased a 32,000 square foot warehouse in Hammond, IN. Our Hammond location now houses our production, packaging, barrel program, a taproom and a full service kitchen. Our original Gary, IN now houses a small 10-barrel open fermentation system, as well as a taproom, craft cocktail bar and kitchen.',
            website: 'http://www.18thstreetbrewery.com/'
        },
        {
            id: 2, 
            name: '5 Rabbit Cerveceria',
            address: '6398 74th St, Bedford Park, IL 60638',
            phone_number: '(312) 895-9591',
            details: '5 Rabbit is the first US based Latin American-inspired brewery. We hope to bring the energy, passion and amazing richness of Latin culture and cuisine to the delicious world of craft beer.',
            website: 'http://www.5rabbitbrewery.com/'
        },
        {
            id: 3, 
            name: '350 Brewing Company',
            address: '7144 183rd St, Tinley Park, IL 60477',
            phone_number: '(708) 468-8991',
            details: 'Neighborhood brewpub supplying housemade beers along with a light fare menu in industrial-chic digs.',
            website: 'https://350brewing.com/'
        }
    ]
}

module.exports = {
    makeBrewsArray,
}