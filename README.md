# freebikefinder

## Table of Contents
1. [Problem Statement](#problem-statement)
2. [Design](#design)
    1. [Front-End](#front-end)
    2. [Back-end](#back-end)
3. [Work Timeline](#work-timeline)
4. [Deployed App](#deployed-app)
5. [Data API](#data-api)
    1. [Accessing Shops](#accessing-shops)
    2. [Accessing Organizations that provide free helmets](#accessing-organizations-that-provide-free-helmets)
    3. [Accessing Organizations that connect people with free/low-cost bikes ](#accessing-organizations-that-connect-people-with-freelow-cost-bikes)
    4. [Working with data fields](#working-with-data-fields)
6. [For Developers](#for-developers)

## Problem Statement

1. **Scope:** Access to reliable transportation is an issue affecting many individuals. Owning a car is costly and access to public transportation requires money and proximity access points. According to the American Public Transportation Association, [45% of Americans have no access to public transportation](https://www.apta.com/news-publications/public-transportation-facts/). According the 2020 census data, [over 11% (over 37 million) of US citizens are living in poverty](https://www.prb.org/resources/how-poverty-in-the-united-states-is-measured-and-why-it-matters/). In 2022, 1634 counties in the U.S. were considered "rural" or "underserved" by the [Consumer Financial Protection Bureau](https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/rural-and-underserved-counties-list/).
2. **Impact:** Without access to reliable transportation, it is difficult to get to important appointments (health, career, education), access publicly available assets (public transportation, libraries, parks, housing / shelter, meals), and to get valuable exercise. Additionally, finding a bike shop who will accept a bike donation can feel like a hassle when it requires searching and contacting bike shops.
3. **Causes:** There is no centralized website to discover free bike or bike donation options in a community. Individuals are left to guess at likely Google search queries ("where can I get a free bike") or check all bike shops discovered through a Google Maps search. The discovery process is slow and depends on luck or internet research skills.
4. **Other solutions:** Search engines and maps applications. In both cases, search results are littered with bike shops that do not offer free bike options and do not accept donations. A lot of wasted time can be spent checking the results shop by shop. Additionally, know the best search query can be tricky ("bike collective" or "nonprofit bike shop", for example). Bikes can always be donated to community resources like Goodwill or The Salvation Army, but such options lack the necessary resources to ensure the bike is functioning well and has been reviewed for safety and long-term reliability. Moreover, bike shops are better suited to offer safety instructions, set the bike up for the rider, teach the rider about basic maintenance, and provide necessary safety equipment. Bike Collectives Wiki's [Community Bicycle Organizations](https://www.bikecollectives.org/wiki/Community_Bicycle_Organizations) resource is a good staring place with a large list of organizations and shops, but lacks granular search options such as discovering which shops do or don't offer earn-a-bike programs, or offer open-repair hours. In addition, this page is not up-to-date.

## Design

### **Front-End:** 
An approachable, straighforward, mobile-friendly (some underserved individuals may not have easy access to a full computer) search function that allows at least partial selection of search criteria, including (but not limited to):

- Location
- Contact information
- If bicycles are available (vs. repair-only organizations)
- Available accessories &/or helmets
- Available classes
- If bicycle donations are accepted
- Clientele (student, children, etc)

### **Back-End:** 
A MongoDB collection, one-document-per-organization organization with the following endpoint(s):

| Request Type | Endpoint                         | Expected results                                                              |
| ------------ | ----------------------------     | ------------------------------------------------------------------------------|
| GET          | /shops/:_id                      | Retrieves single shop via document's ObjectId()                               |
| GET          | /shops                           | Retrieves all shops                                                           |
| GET          | /shops?state=<state_abbr.>       | Retrieves all shops with state field matching <state_abbr.>.                  |
| POST         | /shops                           | Adds a new shop document                                                      |
| PUT          | /shop/:_id                       | Updates single shop document via document's ObjectID()                        |
| DELETE       | /business/:_id                   | Removes single shop document via document's ObjectId()                        |
| GET          | /helmets                         | Retrieves all non-profits that offer free helmets                             |
| GET          | /helmets/:_id                    | Retrieves free-helmet-non-profit via document's ObjectId                      |
| GET          | /helmets?state=<state_abbr.>     | Retrieves all free-helmet-non-profits with state field matching <state_abbr.> |
| POST         | /helmets                         | Adds a new non-profit that offers free helmets                                |
| PUT          | /shop/:_id                       | Updates single free-helmet-non-profit document via document's ObjectID        |
| DELETE       | /business/:_id                   | Removes single free-helmet-non-profit document via document's ObjectId        |
| GET          | /non-profits                     | Retrieves all non-profits that offer free bikes                               |
| GET          | /non-profits/:_id                | Retrieves free-bike-non-profit via document's ObjectId                        |
| GET          | /non-profits?state=<state_abbr.> | Retrieves all free-helmet-non-profits with state field matching <state_abbr.> |
| POST         | /non-profits                     | Adds a new non-profit that offers free bike                                   |
| PUT          | /non-profits/:_id                | Updates single free-bike-non-profit document via document's ObjectID          |
| DELETE       | /non-profits/:_id                | Removes single free-bike-non-profit document via document's ObjectId          |

**Note:** <state_abbr.> represents the postal two-letter abbreviation for each state, including "DC" for Washington DC. 

**Note:** POST, PUT, and DELETE routes are protected and accessible only via administrator credentials, to ensure data integrity. 

**Data:** Data has been sourced through internet search, ensuring lack of defunct or closed organizations, with contact details (address, email and phone number) and social media links available for improved user approachability (particularly among certain age groups).

## Work Timeline

### Week 1

- [Complete proof of concept data set](https://docs.google.com/spreadsheets/d/13HB8NiuPO73cRedv-w-ww59k3hI5NAMnZrP_jkeGzt8/edit#gid=0).
- Load data into MongoDB
- Begin wireframing

### Week 2

- Finish wireframing
- Begin unit testing of API endpoints

### Week 3

- Begin development of front-end
- Finish unit testing of API endpoints

### Week 4

- Finish development of front-end

### Week 5

- Testing
- Bug fixes
- Develop presentation

## Deployed App

### https://snazzy-centaur-898546.netlify.app/

On occasion the heroku app will "fall asleep" with lack of calls. Accessing the link to the Heroku app (see below) such that it displays the JSON data entries in your browser may be necessary for the Netlify-hosted front-end app to function properly. It is not necessary to access `/shops`, `/helmets` *and* `nonprofits`; only accessing one is enough to "wake up" the back end. 

The above link may be used to access the web-based app, which in its prototype form displays a Navbar at the top of the page that may be used to display:
* Home: The home page
* Bikes: A list of non-profit bike shops that offer bikes for sale, maintenance spaces, and bicycling accessories. 
  * Selecting the name of a shop takes the user to a page with more details for that shop, including a link to the shop's website. 
  * Selecting the State listed under a shop of interest will take the user to a list of non-profit shops found in the state selected. From this results page a user may click through a shop's name to its details page.
* Helmets:  Organizations that help connect those in need of a free helmet, many of which serve children in need. This is scheduled to be added before Sept. 10th 2022.
* Other: Organizations that help connect those in need of a free bike, many of which serve adults. This is scheduled to be added before Sept. 10th 2022.

## Data API

### https://freebikefinder.herokuapp.com/shops

The above link provides API access to the database collection, facilitating data retrieval, as well as document creation and deletion (CRUD functionality). The collection features non-profit shops and organizations that assist with low/no-cost bicycles and accessories.

`/shops` may be replaced with `/helmets` or `/nonprofits` to access those collections.

### Accessing Shops
1. All shops: https://freebikefinder.herokuapp.com/shops
2. Specific shop (via document ID): https://freebikefinder.herokuapp.com/shops/<_id-here>
    1. Example: https://freebikefinder.herokuapp.com/shops/62f8166c5051f0576d48c629
3. All shops in a particular state: https://freebikefinder.herokuapp.com/shops?state=<state_-_abbreviation>
    1. Example: https://freebikefinder.herokuapp.com/shops?state=ca

### Accessing Organizations that provide free helmets:
1. All organizations: https://freebikefinder.herokuapp.com/helmets
2. Specific shop (via document ID): https://freebikefinder.herokuapp.com/helmets/<_id-here>
    1. Example: https://freebikefinder.herokuapp.com/helmets/62f8166c5051f0576d48c629
3. All organizations in a particular state: https://freebikefinder.herokuapp.com/helmets?state=<state_-_abbreviation>
    1. Example: https://freebikefinder.herokuapp.com/helmets?state=ca

### Accessing Organizations that connect people with free/low-cost bikes:
1. All organizations: https://freebikefinder.herokuapp.com/nonprofits
2. Specific shop (via document ID): https://freebikefinder.herokuapp.com/nonprofits/<_id-here>
    1. Example: https://freebikefinder.herokuapp.com/nonprofits/62f8166c5051f0576d48c629
3. All organizations in a particular state: https://freebikefinder.herokuapp.com/nonprofits?state=<state_abbreviation>
    1. Example: https://freebikefinder.herokuapp.com/nonprofits?state=ca

### Working with data fields

The API returns data in a standard JSON format, which makes accessing specific data straightforward. Accessing specific fields such as "suggested donation(s)" or "address" is done through dot notation once the JSON object has been returned. For example:
- <object_here>.suggested_donation
- <object_here>.address

**Please note:** Data fields will (at this time) return a string.

## For Developers:

To run this code locally: 
- Fork this repo 
- Clone the code to your local environment 

You may run the back-end service with any of the following terminal commands, from the root of the project.
- `npm run startDev` 
- `npm run start` 
- `npm start`
- `node index.js`

Depending on your system one or two may work better than the other(s). Nodemon is installed for auto-restart after changes are made. 

The front-end may be run with `npm start` from the `./app` directory. 

The test suite may be run with `npm run <filename>` from the `./routes` directory. The test files end in `.test.js`. 