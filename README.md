# freebikefinder

## Problem Statement

1. **Scope:** Access to reliable transportation is an issue affecting many individuals. Owning a car is costly and access to public transportation requires money and proximity access points. According to the American Public Transportation Association, [45% of Americans have no access to public transportation](https://www.apta.com/news-publications/public-transportation-facts/). According the 2020 census data, [over 11% (over 37 million) of US citizens are living in poverty](https://www.prb.org/resources/how-poverty-in-the-united-states-is-measured-and-why-it-matters/). In 2022, 1634 counties in the U.S. were considered "rural" or "underserved" by the [Consumer Financial Protection Bureau](https://www.consumerfinance.gov/compliance/compliance-resources/mortgage-resources/rural-and-underserved-counties-list/).
2. **Impact:** Without access to reliable transportation, it is difficult to get to important appointments (health, career, education), access publicly available assets (public transportation, libraries, parks, housing / shelter, meals), and to get valuable exercise. Additionally, finding a bike shop who will accept a bike donation can feel like a hassle when it requires searching and contacting bike shops.
3. **Causes:** There is no centralized website to discover free bike or bike donation options in a community. Individuals are left to guess at likely Google search queries ("where can I get a free bike") or check all bike shops discovered through a Google Maps search. The discovery process is slow and depends on luck or internet research skills.
4. **Other solutions:** Search engines and maps applications. In both cases, search results are littered with bike shops that do not offer free bike options and do not accept donations. A lot of wasted time can be spent checking the results shop by shop. Additionally, know the best search query can be tricky ("bike collective" or "nonprofit bike shop", for example). Bikes can always be donated to community resources like Goodwill or The Salvation Army, but such options lack the necessary resources to ensure the bike is functioning well and has been reviewed for safety and long-term reliability. Moreover, bike shops are better suited to offer safety instructions, set the bike up for the rider, teach the rider about basic maintenance, and provide necessary safety equipment. Bike Collectives Wiki's [Community Bicycle Organizations](https://www.bikecollectives.org/wiki/Community_Bicycle_Organizations) resource is a good staring place with a large list of organizations and shops, but lacks granular search options such as discovering which shops do or don't offer earn-a-bike programs, or offer open-repair hours. In addition, this page is not up-to-date.

## Design

1. **Front-End:** An approachable, straighforward, mobile-friendly (some underserved individuals may not have easy access to a full computer) search function that allows at least partial selection of search criteria, including (but not limited to):

- State
- If bicycles are available (vs. repair-only organizations)
- Available accessories &/or helmets
- Available classes
- If bicycle donations are accepted
- Clientele (student, children, etc)

2. **Back-End:** A MongoDB collection, one-document-per-organization organization with the following endpoint(s):

- https://www.freebikefinder.com/
- https://www.freebikefinder.com/orgs - possible

The `/shops` endpoint will allow for query parameters such as (again, not limited to):

- /:state
  - /wa returns all shops in Washington state
- /:state/:product (bikes, helmets, etc.)
  - /wa/bikes returns all shops in Washington state with free bike options
- /:state/:shopId/shopName
  - /wa/284/the-bikery returns page specific to The Bikery
- /volunteer
  - /volunteer returns all shops offering volunteering options
- /volunteer/:state
  - /volunteer/wa returns all shops offering volunteering options in Washington state
- /donate/
  - /donate returns all shops offering donation options
- /donate/:state
  - /donate/wa returns all shops offering donation options in Washington state

3. **Data:** Data has been sourced through internet search, ensuring lack of defunct or closed organizations, with social media links available for improved user approachability (particularly among certain age groups).

## Work Timeline

1. Week 1: 
  - Input data into database
2. Week 2:
  - Build front end skeleton
  - Build back end skeleton
  - Begin test writing
3. Week 3:
  - Finalize front end
  - Finalize back end
  - Finalize tests
4. Week 4:
  - Testing & bug fixes
5. Week 5:
  - Available time to finish anything unfinished
  - Finish testing if necessary