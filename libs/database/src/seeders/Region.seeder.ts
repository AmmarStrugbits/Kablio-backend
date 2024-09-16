//Region.seeder.ts

import { RegionEntity } from '@app/database/entities/Region.entity';
import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class RegionSeeder extends Seeder {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const regionContext: Dictionary<RegionEntity> = context;
    const groupContext: Dictionary<RegionGroupEntity> = context;

    /**************************************************************************/
    // Australia
    /**************************************************************************/

    regionContext.Adelaide = await em.upsert(RegionEntity, {
      name: 'Adelaide',
      group: groupContext.australia,
    });

    regionContext.Perth = await em.upsert(RegionEntity, {
      name: 'Perth',
      group: groupContext.australia,
    });

    regionContext.Brisbane = await em.upsert(RegionEntity, {
      name: 'Brisbane',
      group: groupContext.australia,
    });

    regionContext.Melbourne = await em.upsert(RegionEntity, {
      name: 'Melbourne',
      group: groupContext.australia,
    });

    regionContext.Sydney = await em.upsert(RegionEntity, {
      name: 'Sydney',
      group: groupContext.australia,
    });

    regionContext.GoldCoastTweedHeads = await em.upsert(RegionEntity, {
      name: 'Gold Coast-Tweed Heads',
      group: groupContext.australia,
    });

    regionContext.NewcastleMaitland = await em.upsert(RegionEntity, {
      name: 'Newcastle-Maitland',
      group: groupContext.australia,
    });

    regionContext.CanberraQueanbeyan = await em.upsert(RegionEntity, {
      name: 'Canberra-Queanbeyan',
      group: groupContext.australia,
    });

    regionContext.SunshineCoast = await em.upsert(RegionEntity, {
      name: 'Sunshine Coast',
      group: groupContext.australia,
    });

    regionContext.Geelong = await em.upsert(RegionEntity, {
      name: 'Geelong',
      group: groupContext.australia,
    });

    /**************************************************************************/
    // Canada
    /**************************************************************************/

    regionContext.VictoriaAreaBC = await em.upsert(RegionEntity, {
      name: 'Victoria Area, BC',
      group: groupContext.canada,
    });

    regionContext.MontrealAreaQC = await em.upsert(RegionEntity, {
      name: 'Montreal Area, QC',
      group: groupContext.canada,
    });

    regionContext.GreaterTorontoandHamiltonAreaON = await em.upsert(RegionEntity, {
      name: 'Greater Toronto and Hamilton Area, ON',
      group: groupContext.canada,
    });

    regionContext.EdmontonAreaAB = await em.upsert(RegionEntity, {
      name: 'Edmonton Area, AB',
      group: groupContext.canada,
    });

    regionContext.CalgaryAreaAB = await em.upsert(RegionEntity, {
      name: 'Calgary Area, AB',
      group: groupContext.canada,
    });

    regionContext.VancouverAreaBC = await em.upsert(RegionEntity, {
      name: 'Vancouver Area, BC',
      group: groupContext.canada,
    });

    regionContext.QuebecCityAreaQC = await em.upsert(RegionEntity, {
      name: 'Quebec City Area, QC',
      group: groupContext.canada,
    });

    regionContext.OttawaGatineauAreaONQC = await em.upsert(RegionEntity, {
      name: 'Ottawa-Gatineau Area, ON-QC',
      group: groupContext.canada,
    });

    regionContext.WinnipegAreaMB = await em.upsert(RegionEntity, {
      name: 'Winnipeg Area, MB',
      group: groupContext.canada,
    });

    regionContext.KitchenerCambridgeWaterlooAreaON = await em.upsert(RegionEntity, {
      name: 'Kitchener-Cambridge-Waterloo Area, ON',
      group: groupContext.canada,
    });

    regionContext.LondonON = await em.upsert(RegionEntity, {
      name: 'London, ON',
      group: groupContext.canada,
    });

    regionContext.StCatharinesNiagaraON = await em.upsert(RegionEntity, {
      name: 'St. Catharines-Niagara, ON',
      group: groupContext.canada,
    });

    regionContext.WindsorON = await em.upsert(RegionEntity, {
      name: 'Windsor, ON',
      group: groupContext.canada,
    });

    regionContext.OshawaON = await em.upsert(RegionEntity, {
      name: 'Oshawa, ON',
      group: groupContext.canada,
    });

    /**************************************************************************/
    // England
    /**************************************************************************/

    regionContext.GreaterLondon = await em.upsert(RegionEntity, {
      name: 'Greater London',
      group: groupContext.england,
    });

    regionContext.WestMidlandsBirminghamCoventry = await em.upsert(RegionEntity, {
      name: 'West Midlands (Birmingham, Coventry...)',
      group: groupContext.england,
    });

    regionContext.GreaterManchester = await em.upsert(RegionEntity, {
      name: 'Greater Manchester',
      group: groupContext.england,
    });

    regionContext.WestYorkshireLeedsBradford = await em.upsert(RegionEntity, {
      name: 'West Yorkshire (Leeds, Bradford...)',
      group: groupContext.england,
    });

    regionContext.HampshireSouthamptonPortsmouth = await em.upsert(RegionEntity, {
      name: 'Hampshire (Southampton, Portsmouth...)',
      group: groupContext.england,
    });

    regionContext.NottinghamshireLeicestershire = await em.upsert(RegionEntity, {
      name: 'Nottinghamshire & Leicestershire',
      group: groupContext.england,
    });

    regionContext.Kent = await em.upsert(RegionEntity, {
      name: 'Kent',
      group: groupContext.england,
    });

    regionContext.GreaterBristol = await em.upsert(RegionEntity, {
      name: 'Greater Bristol',
      group: groupContext.england,
    });

    regionContext.LiverpoolArea = await em.upsert(RegionEntity, {
      name: 'Liverpool Area',
      group: groupContext.england,
    });

    regionContext.SouthYorkshireSheffieldDoncaster = await em.upsert(RegionEntity, {
      name: 'South Yorkshire (Sheffield, Doncaster...)',
      group: groupContext.england,
    });

    regionContext.SussexBrighton = await em.upsert(RegionEntity, {
      name: 'Sussex (Brighton...)',
      group: groupContext.england,
    });

    regionContext.Surrey = await em.upsert(RegionEntity, {
      name: 'Surrey',
      group: groupContext.england,
    });

    regionContext.OxfordshireBuckinghamshire = await em.upsert(RegionEntity, {
      name: 'Oxfordshire & Buckinghamshire',
      group: groupContext.england,
    });

    regionContext.BerkshireReading = await em.upsert(RegionEntity, {
      name: 'Berkshire (Reading...)',
      group: groupContext.england,
    });

    regionContext.Essex = await em.upsert(RegionEntity, {
      name: 'Essex',
      group: groupContext.england,
    });

    regionContext.CambridgeshireCambridge = await em.upsert(RegionEntity, {
      name: 'Cambridgeshire (Cambridge)',
      group: groupContext.england,
    });

    regionContext.HertfordshireBedfordshire = await em.upsert(RegionEntity, {
      name: 'Hertfordshire & Bedfordshire',
      group: groupContext.england,
    });

    regionContext.Somerset = await em.upsert(RegionEntity, {
      name: 'Somerset',
      group: groupContext.england,
    });

    regionContext.Cheshire = await em.upsert(RegionEntity, {
      name: 'Cheshire',
      group: groupContext.england,
    });

    regionContext.Devon = await em.upsert(RegionEntity, {
      name: 'Devon',
      group: groupContext.england,
    });

    regionContext.TyneandWearNewcastle = await em.upsert(RegionEntity, {
      name: 'Tyne and Wear (Newcastle)',
      group: groupContext.england,
    });

    regionContext.Lancashire = await em.upsert(RegionEntity, {
      name: 'Lancashire',
      group: groupContext.england,
    });

    regionContext.SuffolkNorfolk = await em.upsert(RegionEntity, {
      name: 'Suffolk & Norfolk',
      group: groupContext.england,
    });

    /**************************************************************************/
    // Ireland
    /**************************************************************************/

    regionContext.ConnachtGalwaySligo = await em.upsert(RegionEntity, {
      name: 'Connacht (Galway, Sligo...)',
      group: groupContext.ireland,
    });

    regionContext.MunsterCorkLimerick = await em.upsert(RegionEntity, {
      name: 'Munster (Cork, Limerick..)',
      group: groupContext.ireland,
    });

    regionContext.DublinandLeinsterArea = await em.upsert(RegionEntity, {
      name: 'Dublin and Leinster Area',
      group: groupContext.ireland,
    });

    regionContext.NorthernIrelandUlsterBelfast = await em.upsert(RegionEntity, {
      name: 'Northern Ireland & Ulster (Belfast..)',
      group: groupContext.ireland,
    });

    /**************************************************************************/
    // Middle East Gulf States
    /**************************************************************************/

    regionContext.Neom = await em.upsert(RegionEntity, {
      name: 'Neom',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Jeddah = await em.upsert(RegionEntity, {
      name: 'Jeddah',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Riyadh = await em.upsert(RegionEntity, {
      name: 'Riyadh',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Kuwait = await em.upsert(RegionEntity, {
      name: 'Kuwait',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Bahrain = await em.upsert(RegionEntity, {
      name: 'Bahrain',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Qatar = await em.upsert(RegionEntity, {
      name: 'Qatar',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Sharjah = await em.upsert(RegionEntity, {
      name: 'Sharjah',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.AbuDhabi = await em.upsert(RegionEntity, {
      name: 'Abu Dhabi',
      group: groupContext.middleEastGulfStates,
    });

    regionContext.Dubai = await em.upsert(RegionEntity, {
      name: 'Dubai',
      group: groupContext.middleEastGulfStates,
    });

    /**************************************************************************/
    // New Zealand
    /**************************************************************************/

    regionContext.Auckland = await em.upsert(RegionEntity, {
      name: 'Auckland',
      group: groupContext.newZealand,
    });

    regionContext.Christchurch = await em.upsert(RegionEntity, {
      name: 'Christchurch',
      group: groupContext.newZealand,
    });

    regionContext.Wellington = await em.upsert(RegionEntity, {
      name: 'Wellington',
      group: groupContext.newZealand,
    });

    regionContext.Tauranga = await em.upsert(RegionEntity, {
      name: 'Tauranga',
      group: groupContext.newZealand,
    });

    regionContext.LowerHutt = await em.upsert(RegionEntity, {
      name: 'Lower Hutt',
      group: groupContext.newZealand,
    });

    regionContext.Dunedin = await em.upsert(RegionEntity, {
      name: 'Dunedin',
      group: groupContext.newZealand,
    });

    /**************************************************************************/
    // Remote
    /**************************************************************************/

    regionContext.CanadaRemote = await em.upsert(RegionEntity, {
      name: 'Canada - Remote',
      group: groupContext.remote,
    });

    regionContext.UnitedStatesRemote = await em.upsert(RegionEntity, {
      name: 'United States - Remote',
      group: groupContext.remote,
    });

    regionContext.EuropeanUnionRemote = await em.upsert(RegionEntity, {
      name: 'European Union - Remote',
      group: groupContext.remote,
    });

    regionContext.UKRemote = await em.upsert(RegionEntity, {
      name: 'UK - Remote',
      group: groupContext.remote,
    });

    regionContext.AustraliaRemote = await em.upsert(RegionEntity, {
      name: 'Australia - Remote',
      group: groupContext.remote,
    });

    /**************************************************************************/
    // Scotland
    /**************************************************************************/

    regionContext.GreaterGlasgowStirlingArea = await em.upsert(RegionEntity, {
      name: 'Greater Glasgow & Stirling Area',
      group: groupContext.scotland,
    });

    regionContext.SouthWestScotlandandScottishBorders = await em.upsert(RegionEntity, {
      name: 'South West Scotland and Scottish Borders',
      group: groupContext.scotland,
    });

    regionContext.EdinburghTheLothians = await em.upsert(RegionEntity, {
      name: 'Edinburgh & The Lothians',
      group: groupContext.scotland,
    });

    regionContext.DundeePerthsireFifeAngusAreas = await em.upsert(RegionEntity, {
      name: 'Dundee, Perthsire, Fife & Angus Areas',
      group: groupContext.scotland,
    });

    regionContext.AberdeenAberdeeshire = await em.upsert(RegionEntity, {
      name: 'Aberdeen & Aberdeeshire',
      group: groupContext.scotland,
    });

    /**************************************************************************/
    // Singapore
    /**************************************************************************/

    regionContext.Singapore1 = await em.upsert(RegionEntity, {
      name: 'Singapore',
      group: groupContext.singapore,
    });

    /**************************************************************************/
    // US - Mid West
    /**************************************************************************/

    regionContext.ChicagoNapervilleElginILINWI = await em.upsert(RegionEntity, {
      name: 'Chicago-Naperville-Elgin, IL-IN-WI',
      group: groupContext.usMidWest,
    });

    regionContext.DetroitWarrenDearbornMI = await em.upsert(RegionEntity, {
      name: 'Detroit-Warren-Dearborn, MI',
      group: groupContext.usMidWest,
    });

    regionContext.MinneapolisStPaulBloomingtonMNWI = await em.upsert(RegionEntity, {
      name: 'Minneapolis-St. Paul-Bloomington, MN-WI',
      group: groupContext.usMidWest,
    });

    regionContext.SaintLouisMetropolitanAreaMOIL = await em.upsert(RegionEntity, {
      name: 'Saint Louis Metropolitan Area, MO-IL',
      group: groupContext.usMidWest,
    });

    regionContext.CincinnatiOHKYIN = await em.upsert(RegionEntity, {
      name: 'Cincinnati, OH-KY-IN',
      group: groupContext.usMidWest,
    });

    regionContext.KansasCityMOKS = await em.upsert(RegionEntity, {
      name: 'Kansas City, MO-KS',
      group: groupContext.usMidWest,
    });

    regionContext.ColumbusOH = await em.upsert(RegionEntity, {
      name: 'Columbus, OH',
      group: groupContext.usMidWest,
    });

    regionContext.IndianapolisCarmelAndersonIN = await em.upsert(RegionEntity, {
      name: 'Indianapolis-Carmel-Anderson, IN',
      group: groupContext.usMidWest,
    });

    regionContext.ClevelandElyriaOH = await em.upsert(RegionEntity, {
      name: 'Cleveland-Elyria, OH',
      group: groupContext.usMidWest,
    });

    /**************************************************************************/
    // US - North East
    /**************************************************************************/

    regionContext.NewYorkNewarkJerseyCityNYNJPA = await em.upsert(RegionEntity, {
      name: 'New York-Newark-Jersey City, NY-NJ-PA',
      group: groupContext.usNorthEast,
    });

    regionContext.PhiladelphiaCamdenWilmingtonPANJDEMD = await em.upsert(RegionEntity, {
      name: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
      group: groupContext.usNorthEast,
    });

    regionContext.RochesterNY = await em.upsert(RegionEntity, {
      name: 'Rochester, NY',
      group: groupContext.usNorthEast,
    });

    regionContext.BostonCambridgeNewtonMA = await em.upsert(RegionEntity, {
      name: 'Boston-Cambridge-Newton, MA',
      group: groupContext.usNorthEast,
    });

    regionContext.PittsburghPA = await em.upsert(RegionEntity, {
      name: 'Pittsburgh, PA',
      group: groupContext.usNorthEast,
    });

    regionContext.ProvidenceWarwickRIMA = await em.upsert(RegionEntity, {
      name: 'Providence-Warwick, RI-MA',
      group: groupContext.usNorthEast,
    });

    regionContext.HartfordEastHartforMiddletownCT = await em.upsert(RegionEntity, {
      name: 'Hartford-East Hartford-Middletown, CT',
      group: groupContext.usNorthEast,
    });

    regionContext.BuffaloCheektowagaMetropolitanAreaNY = await em.upsert(RegionEntity, {
      name: 'Buffalo-Cheektowaga Metropolitan Area, NY',
      group: groupContext.usNorthEast,
    });

    /**************************************************************************/
    // US - South
    /**************************************************************************/

    regionContext.RaleighDurhamCaryNC = await em.upsert(RegionEntity, {
      name: 'Raleigh-Durham-Cary, NC',
      group: groupContext.usSouth,
    });

    regionContext.DallasFortWorthArlingtonTX = await em.upsert(RegionEntity, {
      name: 'Dallas-Fort Worth-Arlington, TX',
      group: groupContext.usSouth,
    });

    regionContext.HoustonTheWoodlandsSugarLandTX = await em.upsert(RegionEntity, {
      name: 'Houston-The Woodlands-Sugar Land, TX',
      group: groupContext.usSouth,
    });

    regionContext.WashingtonArlingtonAlexandriaVAMDWV = await em.upsert(RegionEntity, {
      name: 'Washington-Arlington-Alexandria, VA-MD-WV',
      group: groupContext.usSouth,
    });

    regionContext.AtlantaSandySpringsRoswellGA = await em.upsert(RegionEntity, {
      name: 'Atlanta-Sandy Springs-Roswell, GA',
      group: groupContext.usSouth,
    });

    regionContext.MiamiFortLauderdalePompanoBeachFL = await em.upsert(RegionEntity, {
      name: 'Miami-Fort Lauderdale-Pompano Beach, FL',
      group: groupContext.usSouth,
    });

    regionContext.TampaStPetersburgClearwaterFL = await em.upsert(RegionEntity, {
      name: 'Tampa-St. Petersburg-Clearwater, FL',
      group: groupContext.usSouth,
    });

    regionContext.BaltimoreMetropolitanAreaMD = await em.upsert(RegionEntity, {
      name: 'Baltimore Metropolitan Area, MD',
      group: groupContext.usSouth,
    });

    regionContext.OrlandoMetropolitanAreaFL = await em.upsert(RegionEntity, {
      name: 'Orlando Metropolitan Area, FL',
      group: groupContext.usSouth,
    });

    regionContext.CharlotteConcordGastoniaNCSC = await em.upsert(RegionEntity, {
      name: 'Charlotte-Concord-Gastonia, NC-SC',
      group: groupContext.usSouth,
    });

    regionContext.SanAntonioNewBraunfelsTX = await em.upsert(RegionEntity, {
      name: 'San Antonio-New Braunfels, TX',
      group: groupContext.usSouth,
    });

    regionContext.AustinRoundRockGeorgetownTX = await em.upsert(RegionEntity, {
      name: 'Austin-Round Rock-Georgetown, TX',
      group: groupContext.usSouth,
    });

    regionContext.PhoenixMesaChandlerAZ = await em.upsert(RegionEntity, {
      name: 'Phoenix-Mesa-Chandler, AZ',
      group: groupContext.usSouth,
    });

    regionContext.NashvilleDavidsonMurfreesboroFranklinTN = await em.upsert(
      RegionEntity,
      {
        name: 'Nashville-Davidson-Murfreesboro-Franklin, TN',
        group: groupContext.usSouth,
      },
    );

    regionContext.JacksonvilleFL = await em.upsert(RegionEntity, {
      name: 'Jacksonville, FL',
      group: groupContext.usSouth,
    });

    regionContext.RichmondVA = await em.upsert(RegionEntity, {
      name: 'Richmond, VA',
      group: groupContext.usSouth,
    });

    regionContext.OklahomaCityOK = await em.upsert(RegionEntity, {
      name: 'Oklahoma City, OK',
      group: groupContext.usSouth,
    });

    regionContext.KnoxvilleMetAreaTN = await em.upsert(RegionEntity, {
      name: 'Knoxville Met Area, TN',
      group: groupContext.usSouth,
    });

    regionContext.McAllenEdinburgMissionTX = await em.upsert(RegionEntity, {
      name: 'McAllen-Edinburg-Mission, TX',
      group: groupContext.usSouth,
    });

    regionContext.MemphisClarksdaleForrestCityTN = await em.upsert(RegionEntity, {
      name: 'Memphis-Clarksdale-Forrest City, TN',
      group: groupContext.usSouth,
    });

    /**************************************************************************/
    // US - West
    /**************************************************************************/

    regionContext.LosAngelesAnaheimRiversideCA = await em.upsert(RegionEntity, {
      name: 'Los Angeles-Anaheim-Riverside, CA',
      group: groupContext.usWest,
    });

    regionContext.RiversideSanBernardinoOntarioCA = await em.upsert(RegionEntity, {
      name: 'Riverside-San Bernardino-Ontario, CA',
      group: groupContext.usWest,
    });

    regionContext.SanFranciscoOaklandBerkeleyCA = await em.upsert(RegionEntity, {
      name: 'San Francisco-Oakland-Berkeley, CA',
      group: groupContext.usWest,
    });

    regionContext.SeattleMetropolitanAreaWA = await em.upsert(RegionEntity, {
      name: 'Seattle Metropolitan Area, WA',
      group: groupContext.usWest,
    });

    regionContext.SanDiegoMetropolitanAreaCA = await em.upsert(RegionEntity, {
      name: 'San Diego Metropolitan Area, CA',
      group: groupContext.usWest,
    });

    regionContext.DenverMetropolitanAreaCO = await em.upsert(RegionEntity, {
      name: 'Denver Metropolitan Area, CO',
      group: groupContext.usWest,
    });

    regionContext.PortlandVancouverHillsboroORWA = await em.upsert(RegionEntity, {
      name: 'Portland-Vancouver-Hillsboro, OR-WA',
      group: groupContext.usWest,
    });

    regionContext.SacrementoHendersonParadiseCA = await em.upsert(RegionEntity, {
      name: 'Sacremento-Henderson-Paradise, CA',
      group: groupContext.usWest,
    });

    regionContext.LasVegasCarmelAndersonNV = await em.upsert(RegionEntity, {
      name: 'Las Vegas-Carmel-Anderson, NV',
      group: groupContext.usWest,
    });

    regionContext.SanJoseSunnyvaleSantaClaraCA = await em.upsert(RegionEntity, {
      name: 'San Jose-Sunnyvale-Santa Clara, CA',
      group: groupContext.usWest,
    });

    regionContext.VirginiaBeachNorfolkNewportNewsVANC = await em.upsert(RegionEntity, {
      name: 'Virginia Beach-Norfolk-Newport News, VA-NC',
      group: groupContext.usWest,
    });

    regionContext.SaltLakeCityAreaUT = await em.upsert(RegionEntity, {
      name: 'Salt Lake City Area, UT',
      group: groupContext.usWest,
    });

    regionContext.HonoluluHI = await em.upsert(RegionEntity, {
      name: 'Honolulu, HI',
      group: groupContext.usWest,
    });

    /**************************************************************************/
    // Wales
    /**************************************************************************/

    regionContext.MidNorthernWales = await em.upsert(RegionEntity, {
      name: 'Mid & Northern Wales',
      group: groupContext.wales,
    });

    regionContext.SouthWestWalesSwanseaPembrokshireArea = await em.upsert(RegionEntity, {
      name: 'South West Wales (Swansea & Pembrokshire Area)',
      group: groupContext.wales,
    });

    regionContext.SouthEastWalesCardiffNewportArea = await em.upsert(RegionEntity, {
      name: 'South East Wales (Cardiff & Newport Area)',
      group: groupContext.wales,
    });
  }
}
