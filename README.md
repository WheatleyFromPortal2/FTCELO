# FTCELO
App that ranks FTC (First Tech Challenge) Teams with based on an ELO ranking system, pulling data from FTCScout
# FTCScout GraphQL structure
```json
{"data":
    {"__schema":
        {"queryType":
            {"fields":
                [
                    {"name":"teamByNumber"},
                    {"name":"teamByName"},
                    {"name":"teamsSearch"},
                    {"name":"eventByCode"},
                    {"name":"eventsSearch"},
                    {"name":"tepRecords"},
                    {"name":"matchRecords"},
                    {"name":"activeTeamsCount"},
                    {"name":"matchesPlayedCount"},
                    {"name":"eventsOnDate"},
                    {"name":"tradWorldRecord"},
                    {"name":"getBestName"}
                ]
            }
        }
    }
}
```
