# FTCELO
App that ranks FTC (First Tech Challenge) Teams with based on an ELO ranking system, pulling data from FTCScout
# FTCScout GraphQL structure
```javascript
type Query {
  teamByNumber(number: Int!): Team
  teamByName(name: String!): Team
  teamsSearch(region: RegionOption, limit: Int, searchText: String): [Team!]!
  eventByCode(season: Int!, code: String!): Event
  eventsSearch(
    season: Int!
    region: RegionOption
    type: EventTypeOption
    hasMatches: Boolean
    start: Date
    end: Date
    limit: Int
    searchText: String
  ): [Event!]!
  tepRecords(
    season: Int!
    sortBy: String
    sortDir: SortDir
    filter: Filter
    region: RegionOption
    type: EventTypeOption
    remote: RemoteOption
    start: Date
    end: Date
    skip: Int!
    take: Int!
  ): TepRecords!
  matchRecords(
    season: Int!
    sortBy: String
    sortDir: SortDir
    filter: Filter
    region: RegionOption
    type: EventTypeOption
    remote: RemoteOption
    start: Date
    end: Date
    skip: Int!
    take: Int!
  ): MatchRecords!
  activeTeamsCount(season: Int!): Int!
  matchesPlayedCount(season: Int!): Int!
  eventsOnDate(date: DateTime, type: EventTypeOption): [Event!]!
  tradWorldRecord(season: Int!): Match!
  getBestName: BestName
}

type Team {
  number: Int!
  name: String!
  schoolName: String!
  sponsors: [String!]!
  location: Location!
  rookieYear: Int!
  website: String
  createdAt: DateTime!
  updatedAt: DateTime!
  awards(season: Int): [Award!]!
  matches(season: Int, eventCode: String): [TeamMatchParticipation!]!
  events(season: Int!): [TeamEventParticipation!]!
  quickStats(season: Int!, region: RegionOption): QuickStats
}

type Location {
  venue: String
  city: String!
  state: String!
  country: String!
}

# A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
scalar DateTime

type Award {
  season: Int!
  eventCode: String!
  teamNumber: Int!
  divisionName: String
  personName: String
  type: AwardType!
  placement: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  team: Team!
  event: Event!
}

enum AwardType {
  DeansListFinalist
  DeansListSemiFinalist
  DeansListWinner
  JudgesChoice
  DivisionFinalist
  DivisionWinner
  ConferenceFinalist
  Compass
  Promote
  Control
  Motivate
  Design
  Innovate
  Connect
  Think
  TopRanked
  Inspire
  Winner
  Finalist
}

type Event {
  season: Int!
  code: String!
  divisionCode: String
  name: String!
  remote: Boolean!
  hybrid: Boolean!
  fieldCount: Int!
  published: Boolean!
  type: EventType!
  regionCode: String
  leagueCode: String
  districtCode: String
  address: String
  location: Location!
  website: String
  liveStreamURL: String
  webcasts: [String!]!
  timezone: String!
  start: Date!
  end: Date!
  createdAt: DateTime!
  updatedAt: DateTime!
  started: Boolean!
  ongoing: Boolean!
  finished: Boolean!
  relatedEvents: [Event!]!
  awards: [Award!]!
  teams: [TeamEventParticipation!]!
  teamMatches(teamNumber: Int): [TeamMatchParticipation!]!
  hasMatches: Boolean!
  matches: [Match!]!
}

enum EventType {
  Scrimmage
  LeagueMeet
  Qualifier
  LeagueTournament
  Championship
  Other
  FIRSTChampionship
  SuperQualifier
  InnovationChallenge
  OffSeason
  Kickoff
  Workshop
  DemoExhibition
  VolunteerSignup
  PracticeDay
}

# A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
scalar Date

type TeamEventParticipation {
  season: Int!
  eventCode: String!
  teamNumber: Int!
  stats: TeamEventStats
  event: Event!
  team: Team!
  awards: [Award!]!
  matches: [TeamMatchParticipation!]!
}

union TeamEventStats =
    TeamEventStats2019
  | TeamEventStats2020Trad
  | TeamEventStats2020Remote
  | TeamEventStats2021Trad
  | TeamEventStats2021Remote
  | TeamEventStats2022
  | TeamEventStats2023
  | TeamEventStats2024

type TeamEventStats2019 {
  rank: Int!
  rp: Float!
  tb1: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2019Group!
  avg: TeamEventStats2019Group!
  min: TeamEventStats2019Group!
  max: TeamEventStats2019Group!
  dev: TeamEventStats2019Group!
  opr: TeamEventStats2019Group!
}

type TeamEventStats2019Group {
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  penaltyPointsCommitted: Float!
  majorsByOppPoints: Float!
  minorsByOppPoints: Float!
  penaltyPointsByOpp: Float!
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoRepositioningPoints: Float!
  autoDeliveryPoints: Float!
  autoPlacementPoints: Float!
  dcDeliveryPoints: Float!
  dcPlacementPoints: Float!
  skyscraperBonusPoints: Float!
  cappingPoints: Float!
  cappingPointsIndividual: Float!
  egParkPoints: Float!
  egParkPointsIndividual: Float!
  egFoundationMovedPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  egPoints: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2020Trad {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2020TradGroup!
  avg: TeamEventStats2020TradGroup!
  min: TeamEventStats2020TradGroup!
  max: TeamEventStats2020TradGroup!
  dev: TeamEventStats2020TradGroup!
  opr: TeamEventStats2020TradGroup!
}

type TeamEventStats2020TradGroup {
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoTowerPoints: Float!
  autoTowerLowPoints: Float!
  autoTowerMidPoints: Float!
  autoTowerHighPoints: Float!
  autoWobblePoints: Float!
  autoPowershotPoints: Float!
  egWobblePoints: Float!
  egPowershotPoints: Float!
  egWobbleRingPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  dcTowerLowPoints: Float!
  dcTowerMidPoints: Float!
  dcTowerHighPoints: Float!
  egPoints: Float!
  penaltyPointsCommitted: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2020Remote {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2020RemoteGroup!
  avg: TeamEventStats2020RemoteGroup!
  min: TeamEventStats2020RemoteGroup!
  max: TeamEventStats2020RemoteGroup!
  dev: TeamEventStats2020RemoteGroup!
  opr: TeamEventStats2020RemoteGroup!
}

type TeamEventStats2020RemoteGroup {
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoTowerPoints: Float!
  autoTowerLowPoints: Float!
  autoTowerMidPoints: Float!
  autoTowerHighPoints: Float!
  autoWobblePoints: Float!
  autoPowershotPoints: Float!
  egWobblePoints: Float!
  egPowershotPoints: Float!
  egWobbleRingPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  dcTowerLowPoints: Float!
  dcTowerMidPoints: Float!
  dcTowerHighPoints: Float!
  egPoints: Float!
  penaltyPointsCommitted: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2021Trad {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2021TradGroup!
  avg: TeamEventStats2021TradGroup!
  min: TeamEventStats2021TradGroup!
  max: TeamEventStats2021TradGroup!
  dev: TeamEventStats2021TradGroup!
  opr: TeamEventStats2021TradGroup!
}

type TeamEventStats2021TradGroup {
  autoCarouselPoints: Float!
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoFreightPoints: Float!
  autoFreight1Points: Float!
  autoFreight2Points: Float!
  autoFreight3Points: Float!
  autoFreightStoragePoints: Float!
  autoBonusPoints: Float!
  autoBonusPointsIndividual: Float!
  dcAllianceHubPoints: Float!
  dcFreight1Points: Float!
  dcFreight2Points: Float!
  dcFreight3Points: Float!
  dcSharedHubPoints: Float!
  dcStoragePoints: Float!
  egDuckPoints: Float!
  allianceBalancedPoints: Float!
  sharedUnbalancedPoints: Float!
  egParkPoints: Float!
  egParkPointsIndividual: Float!
  cappingPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  egPoints: Float!
  penaltyPointsCommitted: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2021Remote {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2021RemoteGroup!
  avg: TeamEventStats2021RemoteGroup!
  min: TeamEventStats2021RemoteGroup!
  max: TeamEventStats2021RemoteGroup!
  dev: TeamEventStats2021RemoteGroup!
  opr: TeamEventStats2021RemoteGroup!
}

type TeamEventStats2021RemoteGroup {
  autoCarouselPoints: Float!
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoFreightPoints: Float!
  autoFreight1Points: Float!
  autoFreight2Points: Float!
  autoFreight3Points: Float!
  autoFreightStoragePoints: Float!
  autoBonusPoints: Float!
  autoBonusPointsIndividual: Float!
  dcAllianceHubPoints: Float!
  dcFreight1Points: Float!
  dcFreight2Points: Float!
  dcFreight3Points: Float!
  dcStoragePoints: Float!
  egDuckPoints: Float!
  allianceBalancedPoints: Float!
  egParkPoints: Float!
  egParkPointsIndividual: Float!
  cappingPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  egPoints: Float!
  penaltyPointsCommitted: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2022 {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2022Group!
  avg: TeamEventStats2022Group!
  min: TeamEventStats2022Group!
  max: TeamEventStats2022Group!
  dev: TeamEventStats2022Group!
  opr: TeamEventStats2022Group!
}

type TeamEventStats2022Group {
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  autoConePoints: Float!
  autoTerminalPoints: Float!
  autoGroundPoints: Float!
  autoLowPoints: Float!
  autoMediumPoints: Float!
  autoHighPoints: Float!
  egNavPoints: Float!
  egNavPointsIndividual: Float!
  ownershipPoints: Float!
  coneOwnershipPoints: Float!
  beaconOwnershipPoints: Float!
  circuitPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  penaltyPointsCommitted: Float!
  majorsByOppPoints: Float!
  minorsByOppPoints: Float!
  penaltyPointsByOpp: Float!
  autoPoints: Float!
  dcPoints: Float!
  dcTerminalPoints: Float!
  dcGroundPoints: Float!
  dcLowPoints: Float!
  dcMediumPoints: Float!
  dcHighPoints: Float!
  egPoints: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2023 {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2023Group!
  avg: TeamEventStats2023Group!
  min: TeamEventStats2023Group!
  max: TeamEventStats2023Group!
  dev: TeamEventStats2023Group!
  opr: TeamEventStats2023Group!
}

type TeamEventStats2023Group {
  egNavPoints: Float!
  egNavPointsIndividual: Float!
  purplePoints: Float!
  purplePointsIndividual: Float!
  yellowPoints: Float!
  yellowPointsIndividual: Float!
  autoPixelPoints: Float!
  autoBackstagePoints: Float!
  autoBackdropPoints: Float!
  autoNavPoints: Float!
  autoNavPointsIndividual: Float!
  dronePoints: Float!
  dronePointsIndividual: Float!
  setLinePoints: Float!
  mosaicPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  penaltyPointsCommitted: Float!
  majorsByOppPoints: Float!
  minorsByOppPoints: Float!
  penaltyPointsByOpp: Float!
  autoPoints: Float!
  dcPoints: Float!
  dcBackdropPoints: Float!
  dcBackstagePoints: Float!
  egPoints: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamEventStats2024 {
  rank: Int!
  rp: Float!
  tb1: Float!
  tb2: Float!
  wins: Int!
  losses: Int!
  ties: Int!
  dqs: Int!
  qualMatchesPlayed: Int!
  tot: TeamEventStats2024Group!
  avg: TeamEventStats2024Group!
  min: TeamEventStats2024Group!
  max: TeamEventStats2024Group!
  dev: TeamEventStats2024Group!
  opr: TeamEventStats2024Group!
}

type TeamEventStats2024Group {
  autoParkPoints: Float!
  autoParkPointsIndividual: Float!
  autoSamplePoints: Float!
  autoSpecimenPoints: Float!
  autoSampleNetPoints: Float!
  autoSampleLowPoints: Float!
  autoSampleHighPoints: Float!
  autoSpecimenLowPoints: Float!
  autoSpecimenHighPoints: Float!
  dcParkPoints: Float!
  dcParkPointsIndividual: Float!
  dcSamplePoints: Float!
  dcSpecimenPoints: Float!
  dcSampleNetPoints: Float!
  dcSampleLowPoints: Float!
  dcSampleHighPoints: Float!
  dcSpecimenLowPoints: Float!
  dcSpecimenHighPoints: Float!
  autoPoints: Float!
  dcPoints: Float!
  majorsCommittedPoints: Float!
  minorsCommittedPoints: Float!
  penaltyPointsCommitted: Float!
  majorsByOppPoints: Float!
  minorsByOppPoints: Float!
  penaltyPointsByOpp: Float!
  totalPointsNp: Float!
  totalPoints: Float!
}

type TeamMatchParticipation {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  station: Station!
  teamNumber: Int!
  allianceRole: AllianceRole!
  surrogate: Boolean!
  noShow: Boolean!
  dq: Boolean!
  onField: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
  team: Team!
  match: Match!
  event: Event!
}

enum Alliance {
  Red
  Blue
  Solo
}

enum Station {
  One
  Two
  NotOnField
  Solo
}

enum AllianceRole {
  Captain
  FirstPick
  SecondPick
  Solo
}

type Match {
  season: Int!
  eventCode: String!
  id: Int!
  hasBeenPlayed: Boolean!
  scheduledStartTime: DateTime
  actualStartTime: DateTime
  postResultTime: DateTime
  tournamentLevel: TournamentLevel!
  series: Int!
  matchNum: Int!
  description: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  scores: MatchScores
  teams: [TeamMatchParticipation!]!
  event: Event!
}

enum TournamentLevel {
  Quals
  Semis
  Finals
}

union MatchScores =
    MatchScores2019
  | MatchScores2020Trad
  | MatchScores2020Remote
  | MatchScores2021Trad
  | MatchScores2021Remote
  | MatchScores2022
  | MatchScores2023
  | MatchScores2024

type MatchScores2019 {
  season: Int!
  eventCode: String!
  matchId: Int!
  red: MatchScores2019Alliance!
  blue: MatchScores2019Alliance!
}

type MatchScores2019Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  autoNav2019_1: Boolean!
  autoNav2019_2: Boolean!
  repositioned: Boolean!
  autoDelivered: Int!
  autoSkystonesDeliveredFirst: Int!
  autoReturned: Int!
  autoFirstReturnedSkystone: Boolean!
  autoPlaced: Int!
  dcDelivered: Int!
  dcReturned: Int!
  dcPlaced: Int!
  skyscraperHeight: Int!
  capLevel1: Int!
  capLevel2: Int!
  egFoundationMoved: Boolean!
  egParked1: Boolean!
  egParked2: Boolean!
  minorsCommitted: Int!
  majorsCommitted: Int!
  penaltyPointsCommitted: Int!
  minorsByOpp: Int!
  majorsByOpp: Int!
  penaltyPointsByOpp: Int!
  autoNavPoints: Int!
  autoRepositioningPoints: Int!
  autoDeliveryPoints: Int!
  autoPlacementPoints: Int!
  dcDeliveryPoints: Int!
  dcPlacementPoints: Int!
  skyscraperBonusPoints: Int!
  cappingPoints: Int!
  egParkPoints: Int!
  egFoundationMovedPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

type MatchScores2020Trad {
  season: Int!
  eventCode: String!
  matchId: Int!
  red: MatchScores2020Alliance!
  blue: MatchScores2020Alliance!
}

type MatchScores2020Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  autoWobble1: Boolean!
  autoWobble2: Boolean!
  autoNav2020_1: Boolean!
  autoNav2020_2: Boolean!
  autoPowershots: Int!
  autoTowerLow: Int!
  autoTowerMid: Int!
  autoTowerHigh: Int!
  dcTowerLow: Int!
  dcTowerMid: Int!
  dcTowerHigh: Int!
  wobbleEndPos1: WobbleEndPosition2020!
  wobbleEndPos2: WobbleEndPosition2020!
  egWobbleRings: Int!
  egPowershots: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  autoNavPoints: Int!
  autoTowerPoints: Int!
  autoWobblePoints: Int!
  autoPowershotPoints: Int!
  egWobblePoints: Int!
  egPowershotPoints: Int!
  egWobbleRingPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  penaltyPointsCommitted: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

enum WobbleEndPosition2020 {
  None
  StartLine
  DropZone
}

type MatchScores2020Remote {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  autoWobble1: Boolean!
  autoWobble2: Boolean!
  autoNav2020: Boolean!
  autoPowershots: Int!
  autoTowerLow: Int!
  autoTowerMid: Int!
  autoTowerHigh: Int!
  dcTowerLow: Int!
  dcTowerMid: Int!
  dcTowerHigh: Int!
  wobbleEndPos1: WobbleEndPosition2020!
  wobbleEndPos2: WobbleEndPosition2020!
  egWobbleRings: Int!
  egPowershots: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  autoNavPoints: Int!
  autoTowerPoints: Int!
  autoWobblePoints: Int!
  autoPowershotPoints: Int!
  egWobblePoints: Int!
  egPowershotPoints: Int!
  egWobbleRingPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  penaltyPointsCommitted: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

type MatchScores2021Trad {
  season: Int!
  eventCode: String!
  matchId: Int!
  red: MatchScores2021Alliance!
  blue: MatchScores2021Alliance!
}

type MatchScores2021Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  barcodeElement1: BarcodeElement2021!
  barcodeElement2: BarcodeElement2021!
  autoCarousel: Boolean!
  autoNav2021_1: AutoNav2021!
  autoNav2021_2: AutoNav2021!
  autoBonus1: Boolean!
  autoBonus2: Boolean!
  autoStorageFreight: Int!
  autoFreight1: Int!
  autoFreight2: Int!
  autoFreight3: Int!
  dcStorageFreight: Int!
  dcFreight1: Int!
  dcFreight2: Int!
  dcFreight3: Int!
  sharedFreight: Int!
  egDucks: Int!
  allianceBalanced: Boolean!
  sharedUnbalanced: Boolean!
  egPark1: EgPark2021!
  egPark2: EgPark2021!
  capped: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  autoCarouselPoints: Int!
  autoNavPoints: Int!
  autoFreightPoints: Int!
  autoBonusPoints: Int!
  dcAllianceHubPoints: Int!
  dcSharedHubPoints: Int!
  dcStoragePoints: Int!
  egDuckPoints: Int!
  allianceBalancedPoints: Int!
  sharedUnbalancedPoints: Int!
  egParkPoints: Int!
  cappingPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  penaltyPointsCommitted: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

enum BarcodeElement2021 {
  Duck
  TSE
}

enum AutoNav2021 {
  None
  InStorage
  CompletelyInStorage
  InWarehouse
  CompletelyInWarehouse
}

enum EgPark2021 {
  None
  InWarehouse
  CompletelyInWarehouse
}

type MatchScores2021Remote {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  barcodeElement: BarcodeElement2021!
  autoCarousel: Boolean!
  autoNav2021: AutoNav2021!
  autoBonus: Boolean!
  autoStorageFreight: Int!
  autoFreight1: Int!
  autoFreight2: Int!
  autoFreight3: Int!
  dcStorageFreight: Int!
  dcFreight1: Int!
  dcFreight2: Int!
  dcFreight3: Int!
  egDucks: Int!
  allianceBalanced: Boolean!
  egPark: EgPark2021!
  capped: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  autoCarouselPoints: Int!
  autoNavPoints: Int!
  autoFreightPoints: Int!
  autoBonusPoints: Int!
  dcAllianceHubPoints: Int!
  dcStoragePoints: Int!
  egDuckPoints: Int!
  allianceBalancedPoints: Int!
  egParkPoints: Int!
  cappingPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  penaltyPointsCommitted: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

type MatchScores2022 {
  season: Int!
  eventCode: String!
  matchId: Int!
  autoConeLayout: ConeLayout!
  dcConeLayout: ConeLayout!
  red: MatchScores2022Alliance!
  blue: MatchScores2022Alliance!
}

type ConeLayout {
  redNearTerminal: Int!
  redFarTerminal: Int!
  blueNearTerminal: Int!
  blueFarTerminal: Int!
  junctions: [[[ConeType!]!]!]!
}

enum ConeType {
  RedCone
  BlueCone
  RedBeacon1
  BlueBeacon1
  RedBeacon2
  BlueBeacon2
}

type MatchScores2022Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  autoNav2022_1: AutoNav2022!
  autoNav2022_2: AutoNav2022!
  autoTerminalCones: Int!
  autoGroundCones: Int!
  autoLowCones: Int!
  autoMediumCones: Int!
  autoHighCones: Int!
  dcNearTerminalCones: Int!
  dcFarTerminalCones: Int!
  dcTerminalCones: Int!
  dcGroundCones: Int!
  dcLowCones: Int!
  dcMediumCones: Int!
  dcHighCones: Int!
  egNav1: Boolean!
  egNav2: Boolean!
  coneOwnedJunctions: Int!
  beaconOwnedJunctions: Int!
  circuit: Boolean!
  minorsCommitted: Int!
  majorsCommitted: Int!
  minorsByOpp: Int!
  majorsByOpp: Int!
  autoNavPoints: Int!
  autoConePoints: Int!
  egNavPoints: Int!
  ownershipPoints: Int!
  circuitPoints: Int!
  penaltyPointsCommitted: Int!
  penaltyPointsByOpp: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

enum AutoNav2022 {
  None
  Terminal
  Signal
  TeamSignal
}

type MatchScores2023 {
  season: Int!
  eventCode: String!
  matchId: Int!
  red: MatchScores2023Alliance!
  blue: MatchScores2023Alliance!
}

type MatchScores2023Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  egNav2023_1: EgNav2023!
  egNav2023_2: EgNav2023!
  purple1: AutoSpecialScoring!
  purple2: AutoSpecialScoring!
  yellow1: AutoSpecialScoring!
  yellow2: AutoSpecialScoring!
  autoBackdrop: Int!
  autoBackstage: Int!
  dcBackstage: Int!
  dcBackdrop: Int!
  autoNav1: Boolean!
  autoNav2: Boolean!
  drone1: Int!
  drone2: Int!
  maxSetLine: Int!
  mosaics: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  minorsByOpp: Int!
  majorsByOpp: Int!
  egNavPoints: Int!
  purplePoints: Int!
  yellowPoints: Int!
  autoPixelPoints: Int!
  autoNavPoints: Int!
  dronePoints: Int!
  setLinePoints: Int!
  mosaicPoints: Int!
  penaltyPointsCommitted: Int!
  penaltyPointsByOpp: Int!
  autoPoints: Int!
  dcPoints: Int!
  egPoints: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

enum EgNav2023 {
  None
  Backstage
  Rigging
}

enum AutoSpecialScoring {
  None
  NoProp
  TeamProp
}

type MatchScores2024 {
  season: Int!
  eventCode: String!
  matchId: Int!
  red: MatchScores2024Alliance!
  blue: MatchScores2024Alliance!
}

type MatchScores2024Alliance {
  season: Int!
  eventCode: String!
  matchId: Int!
  alliance: Alliance!
  autoPark1: ITDPark!
  autoPark2: ITDPark!
  autoSampleNet: Int!
  autoSampleLow: Int!
  autoSampleHigh: Int!
  autoSpecimenLow: Int!
  autoSpecimenHigh: Int!
  dcPark1: ITDPark!
  dcPark2: ITDPark!
  dcSampleNet: Int!
  dcSampleLow: Int!
  dcSampleHigh: Int!
  dcSpecimenLow: Int!
  dcSpecimenHigh: Int!
  minorsCommitted: Int!
  majorsCommitted: Int!
  minorsByOpp: Int!
  majorsByOpp: Int!
  autoParkPoints: Int!
  autoSamplePoints: Int!
  autoSpecimenPoints: Int!
  dcParkPoints: Int!
  dcSamplePoints: Int!
  dcSpecimenPoints: Int!
  autoPoints: Int!
  dcPoints: Int!
  penaltyPointsCommitted: Int!
  penaltyPointsByOpp: Int!
  totalPointsNp: Int!
  totalPoints: Int!
}

enum ITDPark {
  ObservationZone
  Ascent1
  Ascent2
  Ascent3
  None
}

type QuickStats {
  season: Int!
  number: Int!
  tot: QuickStat!
  auto: QuickStat!
  dc: QuickStat!
  eg: QuickStat!
  count: Int!
}

type QuickStat {
  value: Float!
  rank: Int!
}

enum RegionOption {
  All
  UnitedStates
  International
  USCA
  USNY
  USTX
  AU
  BR
  CAAB
  CABC
  CAON
  CAQC
  CMPIC
  CMPZ2
  CN
  CY
  DE
  EG
  ES
  FR
  GB
  IL
  IN
  JM
  KR
  KZ
  LY
  MX
  NG
  NL
  NZ
  ONADOD
  QA
  RO
  RU
  SA
  TH
  TW
  USAK
  USAL
  USAR
  USARL
  USAZ
  USCALA
  USCALS
  USCANO
  USCASD
  USCHS
  USCO
  USCT
  USDE
  USFL
  USGA
  USHI
  USIA
  USID
  USIL
  USIN
  USKY
  USLA
  USMA
  USMD
  USMI
  USMN
  USMOKS
  USMS
  USMT
  USNC
  USND
  USNE
  USNH
  USNJ
  USNM
  USNV
  USNYEX
  USNYLI
  USNYNY
  USOH
  USOK
  USOR
  USPA
  USRI
  USSC
  USTN
  USTXCE
  USTXHO
  USTXNO
  USTXSO
  USTXWP
  USUT
  USVA
  USVT
  USWA
  USWI
  USWV
  USWY
  ZA
}

enum EventTypeOption {
  All
  Competition
  Official
  NonCompetition
  Scrimmage
  LeagueMeet
  Qualifier
  LeagueTournament
  Championship
  Other
  FIRSTChampionship
  SuperQualifier
  InnovationChallenge
  OffSeason
  Kickoff
  Workshop
  DemoExhibition
  VolunteerSignup
  PracticeDay
}

type TepRecords {
  data: [TepRecordRow!]!
  offset: Int!
  count: Int!
}

type TepRecordRow {
  data: TeamEventParticipation!
  noFilterRank: Int!
  filterRank: Int!
  noFilterSkipRank: Int!
  filterSkipRank: Int!
}

enum SortDir {
  Asc
  Desc
}

input Filter {
  group: FilterGroup
  cond: FilterCond
}

input FilterGroup {
  ty: FilterGroupTy!
  children: [Filter!]!
}

enum FilterGroupTy {
  And
  Or
}

input FilterCond {
  lhs: FilterValue!
  op: FilterOp!
  rhs: FilterValue!
}

input FilterValue {
  lit: Int
  var: String
}

enum FilterOp {
  Eq
  Neq
  Gt
  Gte
  Lt
  Lte
}

enum RemoteOption {
  All
  Trad
  Remote
}

type MatchRecords {
  data: [MatchRecordRow!]!
  offset: Int!
  count: Int!
}

type MatchRecordRow {
  data: SpecificAlliance!
  noFilterRank: Int!
  filterRank: Int!
  noFilterSkipRank: Int!
  filterSkipRank: Int!
}

type SpecificAlliance {
  match: Match!
  alliance: Alliance!
}

type BestName {
  id: Int!
  team1: Team!
  team2: Team!
}

type Mutation {
  voteBestName(id: Int!, vote: Int!): BestName
}

type Subscription {
  newMatches(season: Int!, code: String!): [Match!]
}
```
