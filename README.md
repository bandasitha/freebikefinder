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
7. [For Grading](#for-grading)

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

Please be aware at this time only non-profit bike shops are searchable. Organizations that help connect those in need of a free helmet or bike will be added in the future.

The above link may be used to access the web-based app, which in its prototype form displays a Navbar at the top of the page that may be used to display:
* Home: The home page
* Bikes: A list of non-profit bike shops that offer bikes for sale. Includes phone number and address for quick contact use. Also includes a "Get Directions" button that utilizes Google Maps. 
  * Selecting the name of a shop takes the user to a page with more details for that shop, including a link to the shop's website. 
  * Selecting the "View all shops in <state_abbreviation>" listed under a shop of interest will take the user to a list of non-profit shops found in the state selected. From this results page a user may click through a shop's name to its details page.
* Helmets:  Organizations that help connect those in need of a free helmet, many of which serve children in need. The usability of this page mirrors that of "Bikes".
* Other: Organizations that help connect those in need of a free bike, many of which serve adults. The usability of this page mirrors that of "Bikes".

On occasion the heroku app will "fall asleep" with lack of calls. Accessing the link to the Heroku app (see below) such that it displays the JSON data entries in your browser may be necessary for the Netlify-hosted front-end app to function properly. It is not necessary to access `/shops`, `/helmets` *and* `nonprofits`; only accessing one is enough to "wake up" the back end.

Please be aware that some entries will feature an address that starts with "1234 Main Street". These address entries are placeholders that are necessary to ensure functionality of the user-facing front end, and are likely **not** accurate.

## Data API

### `https://freebikefinder.herokuapp.com/<collection>`

The above syntax provides API access to the database collection, facilitating data retrieval, as well as document creation and deletion (CRUD functionality). The collection features non-profit shops and organizations that assist with low/no-cost bicycles and accessories.

### Accessing Non-profit bike shops (/shops)
1. All shops: `https://freebikefinder.herokuapp.com/shops`
2. Specific shop (via document ID): `https://freebikefinder.herokuapp.com/shops/<_id-here>`
    1. Example input: `https://freebikefinder.herokuapp.com/shops/62f8166c5051f0576d48c62a`
    2. Example output:
    `{"_id":"62f8166c5051f0576d48c62a","website":"https://bicas.org/","name":"Bicycle Inter Community Art and Salvage","state":"AZ","address":"2001 N 7th Ave Tucson AZ","phone":"(520) 628-7950","email":"bicas@bicas.org","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"Earn/Cost","Bikes":"TRUE","bikes":"TRUE","helmets":"","maintenance":"TRUE","tools":"TRUE","classes":"TRUE","suggested_donation":"","volunteering":"TRUE","donate_bikes":"TRUE","target_client":""}`
3. All shops in a particular state: `https://freebikefinder.herokuapp.com/shops?state=<state_-_abbreviation>`
    1. Example input: `https://freebikefinder.herokuapp.com/shops?state=ri`
    2. Example output:
    `[{"_id":"62f8166c5051f0576d48c6a3","website":"https://www.recycleabike.org/","name":"Recycle-A-Bike","state":"RI","address":"1911 Westminster St. Providence, RI 02909","phone":"(401) 525-1822","email":"shop@recycleabike.org","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"Free","Bikes":"TRUE","bikes":"","helmets":"","maintenance":"","tools":"","classes":"","suggested_donation":"","volunteering":"","donate_bikes":"","target_client":""}]`

### Accessing Organizations that provide free helmets (/helmets)
1. All organizations: `https://freebikefinder.herokuapp.com/helmets`
2. Specific shop (via document ID): `https://freebikefinder.herokuapp.com/helmets/<_id-here>`
    1. Example input: `https://freebikefinder.herokuapp.com/helmets/6301a9905051f0576dc8661e`
    2. Example output: 
    `{"_id":"6301a9905051f0576dc8661e","website":"https://www.northshorefire.com/","name":"Northshore - King County Fire District #16","state":"WA","address":"7220 NE 181st Street, Kenmore, WA 98028","phone":"(425) 354-1780","email":"","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"","bikes":"","helmets":"TRUE","maintenance":"","tools":"","classes":"","suggested_donation":"$6-10","volunteering":"","donate_bikes":"","target_client":"Children"}`
3. All organizations in a particular state: `https://freebikefinder.herokuapp.com/helmets?state=<state_-_abbreviation>`
    1. Example input: `https://freebikefinder.herokuapp.com/helmets?state=ny`
    2. Example output (truncated): 
    `[{"_id":"6301a9905051f0576dc86626","website":"https://buffalopal.com/pal-bicycle-safety-and-free-bike-helmet-giveaway-program/","name":"PAL Bicycle Safety and Free Bike Helmet Giveaway Program","state":"NY","address":"65 Niagara Square, 21st Floor Buffalo, NY 14202","phone":"(716) 851-4615","email":"PoliceAthleticLeague@city-buffalo.com","contact_form":"","facebook":"https://www.facebook.com/PALBuffalo/","twitter":"https://twitter.com/PalBuffalo","instagram":"https://www.instagram.com/pal_buffalo/","cost":"Free","bikes":"","helmets":"TRUE","maintenance":"","tools":"","classes":"","suggested_donation":"","volunteering":"","donate_bikes":"","target_client":""}, ... ]`
    

### Accessing Organizations that connect people with free/low-cost bikes (/nonprofits)
1. All organizations: `https://freebikefinder.herokuapp.com/nonprofits`
2. Specific shop (via document ID): `https://freebikefinder.herokuapp.com/nonprofits/<_id-here>`
    1. Example input: `https://freebikefinder.herokuapp.com/nonprofits/6301a9c35051f0576dc895a3`
    2. Example output:
    `{"_id":"6301a9c35051f0576dc895a3","website":"https://bikechurch.santacruzhub.org/","name":"Bike Church","state":"CA","address":"1234 Main Street, Anytown, NC 12345","phone":"","email":"postmaster@santacruzhub.org","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"","bikes":"TRUE","helmets":"","maintenance":"TRUE","tools":"TRUE","classes":"?","suggested_donation":"","volunteering":"","donate_bikes":"","target_client":""}`
3. All organizations in a particular state: `https://freebikefinder.herokuapp.com/nonprofits?state=<state_abbreviation>`
    1. Example input: `https://freebikefinder.herokuapp.com/nonprofits?state=ca`
    2. Example output (truncated):
    `[{"_id":"6301a9c35051f0576dc895a3","website":"https://bikechurch.santacruzhub.org/","name":"Bike Church","state":"CA","address":"1234 Main Street, Anytown, NC 12345","phone":"","email":"postmaster@santacruzhub.org","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"","bikes":"TRUE","helmets":"","maintenance":"TRUE","tools":"TRUE","classes":"?","suggested_donation":"","volunteering":"","donate_bikes":"","target_client":""},{"_id":"6301a9c35051f0576dc895a2","website":"https://bikeslocounty.org/","name":"Bike Slo County ","state":"CA","address":"1234 Main Street, Anytown, NC 12345","phone":"","email":"rick@bikeslocounty.org","contact_form":"","facebook":"","twitter":"","instagram":"","cost":"Earn","bikes":"TRUE","helmets":"TRUE","maintenance":"TRUE","tools":"TRUE","classes":"TRUE","suggested_donation":"","volunteering":"","donate_bikes":"","target_client":""}, ... ]`

### Working with data fields

The API returns data in a standard JSON format, which makes accessing specific data straightforward. Accessing specific fields such as "suggested donation(s)" or "address" is done through dot notation once the JSON object has been returned. For example:
- `<object_here>.suggested_donation`
- `<object_here>.address`

**Please note:** Data fields will (at this time) return (contain) a string.

## For Developers:

To run this code locally: 
- Fork this repo 
- Clone the code to your local environment 
- Run `npm install` in the root project directory

You may run the back-end service with any of the following terminal commands, from the root of the project.
- `npm run startDev` 
- `npm run start` 
- `npm start`
- `node index.js`

Depending on your system one or two may work better than the other(s). Nodemon is installed for auto-restart after changes are made. 

The front-end may be run with `npm start` from the `./app` directory. 

Please be aware that the port used to query API endpoints may vary depending on your setup. The creators utilized ports 3000, 5000, and 8000, depending on the situation. Your `curl 'http://localhost:5000/...` may use or need a different port than 5000.

The tests may be run with `npm run <filename>` from the `./routes` directory. The test files end in `.test.js`. 

## For Grading

The indexes set up for uniqueness and performance are displayed in the images at the root of the project directory labeled:

- companies_index.png (performance)
- helmets_index.png (uniqueness)

The aggregation pipeline may be accessed through `aggregation.js` in the root of the project directory. Text search is part of aggregation. 
