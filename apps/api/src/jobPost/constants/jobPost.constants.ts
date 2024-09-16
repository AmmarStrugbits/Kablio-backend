import { Currency } from '@app/database';

export const JOBPOST_PROCESS_RETRY_LOCKER = 'jobpost-process-retry-locker';
export const JOBPOST_PROCESS_MAX_TRIES = 10;

export const regionToCurrencyMap: Record<string, Currency> = {
  // Australia
  Adelaide: Currency.AUD,
  Perth: Currency.AUD,
  Brisbane: Currency.AUD,
  Melbourne: Currency.AUD,
  Sydney: Currency.AUD,
  'Gold Coast-Tweed Heads': Currency.AUD,
  'Newcastle-Maitland': Currency.AUD,
  'Canberra-Queanbeyan': Currency.AUD,
  'Sunshine Coast': Currency.AUD,
  Geelong: Currency.AUD,

  // Canada
  'Victoria Area, BC': Currency.CAD,
  'Montreal Area, QC': Currency.CAD,
  'Greater Toronto and Hamilton Area, ON': Currency.CAD,
  'Edmonton Area, AB': Currency.CAD,
  'Calgary Area, AB': Currency.CAD,
  'Vancouver Area, BC': Currency.CAD,
  'Quebec City Area, QC': Currency.CAD,
  'Ottawa-Gatineau Area, ON-QC': Currency.CAD,
  'Winnipeg Area, MB': Currency.CAD,
  'Kitchener-Cambridge-Waterloo Area, ON': Currency.CAD,
  'London, ON': Currency.CAD,
  'St. Catharines-Niagara, ON': Currency.CAD,
  'Windsor, ON': Currency.CAD,
  'Oshawa, ON': Currency.CAD,

  // England
  'Greater London': Currency.GBP,
  'West Midlands (Birmingham, Coventry...)': Currency.GBP,
  'Greater Manchester': Currency.GBP,
  'West Yorkshire (Leeds, Bradford...)': Currency.GBP,
  'Hampshire (Southampton, Portsmouth...)': Currency.GBP,
  'Nottinghamshire & Leicestershire': Currency.GBP,
  Kent: Currency.GBP,
  'Greater Bristol': Currency.GBP,
  'Liverpool Area': Currency.GBP,
  'South Yorkshire (Sheffield, Doncaster...)': Currency.GBP,
  'Sussex (Brighton...)': Currency.GBP,
  Surrey: Currency.GBP,
  'Oxfordshire & Buckinghamshire': Currency.GBP,
  'Berkshire (Reading...)': Currency.GBP,
  Essex: Currency.GBP,
  'Cambridgeshire (Cambridge)': Currency.GBP,
  'Hertfordshire & Bedfordshire': Currency.GBP,
  Somerset: Currency.GBP,
  Cheshire: Currency.GBP,
  Devon: Currency.GBP,
  'Tyne and Wear (Newcastle)': Currency.GBP,
  Lancashire: Currency.GBP,
  'Suffolk & Norfolk': Currency.GBP,

  // Ireland
  'Connacht (Galway, Sligo...)': Currency.EUR,
  'Munster (Cork, Limerick..)': Currency.EUR,
  'Dublin and Leinster Area': Currency.EUR,
  'Northern Ireland & Ulster (Belfast..)': Currency.GBP,

  // Middle East Gulf States
  Neom: Currency.SAR,
  Jeddah: Currency.SAR,
  Riyadh: Currency.SAR,
  Kuwait: Currency.KWD,
  Bahrain: Currency.BHD,
  Qatar: Currency.QAR,
  Sharjah: Currency.AED,
  'Abu Dhabi': Currency.AED,
  Dubai: Currency.AED,

  // New Zealand
  Auckland: Currency.NZD,
  Christchurch: Currency.NZD,
  Wellington: Currency.NZD,
  Tauranga: Currency.NZD,
  'Lower Hutt': Currency.NZD,
  Dunedin: Currency.NZD,

  // Remote
  'Canada - Remote': Currency.CAD,
  'United States - Remote': Currency.USD,
  'European Union - Remote': Currency.EUR,
  'UK - Remote': Currency.GBP,
  'Australia - Remote': Currency.AUD,

  // Scotland
  'Greater Glasgow & Stirling Area': Currency.GBP,
  'South West Scotland and Scottish Borders': Currency.GBP,
  'Edinburgh & The Lothians': Currency.GBP,
  'Dundee, Perthshire, Fife & Angus Areas': Currency.GBP,
  'Aberdeen & Aberdeenshire': Currency.GBP,

  // Singapore
  Singapore: Currency.SGD,

  // US - Mid West
  'Chicago-Naperville-Elgin, IL-IN-WI': Currency.USD,
  'Detroit-Warren-Dearborn, MI': Currency.USD,
  'Minneapolis-St. Paul-Bloomington, MN-WI': Currency.USD,
  'Saint Louis Metropolitan Area, MO-IL': Currency.USD,
  'Cincinnati, OH-KY-IN': Currency.USD,
  'Kansas City, MO-KS': Currency.USD,
  'Columbus, OH': Currency.USD,
  'Indianapolis-Carmel-Anderson, IN': Currency.USD,
  'Cleveland-Elyria, OH': Currency.USD,

  // US - North East
  'New York-Newark-Jersey City, NY-NJ-PA': Currency.USD,
  'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD': Currency.USD,
  'Rochester, NY': Currency.USD,
  'Boston-Cambridge-Newton, MA': Currency.USD,
  'Pittsburgh, PA': Currency.USD,
  'Providence-Warwick, RI-MA': Currency.USD,
  'Hartford-East Hartford-Middletown, CT': Currency.USD,
  'Buffalo-Cheektowaga Metropolitan Area, NY': Currency.USD,

  // US - South
  'Raleigh-Durham-Cary, NC': Currency.USD,
  'Dallas-Fort Worth-Arlington, TX': Currency.USD,
  'Houston-The Woodlands-Sugar Land, TX': Currency.USD,
  'Washington-Arlington-Alexandria, VA-MD-WV': Currency.USD,
  'Atlanta-Sandy Springs-Roswell, GA': Currency.USD,
  'Miami-Fort Lauderdale-Pompano Beach, FL': Currency.USD,
  'Tampa-St. Petersburg-Clearwater, FL': Currency.USD,
  'Baltimore Metropolitan Area, MD': Currency.USD,
  'Orlando Metropolitan Area, FL': Currency.USD,
  'Charlotte-Concord-Gastonia, NC-SC': Currency.USD,
  'San Antonio-New Braunfels, TX': Currency.USD,
  'Austin-Round Rock-Georgetown, TX': Currency.USD,
  'Phoenix-Mesa-Chandler, AZ': Currency.USD,
  'Nashville-Davidson-Murfreesboro-Franklin, TN': Currency.USD,
  'Jacksonville, FL': Currency.USD,
  'Richmond, VA': Currency.USD,
  'Oklahoma City, OK': Currency.USD,
  'Knoxville Met Area, TN': Currency.USD,
  'McAllen-Edinburg-Mission, TX': Currency.USD,
  'Memphis-Clarksdale-Forrest City, TN': Currency.USD,

  // US - West
  'Los Angeles-Anaheim-Riverside, CA': Currency.USD,
  'Riverside-San Bernardino-Ontario, CA': Currency.USD,
  'San Francisco-Oakland-Berkeley, CA': Currency.USD,
  'Seattle Metropolitan Area, WA': Currency.USD,
  'San Diego Metropolitan Area, CA': Currency.USD,
  'Denver Metropolitan Area, CO': Currency.USD,
  'Portland-Vancouver-Hillsboro, OR-WA': Currency.USD,
  'Sacramento-Henderson-Paradise, CA': Currency.USD,
  'Las Vegas-Carmel-Anderson, NV': Currency.USD,
  'San Jose-Sunnyvale-Santa Clara, CA': Currency.USD,
  'Virginia Beach-Norfolk-Newport News, VA-NC': Currency.USD,
  'Salt Lake City Area, UT': Currency.USD,
  'Honolulu, HI': Currency.USD,

  // Wales
  'Mid & Northern Wales': Currency.GBP,
  'South West Wales (Swansea & Pembrokeshire Area)': Currency.GBP,
  'South East Wales (Cardiff & Newport Area)': Currency.GBP,
};
