# United State Energy Information Administration Dashboard

Link to Dashboard: http://eiadashboard-env.eba-hupry3ai.us-east-1.elasticbeanstalk.com/

## Team Members:

- Florin Vasiliu
- Luis Olguin
- Ryan Ashcraft
- Vikash Bhakta

## Background and Motivation:

Inspired by the importance of energy trends in the United States, and particularly to the city of Houston, our group wanted to use data provided by the Energy Information Administration (EIA) to create a single, consolidated dashboard to make sense of the vast amount of available energy data. To that end, our group sought to answer the following questions:

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q1: What is the USA total energy consumption/production by source? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Source: https://www.eia.gov/opendata/qb.php?category=711239)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q2: Which renewable energy source does each state use/produce the most? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Source: https://www.eia.gov/opendata/qb.php?category=40203)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q3: What is the average retail price of electricity by state and sector? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Source: https://www.eia.gov/opendata/qb.php?category=40)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Q4: What is the average retail price of oil and gas by state and sector? <br/>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Source: https://www.eia.gov/opendata/qb.php?category=241020)

## Development and Deployment:

Each team member used a combination of API Requests, Python, Pandas, and PyMongo to pull their data from the EIA website, clean the data, and send that data to our MongoDB Atlas database. Using the cloud-stored data, we each created plots using JavaScript to answer our questions above. Each plot was created using either the plotly or chartjs library. After finalizing our individual charts, we deployed the entire dashboard to the web using Amazon Web Services.
 
## Total Energy Consupmtion/Production in the United States

Vikash

## Renewable Energy Sources Consumed/Produced by State

Ryan

## Retail Price of Electricity by State

Florin

## Retail Price of Oil and Gas by State

Luis

[b. data streaming: EIA site -> data clean-up -> db update -> plot generation -> publishing

2. Energy sources breakdown and evolution by time

3. Renewable energy sources breakdown by state

4. Electricity prices

5. Emissions and gas prices]

  
