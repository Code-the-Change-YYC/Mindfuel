Object.assign(window.search, {
  doc_urls: [
    "1_frontend.html#frontend",
    "2_backend.html#backend--apis",
    "3_database.html#database",
    "4_development.html#development",
  ],
  index: {
    documentStore: {
      docInfo: {
        0: { body: 308, breadcrumbs: 2, title: 1 },
        1: { body: 375, breadcrumbs: 4, title: 2 },
        2: { body: 211, breadcrumbs: 2, title: 1 },
        3: { body: 295, breadcrumbs: 2, title: 1 },
      },
      docs: {
        0: {
          body: "The frontend was developed with React v16 and Redux with Typescript. Similar to the backend, it listens to the WebSocket server for live users to display on the map. Additionally, it will call the Go backend APIs to fetch historical users within a provided time range along with correponding statistics. The project consists of only a single view (Home.tsx) which serves as a mediator for its multiple child components (e.g. Timeline, SideNav, Socials) by receiving and passing necessary data through props. Consequently, the Home component is also responsible for managing certain state that lives outside of the Redux store using State Hooks. Most of the API calls, performed via Redux actions, are also centralized here. Notable packages used in the frontend are: react as the frontend framework react-redux for Redux bindings in React @material-ui for React components with Material Design google-map-react as the Google Maps API wrapper Requires setting the Google Maps API key as an environment variable react-twitter-embed for embedding tweets from the MindFuel account recharts for charts For details on versioning, view the package.json file in the frontend project. Project Structure ├── frontend_react\n├── src\n│ ├── api // API and Socket services for connecting to Go backend and WebSocket server\n│ ├── components // Shared React components used on the page (TSX and CSS files)\n│ ├── hooks // Shared custom React hooks\n│ ├── res\n│ │ └── assets // Image and vector assets\n│ ├── state // Redux logic\n│ │ ├── actions.ts\n│ │ ├── hooks.ts\n│ │ ├── reducer.ts\n│ │ └── store.ts\n│ ├── utils // Helpers and utils (e.g. type definitions) used by multiple components\n│ └── views // Pages of the application\n│ └── Home // The home page of the application\n│ ├── Home.tsx\n│ └── Home.module.css\n├── src\n├── .eslintrc.cjs // Rules for ESLint\n└── App.tsx // Entry point to the application Creating a Production Build By default, Docker compose is configured to run the development server for the React application via npm start. To instead create the build files to serve for production, run npm run build. Reference the Create React App documentation for more information on creating a production build. Redux Usage The project uses Redux architecture primarily for managing the state of live and historical users in addition to more trivial matters like application loading and alert states. For an in-depth overview of Redux, review the documentation on the Redux website. Introducing Redux as it relates to this project, the initial application state seen below is defined and managed in the reducer (reducer.ts). Actions (actions.ts) update this state through various workflows of the application. Note that we use null within the application state to indicate intentional absence of a value. const initialUserCount: LiveCounts = { sessions: 0, countries: new Set(), cities: new Set(),\n}; const initialState: AppState = { liveUsers: [], historicalUsers: null, historicalCounts: null, liveCounts: initialUserCount, newUser: null, loading: false, alert: null, heatmapEnabled: false,\n};",
          breadcrumbs: "Frontend » Frontend",
          id: "0",
          title: "Frontend",
        },
        1: {
          body: 'The backend for the project is written in Go and performs two functions: Serves REST APIs for retrieving user information and stats Acts as a listener to Wonderville\'s WebSocket and subsequently records new users and updates stats in the MongoDB database. The socket listener is decoupled from the REST API service through a goroutine, meaning any interruptions to the REST service will not affect the recording of new data from the socket server. The socket listener will also automatically retry connecting every 60 seconds to the WebSocket server upon disconnection. The application logs are outputted to the rest_golang/logs.txt file. Notable packages used in the backend are: chi for the REST API service recws for WebSocket connections mongo-go-driver for MongoDB connections Project Structure ├── rest_golang\n│ ├── db // (Package) Retrieving and updating data from MongoDB\n│ ├── logger // (Package) Application logger\n│ ├── model // (Package) Type definitions for API and internal use\n│ ├── server // (Package) REST API service (handler and router)\n│ ├── socket // (Package) WebSocket listener\n│ ├── logs.txt // Application logs\n│ └── main.go // Entry point to the application APIs v1/api/users Methods : GET Description : Gets historical users and the total counts of users, uniques cities and unique countries. Parameters : Parameter Required? Type Description Example startDate Y String The start of the date range in ISO string format. 2022-10-04T14:48:00.000Z maxUsers Y Integer The maximum number of users to return. 100 mapBounds Y Object The latitude and longitude boundaries used to search for users. Latitude and longitude values are integers. { lat: { lower: -49.68, upper: 84.71}, lng: { lower: -175.25, upper: -52.74} filter N Object The activity filter value. Valid filter categories are Category or ActivityType . If Category is chosen, you can specify Game , Video , Activity or Story as the filter type. { filterCategory: "Category", filterType: "Game"} Responses Success : 200 OK Content : { "users": [ { "type": "wondervilleAsset", "payload": { "ip": "172.219.38.100", "url": "tree-cookies", "location": { "country_name": "Canada", "region_name": "Alberta", "city": "Leduc", "longitude": -113.5587, "latitude": 53.2659 }, "asset": { "name": "Tree Cookies", "url": "tree-cookies", "id": 32, "uuid": "", "type": "Game", "imageUrl": "https://wonderville.org/wvAssets/Uploads/Tree-Cookies-Thumb.png", "active": true }, "rank": 1 }, "date": "2022-12-04T18:03:43.181Z" } ], "counts": { "sessions": 1, "cities": 1, "countries": 1 }\n} v1/api/activity-stats Methods : GET Description : Gets activity hit counts in descending order by the number of hits. Parameters : Parameter Required? Type Description Example startDate N String The start of the date range in ISO string format. If this is not included, all-time hit counts will be returned. 2022-10-04T14:48:00.000Z top N Integer The top number activities to return. 10 Responses Success : 200 OK Content : { "stats": [ { "hits": 81, "name": "Save The World", "type": "Game", "url": "", "imageUrl": "https://wonderville.org/wvAssets/Uploads/Save-the-World-Thumb.png", "rank": 1 }, { "hits": 24, "name": "Tree Cookies", "type": "Game", "url": "", "imageUrl": "https://wonderville.org/wvAssets/Uploads/Tree-Cookies-Thumb.png", "rank": 2 } ]\n} v1/api/activity-filter-options Methods : GET Description : Gets a unique list of all activity categories and activity names recorded over time. Parameters : None Responses Success : 200 OK Content : { "options": [ { "name": "Game", "type": "Category" }, { "name": "Video", "type": "Category" }, { "name": "Airborne Experiment", "type": "Game" }, { "name": "Waste No More", "type": "Video" } ]\n}',
          breadcrumbs: "Backend & APIs » Backend & APIs",
          id: "1",
          title: "Backend & APIs",
        },
        2: {
          body: 'MongoDB is used as the document database for the project. The wondervilleActivityBoard database holds two collections, users and activityStats. MongoDB & Docker The MongoDB server for the project is containerized with Docker and listens on port 27017. The wondervilleActivityBoard database and root user credentials are defined in docker-compose.yml. Docker volumes are used for persisting data from the database and linking the start-up script (mongo-init.js) to the container. The start-up script creates the necessary collections and indexes. Collections users The users collection is used to store messages (i.e. the users) as they are delivered from the Wonderville WebSocket. These messages can be of Wonderville Asset or Wonderville Session type. Wonderville Assets contain an asset key in the payload with details about the game, activity, story or video that the user accessed, whereas Wonderville Sessions only detail the location of the user. Examples of the stored documents for both message types are shown below. Wonderville Asset: { "type":"wondervilleAsset" "date":{ "$date":"2022-12-04T18:03:43.181Z" // The date this entry was recorded } "payload":{ "ip": "172.219.38.100", "url": "tree-cookies", "location": { "country_name": "Canada", "region_name": "Alberta", "city": "Leduc", "longitude": -113.5586, "latitude": 53.2658 }, "asset": { "name": "Tree Cookies", "url": "tree-cookies", "id": 32, "uuid": "", "type": "Game", "imageUrl": "https://wonderville.org/wvAssets/Uploads/Tree-Cookies-Thumb.png", "active": true }, "rank":1 // The rank as received by the Wonderville Websocket }\n} Wonderville Session: { "type": "wondervilleSession", "date": { "$date": "2022-02-04T09:15:54.386Z" }, "payload":{ "location":{ "country_name": "United States", "region_name": "Michigan", "city": "Monroe", "longitude": -83.476, "latitude": 41.9053 } }\n} activityStats The activityStats collections stores information of the all-time hit counts for each game, activity, story or video. Any time a new message is received from the WebSocket, a record is either created or updated. Note that Wonderville Session stats are not included in this collection since they do not have a corresponding asset. { "name": "Solar Energy Defenders", "url": "solarenergydefenders", "type": "Game", "imageUrl": "https://wonderville.org/wvAssets/Uploads/Solar-Energy-Defenders-Thumb.png", "hits": 24749\n}',
          breadcrumbs: "Database » Database",
          id: "2",
          title: "Database",
        },
        3: {
          body: "This section is geared towards developers who want to contribute or deploy this project. Docker The project's three services are containerized with Docker compose. The configuration for the services is specified in docker-compose.yml which uses environment variables from the .env file to set certain parameters. To spin up all three services, run the following command from the root of the project: $ docker compose --env-file .env up -d Environment Variables It is necessary to set multiple environment variables so that the services can start successfully. This also includes creating and setting the Google Maps Javascript API key which is used by the frontend. An overview of the necessary environment variables is provided below. For convenience during development, these were set in a single .env file in the root of the project, but they can alternatively be split up between each service. // React\nCHOKIDAR_USEPOLLING=true\nREACT_APP_GOOGLE_MAPS_API_KEY // The Google Maps Javascript API key\nREACT_APP_MINDFUEL_WEBSOCKET // The WebSocket server address (can either production or mock development server)\nREACT_APP_GOLANG_API // The backend API path // Go\nGO_MINDFUEL_WEBSOCKET // The WebSocket server address (can either production or mock development server) // Mongo (used by Docker and Go)\nMONGODB_DB_NAME // The MongoDB database name\nMONGODB_USERNAME // The username for the Mongo DB root user\nMONGODB_PWD // The password for the Mongo DB root user\nMONGODB_URI // The Mongo DB connection string (requires the root user credentials) Mock Services Two services were created to assist with the development process by providing a source of mock data and a development WebSocket server. mock_data The mock_data service seeds your MongoDB instance with a sample set of Wonderville asset data (found in the raw_data directory) and randomized stats using the faker and mongo-seeding packages. This is achieved by using JS scripts nested in the data directory with the same name as the collection to populate (e.g. data/users/users.js). Be warned that running the seeder will drop your existing database. To run the service, ensure the MONGODB_URI and MONGODB_DB_NAME environment variables are exported and then in the mock_data directory run: $ npm install\n$ node index.js Your database collections should then automatically be populated with a 4 month range of sample data including 1 month in the future to avoid having to reseed as frequently. The seeding scripts also provide the option of saving the sample data to a file; to do so uncomment the corresponding block of code at the end of the scripts. mock_server The mock_server service provides a simple insecure WebSocket server which can be used in place of the production Wonderville server during development. Once connected, it will emit a user from the sample_data.json file every 3 seconds. To use the service, uncomment the development server variables in the .env file (i.e. the variables referencing ws://localhost:3210) and restart the Docker containers. To start the server, in the mock_server directory run: $ npm install\n$ node index.js The server will start on port 3210.",
          breadcrumbs: "Development » Development",
          id: "3",
          title: "Development",
        },
      },
      length: 4,
      save: true,
    },
    fields: ["title", "body", "breadcrumbs"],
    index: {
      body: {
        root: {
          0: {
            2: { df: 1, docs: { 2: { tf: 1.0 } } },
            4: {
              df: 0,
              docs: {},
              t: {
                0: {
                  9: {
                    ":": {
                      1: {
                        5: {
                          ":": {
                            5: {
                              4: {
                                ".": {
                                  3: {
                                    8: {
                                      6: {
                                        df: 0,
                                        docs: {},
                                        z: { df: 1, docs: { 2: { tf: 1.0 } } },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                1: {
                  4: {
                    ":": {
                      4: {
                        8: {
                          ":": {
                            0: {
                              0: {
                                ".": {
                                  0: {
                                    0: {
                                      0: {
                                        df: 0,
                                        docs: {},
                                        z: {
                                          df: 1,
                                          docs: {
                                            1: { tf: 1.4142135623730951 },
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  8: {
                    ":": {
                      0: {
                        3: {
                          ":": {
                            4: {
                              3: {
                                ".": {
                                  1: {
                                    8: {
                                      1: {
                                        df: 0,
                                        docs: {},
                                        z: {
                                          df: 2,
                                          docs: {
                                            1: { tf: 1.0 },
                                            2: { tf: 1.0 },
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
            },
            df: 1,
            docs: { 0: { tf: 1.0 } },
          },
          1: {
            0: {
              0: { df: 1, docs: { 1: { tf: 1.0 } } },
              df: 1,
              docs: { 1: { tf: 1.7320508075688772 } },
            },
            1: {
              3: {
                ".": {
                  5: {
                    5: {
                      8: {
                        6: { df: 1, docs: { 2: { tf: 1.0 } } },
                        7: { df: 1, docs: { 1: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            2: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            7: {
              2: {
                ".": {
                  2: {
                    1: {
                      9: {
                        ".": {
                          3: {
                            8: {
                              ".": {
                                1: {
                                  0: {
                                    0: {
                                      df: 2,
                                      docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              5: {
                ".": {
                  2: {
                    5: { df: 1, docs: { 1: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 2,
            docs: { 1: { tf: 2.23606797749979 }, 3: { tf: 1.0 } },
          },
          2: {
            0: {
              0: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
              2: {
                2: {
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 1.0 } },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            4: {
              7: {
                4: { 9: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 1,
              docs: { 1: { tf: 1.0 } },
            },
            7: {
              0: {
                1: { 7: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 1,
            docs: { 1: { tf: 1.0 } },
          },
          3: {
            2: {
              1: { 0: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              df: 2,
              docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } },
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
          },
          4: {
            1: {
              ".": {
                9: {
                  0: {
                    5: {
                      3: { df: 1, docs: { 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            9: {
              ".": {
                6: { 8: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
          },
          5: {
            2: {
              ".": {
                7: { 4: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            3: {
              ".": {
                2: {
                  6: {
                    5: {
                      8: { df: 1, docs: { 2: { tf: 1.0 } } },
                      9: { df: 1, docs: { 1: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
          },
          6: { 0: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
          8: {
            1: { df: 1, docs: { 1: { tf: 1.0 } } },
            3: {
              ".": {
                4: {
                  7: {
                    6: { df: 1, docs: { 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            4: {
              ".": {
                7: { 1: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
          },
          a: {
            b: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    c: { df: 1, docs: { 0: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    s: { df: 1, docs: { 2: { tf: 1.0 } } },
                  },
                },
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              h: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    v: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
              t: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 1,
                      docs: { 0: { tf: 1.4142135623730951 } },
                      s: {
                        ".": {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  v: {
                    df: 2,
                    docs: {
                      1: { tf: 2.6457513110645907 },
                      2: { tf: 1.7320508075688772 },
                    },
                    i: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          df: 0,
                          docs: {},
                          s: {
                            df: 0,
                            docs: {},
                            t: {
                              a: {
                                df: 0,
                                docs: {},
                                t: {
                                  df: 1,
                                  docs: { 2: { tf: 1.7320508075688772 } },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          t: {
                            df: 0,
                            docs: {},
                            y: {
                              df: 0,
                              docs: {},
                              p: { df: 1, docs: { 1: { tf: 1.0 } } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            d: {
              d: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            f: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                b: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            l: {
              b: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    t: {
                      a: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
              },
              o: {
                df: 0,
                docs: {},
                n: { df: 0, docs: {}, g: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: {
                df: 3,
                docs: {
                  0: { tf: 2.449489742783178 },
                  1: { tf: 2.6457513110645907 },
                  3: { tf: 1.7320508075688772 },
                },
              },
              p: {
                ".": {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      x: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
                df: 1,
                docs: { 0: { tf: 1.0 } },
                l: {
                  df: 0,
                  docs: {},
                  i: {
                    c: {
                      df: 2,
                      docs: { 0: { tf: 2.8284271247461903 }, 1: { tf: 2.0 } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  t: {
                    a: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            r: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      e: {
                        c: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            u: {
                              df: 0,
                              docs: {},
                              r: { df: 1, docs: { 0: { tf: 1.0 } } },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            s: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 4,
                    docs: {
                      0: { tf: 1.4142135623730951 },
                      1: { tf: 1.0 },
                      2: { tf: 2.449489742783178 },
                      3: { tf: 1.0 },
                    },
                  },
                },
                i: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  m: {
                    a: {
                      df: 0,
                      docs: {},
                      t: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            v: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                i: { d: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
          },
          b: {
            a: {
              c: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      d: {
                        df: 3,
                        docs: {
                          0: { tf: 1.7320508075688772 },
                          1: { tf: 1.7320508075688772 },
                          3: { tf: 1.0 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  w: {
                    df: 3,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                  },
                },
              },
              t: {
                df: 0,
                docs: {},
                w: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              n: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
            },
            l: {
              df: 0,
              docs: {},
              o: {
                c: { df: 0, docs: {}, k: { df: 1, docs: { 3: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            o: {
              df: 0,
              docs: {},
              t: { df: 0, docs: {}, h: { df: 1, docs: { 2: { tf: 1.0 } } } },
              u: {
                df: 0,
                docs: {},
                n: {
                  d: {
                    a: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 0: { tf: 2.0 } } }, df: 0, docs: {} },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
              n: {
                a: {
                  d: {
                    a: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: { df: 1, docs: { 1: { tf: 2.6457513110645907 } } },
                      },
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              n: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  r: {
                    a: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            h: {
              a: {
                df: 0,
                docs: {},
                r: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              i: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                l: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  i: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        r: {
                          _: {
                            df: 0,
                            docs: {},
                            u: {
                              df: 0,
                              docs: {},
                              s: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  p: {
                                    df: 0,
                                    docs: {},
                                    o: {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        l: {
                                          df: 0,
                                          docs: {},
                                          i: {
                                            df: 0,
                                            docs: {},
                                            n: {
                                              df: 0,
                                              docs: {},
                                              g: {
                                                "=": {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 0,
                                                    docs: {},
                                                    r: {
                                                      df: 0,
                                                      docs: {},
                                                      u: {
                                                        df: 1,
                                                        docs: {
                                                          3: { tf: 1.0 },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.7320508075688772 },
                    2: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            o: {
              d: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: {
                          2: { tf: 2.449489742783178 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              m: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    n: {
                      d: { df: 1, docs: { 3: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 2.449489742783178 } } },
                    s: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 3: { tf: 1.4142135623730951 } },
                      e: {
                        ".": {
                          df: 0,
                          docs: {},
                          y: {
                            df: 0,
                            docs: {},
                            m: {
                              df: 0,
                              docs: {},
                              l: {
                                df: 2,
                                docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              n: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        r: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 3,
                        docs: {
                          0: { tf: 1.0 },
                          1: { tf: 1.7320508075688772 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    q: {
                      df: 0,
                      docs: {},
                      u: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 2,
                        docs: { 2: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 2,
                            docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                          },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                    },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    i: {
                      b: {
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 3: { tf: 1.0 } } },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      i: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 2,
                    docs: { 1: { tf: 2.449489742783178 }, 2: { tf: 2.0 } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: {
                          d: { df: 1, docs: { 0: { tf: 1.0 } } },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                    s: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          n: {
                            d: {
                              df: 2,
                              docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 1: { tf: 2.0 }, 2: { tf: 1.0 } },
                    r: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 1: { tf: 1.4142135623730951 } },
                      },
                      y: {
                        _: {
                          df: 0,
                          docs: {},
                          n: {
                            a: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 2,
                                docs: {
                                  1: { tf: 1.0 },
                                  2: { tf: 1.4142135623730951 },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 3,
                    docs: {
                      0: { tf: 2.0 },
                      2: { tf: 1.4142135623730951 },
                      3: { tf: 1.4142135623730951 },
                    },
                  },
                },
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        i: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            s: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
            u: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    m: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
          },
          d: {
            a: {
              df: 0,
              docs: {},
              t: {
                a: {
                  "/": {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 0,
                            docs: {},
                            s: {
                              "/": {
                                df: 0,
                                docs: {},
                                u: {
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    e: {
                                      df: 0,
                                      docs: {},
                                      r: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          ".": {
                                            df: 0,
                                            docs: {},
                                            j: {
                                              df: 1,
                                              docs: { 3: { tf: 1.0 } },
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                        },
                      },
                    },
                  },
                  b: {
                    a: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 3,
                        docs: {
                          1: { tf: 1.0 },
                          2: { tf: 2.23606797749979 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 4,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    2: { tf: 1.0 },
                    3: { tf: 2.23606797749979 },
                  },
                },
                df: 0,
                docs: {},
                e: {
                  '"': {
                    ":": {
                      '"': {
                        2: {
                          0: {
                            2: {
                              2: { df: 1, docs: { 2: { tf: 1.0 } } },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 2.0 } },
                },
              },
            },
            b: {
              df: 2,
              docs: { 1: { tf: 1.0 }, 3: { tf: 1.7320508075688772 } },
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
            e: {
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              f: {
                a: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    d: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                    df: 0,
                    docs: {},
                  },
                },
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 2,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              l: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, v: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
              p: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    y: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                t: { df: 0, docs: {}, h: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              s: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      d: { df: 1, docs: { 1: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 2.23606797749979 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 2,
                        docs: { 0: { tf: 1.4142135623730951 }, 3: { tf: 3.0 } },
                      },
                    },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          i: { df: 1, docs: { 3: { tf: 2.0 } } },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              s: {
                c: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            df: 0,
                            docs: {},
                            t: { df: 1, docs: { 1: { tf: 1.0 } } },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  l: {
                    a: {
                      df: 0,
                      docs: {},
                      y: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        2: { tf: 2.0 },
                        3: { tf: 2.449489742783178 },
                      },
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        t: {
                          df: 2,
                          docs: {
                            0: { tf: 1.4142135623730951 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
              o: { df: 0, docs: {}, p: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            u: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
              },
            },
          },
          df: 0,
          docs: {},
          e: {
            ".": {
              df: 0,
              docs: {},
              g: {
                df: 2,
                docs: { 0: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
              },
            },
            a: {
              c: {
                df: 0,
                docs: {},
                h: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            m: {
              b: {
                df: 1,
                docs: { 0: { tf: 1.0 } },
                e: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              df: 0,
              docs: {},
              i: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            n: {
              d: { df: 1, docs: { 3: { tf: 1.0 } } },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              t: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 3,
                    docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                  },
                },
              },
              v: {
                df: 1,
                docs: { 3: { tf: 2.23606797749979 } },
                i: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 3: { tf: 2.23606797749979 } },
                      },
                    },
                  },
                },
              },
            },
            s: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 1,
                      docs: { 0: { tf: 1.0 } },
                      r: {
                        c: {
                          ".": {
                            c: {
                              df: 0,
                              docs: {},
                              j: { df: 1, docs: { 0: { tf: 1.0 } } },
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            x: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 2,
                      docs: { 1: { tf: 1.4142135623730951 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
          },
          f: {
            a: {
              df: 0,
              docs: {},
              k: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                s: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                c: { df: 0, docs: {}, h: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            i: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    1: { tf: 1.0 },
                    3: { tf: 2.449489742783178 },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      c: {
                        a: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              g: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    i: { df: 1, docs: { 1: { tf: 1.0 } } },
                                  },
                                },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 1: { tf: 2.23606797749979 } },
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          df: 0,
                          docs: {},
                          p: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    w: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              u: {
                df: 0,
                docs: {},
                n: { d: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            r: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    w: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          k: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                q: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        d: {
                          _: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              e: {
                                a: {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 2,
                          docs: { 0: { tf: 2.23606797749979 }, 3: { tf: 1.0 } },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              n: {
                c: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              t: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
            },
          },
          g: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 1: { tf: 2.6457513110645907 }, 2: { tf: 2.0 } },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
            },
            o: {
              _: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    n: {
                      d: {
                        df: 0,
                        docs: {},
                        f: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              l: {
                                _: {
                                  df: 0,
                                  docs: {},
                                  w: {
                                    df: 0,
                                    docs: {},
                                    e: {
                                      b: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          df: 0,
                                          docs: {},
                                          o: {
                                            c: {
                                              df: 0,
                                              docs: {},
                                              k: {
                                                df: 0,
                                                docs: {},
                                                e: {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 1,
                                                    docs: { 3: { tf: 1.0 } },
                                                  },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 3,
              docs: {
                0: { tf: 1.4142135623730951 },
                1: { tf: 1.4142135623730951 },
                3: { tf: 1.4142135623730951 },
              },
              o: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 2,
                    docs: {
                      0: { tf: 1.7320508075688772 },
                      3: { tf: 1.4142135623730951 },
                    },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
            },
          },
          h: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              v: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  m: {
                    a: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          n: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              r: { df: 0, docs: {}, e: { df: 1, docs: { 0: { tf: 1.0 } } } },
            },
            i: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 2,
                      docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                      i: {
                        c: {
                          a: {
                            df: 0,
                            docs: {},
                            l: {
                              c: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  u: {
                                    df: 0,
                                    docs: {},
                                    n: {
                                      df: 0,
                                      docs: {},
                                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                              u: {
                                df: 0,
                                docs: {},
                                s: { df: 1, docs: { 0: { tf: 1.0 } } },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              t: {
                df: 2,
                docs: {
                  1: { tf: 2.23606797749979 },
                  2: { tf: 1.4142135623730951 },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: { d: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
              m: {
                df: 0,
                docs: {},
                e: {
                  ".": {
                    df: 0,
                    docs: {},
                    m: {
                      df: 0,
                      docs: {},
                      o: {
                        d: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              e: {
                                ".": {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      s: { df: 1, docs: { 0: { tf: 1.0 } } },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                    t: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        x: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                      },
                    },
                  },
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                  s: {
                    ".": {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            t: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  s: {
                    ":": {
                      "/": {
                        "/": {
                          df: 0,
                          docs: {},
                          w: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                d: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    r: {
                                      df: 0,
                                      docs: {},
                                      v: {
                                        df: 0,
                                        docs: {},
                                        i: {
                                          df: 0,
                                          docs: {},
                                          l: {
                                            df: 0,
                                            docs: {},
                                            l: {
                                              df: 0,
                                              docs: {},
                                              e: {
                                                ".": {
                                                  df: 0,
                                                  docs: {},
                                                  o: {
                                                    df: 0,
                                                    docs: {},
                                                    r: {
                                                      df: 0,
                                                      docs: {},
                                                      g: {
                                                        "/": {
                                                          df: 0,
                                                          docs: {},
                                                          w: {
                                                            df: 0,
                                                            docs: {},
                                                            v: {
                                                              a: {
                                                                df: 0,
                                                                docs: {},
                                                                s: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  s: {
                                                                    df: 0,
                                                                    docs: {},
                                                                    e: {
                                                                      df: 0,
                                                                      docs: {},
                                                                      t: {
                                                                        df: 0,
                                                                        docs: {},
                                                                        s: {
                                                                          "/": {
                                                                            df: 0,
                                                                            docs: {},
                                                                            u: {
                                                                              df: 0,
                                                                              docs: {},
                                                                              p: {
                                                                                df: 0,
                                                                                docs: {},
                                                                                l: {
                                                                                  df: 0,
                                                                                  docs: {},
                                                                                  o: {
                                                                                    a: {
                                                                                      d: {
                                                                                        df: 0,
                                                                                        docs: {},
                                                                                        s: {
                                                                                          "/": {
                                                                                            df: 0,
                                                                                            docs: {},
                                                                                            s: {
                                                                                              a: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                v: {
                                                                                                  df: 1,
                                                                                                  docs: {
                                                                                                    1: {
                                                                                                      tf: 1.0,
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                              o: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                l: {
                                                                                                  a: {
                                                                                                    df: 0,
                                                                                                    docs: {},
                                                                                                    r: {
                                                                                                      df: 1,
                                                                                                      docs: {
                                                                                                        2: {
                                                                                                          tf: 1.0,
                                                                                                        },
                                                                                                      },
                                                                                                    },
                                                                                                  },
                                                                                                  df: 0,
                                                                                                  docs: {},
                                                                                                },
                                                                                              },
                                                                                            },
                                                                                            t: {
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                              r: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                e: {
                                                                                                  df: 2,
                                                                                                  docs: {
                                                                                                    1: {
                                                                                                      tf: 1.4142135623730951,
                                                                                                    },
                                                                                                    2: {
                                                                                                      tf: 1.0,
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                            },
                                                                                          },
                                                                                          df: 0,
                                                                                          docs: {},
                                                                                        },
                                                                                      },
                                                                                      df: 0,
                                                                                      docs: {},
                                                                                    },
                                                                                    df: 0,
                                                                                    docs: {},
                                                                                  },
                                                                                },
                                                                              },
                                                                            },
                                                                          },
                                                                          df: 0,
                                                                          docs: {},
                                                                        },
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                              df: 0,
                                                              docs: {},
                                                            },
                                                          },
                                                        },
                                                        df: 0,
                                                        docs: {},
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          i: {
            ".": { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
            d: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            df: 0,
            docs: {},
            m: {
              a: {
                df: 0,
                docs: {},
                g: {
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        l: {
                          df: 2,
                          docs: {
                            1: { tf: 1.7320508075688772 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            n: {
              c: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  u: {
                    d: {
                      df: 3,
                      docs: {
                        1: { tf: 1.0 },
                        2: { tf: 1.0 },
                        3: { tf: 1.4142135623730951 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  x: {
                    ".": {
                      df: 0,
                      docs: {},
                      j: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    },
                    df: 1,
                    docs: { 2: { tf: 1.0 } },
                  },
                },
                i: { c: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    m: {
                      df: 3,
                      docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              i: {
                df: 0,
                docs: {},
                t: {
                  ".": {
                    df: 0,
                    docs: {},
                    j: { df: 1, docs: { 2: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                  i: {
                    a: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                        u: {
                          df: 0,
                          docs: {},
                          s: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              r: {
                                c: {
                                  df: 0,
                                  docs: {},
                                  o: {
                                    df: 0,
                                    docs: {},
                                    u: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        t: {
                                          df: 1,
                                          docs: {
                                            0: { tf: 1.4142135623730951 },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    n: {
                      c: { df: 1, docs: { 3: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  df: 0,
                  docs: {},
                  e: {
                    a: {
                      d: { df: 1, docs: { 0: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  g: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  n: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    r: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        p: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
                r: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      df: 0,
                      docs: {},
                      u: {
                        c: { df: 1, docs: { 0: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            p: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            s: {
              df: 0,
              docs: {},
              o: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
            },
          },
          j: {
            a: {
              df: 0,
              docs: {},
              v: {
                a: {
                  df: 0,
                  docs: {},
                  s: {
                    c: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            t: {
                              df: 1,
                              docs: { 3: { tf: 1.4142135623730951 } },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            s: { df: 1, docs: { 3: { tf: 1.0 } } },
          },
          k: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              y: {
                df: 3,
                docs: {
                  0: { tf: 1.0 },
                  2: { tf: 1.0 },
                  3: { tf: 1.4142135623730951 },
                },
              },
            },
          },
          l: {
            a: {
              df: 0,
              docs: {},
              t: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    u: {
                      d: {
                        df: 2,
                        docs: {
                          1: { tf: 1.7320508075688772 },
                          2: { tf: 1.4142135623730951 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              d: {
                df: 0,
                docs: {},
                u: {
                  c: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
            },
            i: {
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, k: { df: 1, docs: { 2: { tf: 1.0 } } } },
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 1,
                  docs: { 1: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 3,
                      docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                      },
                    },
                  },
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                  u: {
                    df: 0,
                    docs: {},
                    s: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            n: { df: 0, docs: {}, g: { df: 1, docs: { 1: { tf: 1.0 } } } },
            o: {
              a: {
                d: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                df: 0,
                docs: {},
              },
              c: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 1: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                df: 1,
                docs: { 1: { tf: 1.4142135623730951 } },
                g: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                },
                i: { c: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
                s: {
                  ".": {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      x: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      u: {
                        d: {
                          df: 2,
                          docs: {
                            1: { tf: 1.7320508075688772 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              w: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                },
              },
            },
          },
          m: {
            a: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                n: {
                  ".": {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      o: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              n: {
                a: {
                  df: 0,
                  docs: {},
                  g: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
                },
                df: 0,
                docs: {},
              },
              p: {
                b: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      n: {
                        d: { df: 1, docs: { 1: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
                df: 2,
                docs: { 0: { tf: 2.0 }, 3: { tf: 1.4142135623730951 } },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              x: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      m: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                u: { df: 0, docs: {}, s: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
              d: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                s: {
                  a: {
                    df: 0,
                    docs: {},
                    g: { df: 1, docs: { 2: { tf: 2.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  o: {
                    d: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    g: {
                      a: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 2: { tf: 1.0 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        l: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                k: {
                  _: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        t: {
                          a: { df: 1, docs: { 3: { tf: 1.7320508075688772 } } },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          v: { df: 1, docs: { 3: { tf: 1.7320508075688772 } } },
                        },
                      },
                    },
                  },
                  df: 1,
                  docs: { 3: { tf: 2.0 } },
                },
              },
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      b: {
                        _: {
                          d: {
                            b: {
                              _: {
                                df: 0,
                                docs: {},
                                n: {
                                  a: {
                                    df: 0,
                                    docs: {},
                                    m: {
                                      df: 1,
                                      docs: { 3: { tf: 1.4142135623730951 } },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            w: {
                              d: { df: 1, docs: { 3: { tf: 1.0 } } },
                              df: 0,
                              docs: {},
                            },
                          },
                          u: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              i: {
                                df: 1,
                                docs: { 3: { tf: 1.4142135623730951 } },
                              },
                            },
                            s: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                r: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    a: {
                                      df: 0,
                                      docs: {},
                                      m: { df: 1, docs: { 3: { tf: 1.0 } } },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                          },
                        },
                        df: 3,
                        docs: {
                          1: { tf: 1.7320508075688772 },
                          2: { tf: 1.7320508075688772 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 3,
                    docs: {
                      1: { tf: 1.0 },
                      2: { tf: 1.0 },
                      3: { tf: 2.23606797749979 },
                    },
                  },
                },
                r: { df: 0, docs: {}, o: { df: 1, docs: { 2: { tf: 1.0 } } } },
                t: {
                  df: 0,
                  docs: {},
                  h: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              r: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 2,
                        docs: { 0: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                      },
                    },
                  },
                },
              },
            },
          },
          n: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    1: { tf: 2.8284271247461903 },
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            df: 1,
            docs: { 1: { tf: 1.7320508075688772 } },
            e: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    s: {
                      a: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          i: {
                            df: 3,
                            docs: {
                              0: { tf: 1.0 },
                              2: { tf: 1.0 },
                              3: { tf: 1.4142135623730951 },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              s: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              w: {
                df: 3,
                docs: {
                  0: { tf: 1.4142135623730951 },
                  1: { tf: 1.4142135623730951 },
                  2: { tf: 1.0 },
                },
                u: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
              },
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, e: { df: 1, docs: { 1: { tf: 1.0 } } } },
              t: {
                a: {
                  b: {
                    df: 0,
                    docs: {},
                    l: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
                e: { df: 2, docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              m: {
                df: 2,
                docs: {
                  0: { tf: 1.4142135623730951 },
                  3: { tf: 1.4142135623730951 },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 2.23606797749979 } } },
              },
              m: {
                b: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
          },
          o: {
            b: {
              df: 0,
              docs: {},
              j: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
            n: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
            p: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 2,
                      docs: { 1: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    d: { df: 1, docs: { 0: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            v: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 1,
                  docs: { 1: { tf: 1.0 } },
                  v: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        w: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
            },
          },
          p: {
            a: {
              c: {
                df: 0,
                docs: {},
                k: {
                  a: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 2.449489742783178 },
                        3: { tf: 1.0 },
                      },
                      e: {
                        ".": {
                          df: 0,
                          docs: {},
                          j: {
                            df: 0,
                            docs: {},
                            s: {
                              df: 0,
                              docs: {},
                              o: {
                                df: 0,
                                docs: {},
                                n: { df: 1, docs: { 0: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
              },
              r: {
                a: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: { 1: { tf: 2.23606797749979 }, 3: { tf: 1.0 } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  w: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: {
                        d: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              t: { df: 0, docs: {}, h: { df: 1, docs: { 3: { tf: 1.0 } } } },
              y: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    a: {
                      d: {
                        df: 2,
                        docs: { 1: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      m: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                    },
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 2: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            l: {
              a: {
                c: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            o: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                },
              },
              p: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              r: {
                df: 0,
                docs: {},
                t: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 0,
                        docs: {},
                        l: {
                          df: 0,
                          docs: {},
                          i: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              o: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
                d: {
                  df: 0,
                  docs: {},
                  u: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: {
                          0: { tf: 1.7320508075688772 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
                j: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        "'": { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 4,
                        docs: {
                          0: { tf: 2.23606797749979 },
                          1: { tf: 1.4142135623730951 },
                          2: { tf: 1.4142135623730951 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                p: { df: 1, docs: { 0: { tf: 1.0 } } },
                v: {
                  df: 0,
                  docs: {},
                  i: {
                    d: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 2.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          r: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    m: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
                g: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                  },
                },
                k: {
                  '"': {
                    ":": {
                      1: { df: 1, docs: { 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 1.0 } },
                },
              },
              w: {
                _: {
                  d: {
                    a: {
                      df: 0,
                      docs: {},
                      t: {
                        a: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                c: {
                  df: 0,
                  docs: {},
                  t: {
                    _: {
                      a: {
                        df: 0,
                        docs: {},
                        p: {
                          df: 0,
                          docs: {},
                          p: {
                            _: {
                              df: 0,
                              docs: {},
                              g: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  l: {
                                    a: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        g: {
                                          _: {
                                            a: {
                                              df: 0,
                                              docs: {},
                                              p: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  df: 1,
                                                  docs: { 3: { tf: 1.0 } },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  o: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        e: {
                                          _: {
                                            df: 0,
                                            docs: {},
                                            m: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                p: {
                                                  df: 0,
                                                  docs: {},
                                                  s: {
                                                    _: {
                                                      a: {
                                                        df: 0,
                                                        docs: {},
                                                        p: {
                                                          df: 0,
                                                          docs: {},
                                                          i: {
                                                            _: {
                                                              df: 0,
                                                              docs: {},
                                                              k: {
                                                                df: 0,
                                                                docs: {},
                                                                e: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  y: {
                                                                    df: 1,
                                                                    docs: {
                                                                      3: {
                                                                        tf: 1.0,
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                      df: 0,
                                                      docs: {},
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              m: {
                                df: 0,
                                docs: {},
                                i: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    d: {
                                      df: 0,
                                      docs: {},
                                      f: {
                                        df: 0,
                                        docs: {},
                                        u: {
                                          df: 0,
                                          docs: {},
                                          e: {
                                            df: 0,
                                            docs: {},
                                            l: {
                                              _: {
                                                df: 0,
                                                docs: {},
                                                w: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    b: {
                                                      df: 0,
                                                      docs: {},
                                                      s: {
                                                        df: 0,
                                                        docs: {},
                                                        o: {
                                                          c: {
                                                            df: 0,
                                                            docs: {},
                                                            k: {
                                                              df: 0,
                                                              docs: {},
                                                              e: {
                                                                df: 0,
                                                                docs: {},
                                                                t: {
                                                                  df: 1,
                                                                  docs: {
                                                                    3: {
                                                                      tf: 1.0,
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                          },
                                                          df: 0,
                                                          docs: {},
                                                        },
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 2,
                    docs: { 0: { tf: 3.3166247903554 }, 3: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    v: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                    },
                  },
                },
                h: {
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    d: {
                      df: 2,
                      docs: {
                        1: { tf: 1.7320508075688772 },
                        2: { tf: 1.4142135623730951 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                w: { df: 1, docs: { 1: { tf: 1.0 } } },
              },
              d: {
                df: 0,
                docs: {},
                u: {
                  c: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: {
                        ".": {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                  x: { df: 1, docs: { 0: { tf: 3.3166247903554 } } },
                },
              },
              df: 1,
              docs: { 0: { tf: 1.0 } },
              f: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        c: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              g: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      _: {
                        df: 0,
                        docs: {},
                        n: {
                          a: {
                            df: 0,
                            docs: {},
                            m: {
                              df: 2,
                              docs: {
                                1: { tf: 1.0 },
                                2: { tf: 1.4142135623730951 },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              l: {
                a: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              q: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 1.4142135623730951 },
                        3: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.0 } } },
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 1: { tf: 1.7320508075688772 } },
                      },
                    },
                  },
                },
                t: {
                  _: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        l: {
                          a: {
                            df: 0,
                            docs: {},
                            n: {
                              df: 0,
                              docs: {},
                              g: {
                                "/": {
                                  df: 0,
                                  docs: {},
                                  l: {
                                    df: 0,
                                    docs: {},
                                    o: {
                                      df: 0,
                                      docs: {},
                                      g: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          ".": {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              df: 0,
                                              docs: {},
                                              x: {
                                                df: 0,
                                                docs: {},
                                                t: {
                                                  df: 1,
                                                  docs: { 1: { tf: 1.0 } },
                                                },
                                              },
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 1,
                                docs: { 1: { tf: 1.0 } },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                  df: 1,
                  docs: { 1: { tf: 2.23606797749979 } },
                },
              },
              t: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 1,
                    docs: { 1: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      v: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    w: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                t: {
                  df: 2,
                  docs: { 2: { tf: 1.0 }, 3: { tf: 2.23606797749979 } },
                },
              },
              u: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, e: { df: 1, docs: { 0: { tf: 1.0 } } } },
              n: {
                df: 2,
                docs: {
                  0: { tf: 1.7320508075688772 },
                  3: { tf: 2.23606797749979 },
                },
              },
            },
          },
          s: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.0 } } },
                p: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 1,
                    docs: { 3: { tf: 1.7320508075688772 } },
                    e: {
                      _: {
                        d: {
                          a: {
                            df: 0,
                            docs: {},
                            t: {
                              a: {
                                ".": {
                                  df: 0,
                                  docs: {},
                                  j: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: { df: 1, docs: { 3: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                e: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
            },
            c: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 2,
                      docs: {
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 1.7320508075688772 },
                      },
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                r: {
                  c: {
                    df: 0,
                    docs: {},
                    h: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  n: {
                    d: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                d: {
                  df: 1,
                  docs: { 3: { tf: 1.7320508075688772 } },
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
                n: { df: 1, docs: { 0: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 2,
                  docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 4,
                      docs: {
                        0: { tf: 1.7320508075688772 },
                        1: { tf: 1.7320508075688772 },
                        2: { tf: 1.0 },
                        3: { tf: 3.1622776601683795 },
                      },
                    },
                  },
                  i: {
                    c: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 2.0 },
                        3: { tf: 3.3166247903554 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 3,
                        docs: {
                          0: { tf: 1.0 },
                          1: { tf: 1.0 },
                          2: { tf: 2.0 },
                        },
                      },
                    },
                  },
                },
              },
              t: {
                df: 2,
                docs: {
                  0: { tf: 1.7320508075688772 },
                  3: { tf: 2.23606797749979 },
                },
              },
            },
            h: {
              a: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
              },
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                w: { df: 0, docs: {}, n: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
            },
            i: {
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    a: {
                      df: 0,
                      docs: {},
                      v: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  l: {
                    a: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                p: { df: 0, docs: {}, l: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  l: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 } } },
                  },
                },
              },
              df: 0,
              docs: {},
              l: {
                a: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 1,
                    docs: { 2: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 0,
                            docs: {},
                            g: {
                              df: 0,
                              docs: {},
                              y: {
                                d: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    f: {
                                      df: 0,
                                      docs: {},
                                      e: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          d: {
                                            df: 1,
                                            docs: { 2: { tf: 1.0 } },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              u: {
                df: 0,
                docs: {},
                r: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            p: {
              df: 0,
              docs: {},
              e: {
                c: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    f: {
                      df: 0,
                      docs: {},
                      i: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              i: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
              l: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
            },
            r: {
              c: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              df: 0,
              docs: {},
            },
            t: {
              a: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  t: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 4,
                    docs: {
                      0: { tf: 1.0 },
                      1: { tf: 1.4142135623730951 },
                      2: { tf: 1.4142135623730951 },
                      3: { tf: 1.7320508075688772 },
                    },
                  },
                },
                t: {
                  df: 3,
                  docs: { 1: { tf: 2.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                  e: {
                    df: 2,
                    docs: { 0: { tf: 2.8284271247461903 }, 2: { tf: 1.0 } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    ".": {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 2,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                  },
                  i: {
                    df: 2,
                    docs: { 1: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    g: { df: 2, docs: { 1: { tf: 2.0 }, 3: { tf: 1.0 } } },
                  },
                },
                u: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        r: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              b: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    q: {
                      df: 0,
                      docs: {},
                      u: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              c: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 1,
                        docs: { 1: { tf: 1.7320508075688772 } },
                        f: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              l: {
                                df: 0,
                                docs: {},
                                i: { df: 1, docs: { 3: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
          },
          t: {
            df: 0,
            docs: {},
            h: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      h: {
                        df: 2,
                        docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                      },
                    },
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                m: {
                  b: {
                    ".": {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          g: {
                            df: 2,
                            docs: {
                              1: { tf: 1.7320508075688772 },
                              2: { tf: 1.4142135623730951 },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    2: { tf: 1.4142135623730951 },
                  },
                  l: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              p: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
              t: {
                a: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              w: {
                a: {
                  df: 0,
                  docs: {},
                  r: {
                    d: { df: 1, docs: { 3: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 1: { tf: 2.0 }, 2: { tf: 1.7320508075688772 } },
                },
              },
              i: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: {
                    a: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                e: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
              },
            },
            s: { df: 0, docs: {}, x: { df: 1, docs: { 0: { tf: 1.0 } } } },
            w: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              i: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              o: {
                df: 3,
                docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
              },
            },
            y: {
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  '"': {
                    ":": {
                      '"': {
                        df: 0,
                        docs: {},
                        w: {
                          df: 0,
                          docs: {},
                          o: {
                            df: 0,
                            docs: {},
                            n: {
                              d: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    v: {
                                      df: 0,
                                      docs: {},
                                      i: {
                                        df: 0,
                                        docs: {},
                                        l: {
                                          df: 0,
                                          docs: {},
                                          l: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                s: {
                                                  df: 0,
                                                  docs: {},
                                                  s: {
                                                    df: 0,
                                                    docs: {},
                                                    e: {
                                                      df: 0,
                                                      docs: {},
                                                      t: {
                                                        df: 1,
                                                        docs: {
                                                          2: { tf: 1.0 },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 3.4641016151377544 },
                    2: { tf: 2.23606797749979 },
                  },
                  s: {
                    c: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            t: { df: 1, docs: { 0: { tf: 1.0 } } },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            i: { df: 1, docs: { 0: { tf: 1.0 } } },
            n: {
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  m: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                q: {
                  df: 0,
                  docs: {},
                  u: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                },
                t: { df: 1, docs: { 2: { tf: 1.0 } } },
              },
            },
            p: {
              d: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 3,
                    docs: {
                      0: { tf: 1.0 },
                      1: { tf: 1.4142135623730951 },
                      2: { tf: 1.0 },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 2,
              docs: {
                2: { tf: 1.4142135623730951 },
                3: { tf: 1.7320508075688772 },
              },
              o: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              l: {
                df: 2,
                docs: { 1: { tf: 2.0 }, 2: { tf: 1.7320508075688772 } },
              },
            },
            s: {
              a: { df: 0, docs: {}, g: { df: 1, docs: { 0: { tf: 1.0 } } } },
              df: 4,
              docs: {
                0: { tf: 2.449489742783178 },
                1: { tf: 1.7320508075688772 },
                2: { tf: 1.7320508075688772 },
                3: { tf: 2.6457513110645907 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    1: { tf: 2.6457513110645907 },
                    2: { tf: 2.6457513110645907 },
                    3: { tf: 2.0 },
                  },
                  n: {
                    a: {
                      df: 0,
                      docs: {},
                      m: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            t: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
            },
            u: {
              df: 0,
              docs: {},
              i: {
                d: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                df: 0,
                docs: {},
              },
            },
          },
          v: {
            1: {
              "/": {
                a: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    i: {
                      "/": {
                        a: {
                          c: {
                            df: 0,
                            docs: {},
                            t: {
                              df: 1,
                              docs: { 1: { tf: 1.4142135623730951 } },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          s: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              6: { df: 1, docs: { 0: { tf: 1.0 } } },
              df: 0,
              docs: {},
            },
            a: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                i: { d: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                u: {
                  df: 2,
                  docs: { 0: { tf: 1.0 }, 1: { tf: 1.4142135623730951 } },
                },
              },
              r: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    b: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 3: { tf: 2.6457513110645907 } },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    u: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              c: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            i: {
              a: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 2,
                    docs: {
                      1: { tf: 1.7320508075688772 },
                      2: { tf: 1.4142135623730951 },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                w: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, m: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
            },
          },
          w: {
            a: {
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              r: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
              s: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            e: {
              b: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  o: {
                    c: {
                      df: 0,
                      docs: {},
                      k: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 4,
                            docs: {
                              0: { tf: 1.4142135623730951 },
                              1: { tf: 2.0 },
                              2: { tf: 1.7320508075688772 },
                              3: { tf: 2.0 },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
            },
            h: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    a: { df: 1, docs: { 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      v: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          l: {
                            df: 2,
                            docs: {
                              2: { tf: 3.0 },
                              3: { tf: 1.4142135623730951 },
                            },
                            l: {
                              df: 0,
                              docs: {},
                              e: {
                                "'": { df: 1, docs: { 1: { tf: 1.0 } } },
                                a: {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      df: 0,
                                      docs: {},
                                      i: {
                                        df: 0,
                                        docs: {},
                                        v: {
                                          df: 0,
                                          docs: {},
                                          i: {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              df: 0,
                                              docs: {},
                                              y: {
                                                b: {
                                                  df: 0,
                                                  docs: {},
                                                  o: {
                                                    a: {
                                                      df: 0,
                                                      docs: {},
                                                      r: {
                                                        d: {
                                                          df: 1,
                                                          docs: {
                                                            2: {
                                                              tf: 1.4142135623730951,
                                                            },
                                                          },
                                                        },
                                                        df: 0,
                                                        docs: {},
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      e: {
                                        df: 0,
                                        docs: {},
                                        t: { df: 1, docs: { 1: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                                s: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      s: { df: 1, docs: { 2: { tf: 1.0 } } },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              r: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        w: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                l: {
                  d: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  df: 0,
                  docs: {},
                },
              },
            },
            r: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            s: {
              ":": {
                "/": {
                  "/": {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      o: {
                        c: {
                          a: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              h: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      ":": {
                                        3: {
                                          2: {
                                            1: {
                                              0: {
                                                df: 1,
                                                docs: { 3: { tf: 1.0 } },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                        df: 0,
                                        docs: {},
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
          },
          y: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
        },
      },
      breadcrumbs: {
        root: {
          0: {
            2: { df: 1, docs: { 2: { tf: 1.0 } } },
            4: {
              df: 0,
              docs: {},
              t: {
                0: {
                  9: {
                    ":": {
                      1: {
                        5: {
                          ":": {
                            5: {
                              4: {
                                ".": {
                                  3: {
                                    8: {
                                      6: {
                                        df: 0,
                                        docs: {},
                                        z: { df: 1, docs: { 2: { tf: 1.0 } } },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                1: {
                  4: {
                    ":": {
                      4: {
                        8: {
                          ":": {
                            0: {
                              0: {
                                ".": {
                                  0: {
                                    0: {
                                      0: {
                                        df: 0,
                                        docs: {},
                                        z: {
                                          df: 1,
                                          docs: {
                                            1: { tf: 1.4142135623730951 },
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  8: {
                    ":": {
                      0: {
                        3: {
                          ":": {
                            4: {
                              3: {
                                ".": {
                                  1: {
                                    8: {
                                      1: {
                                        df: 0,
                                        docs: {},
                                        z: {
                                          df: 2,
                                          docs: {
                                            1: { tf: 1.0 },
                                            2: { tf: 1.0 },
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
            },
            df: 1,
            docs: { 0: { tf: 1.0 } },
          },
          1: {
            0: {
              0: { df: 1, docs: { 1: { tf: 1.0 } } },
              df: 1,
              docs: { 1: { tf: 1.7320508075688772 } },
            },
            1: {
              3: {
                ".": {
                  5: {
                    5: {
                      8: {
                        6: { df: 1, docs: { 2: { tf: 1.0 } } },
                        7: { df: 1, docs: { 1: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            2: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            7: {
              2: {
                ".": {
                  2: {
                    1: {
                      9: {
                        ".": {
                          3: {
                            8: {
                              ".": {
                                1: {
                                  0: {
                                    0: {
                                      df: 2,
                                      docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              5: {
                ".": {
                  2: {
                    5: { df: 1, docs: { 1: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 2,
            docs: { 1: { tf: 2.23606797749979 }, 3: { tf: 1.0 } },
          },
          2: {
            0: {
              0: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
              2: {
                2: {
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 1.0 } },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            4: {
              7: {
                4: { 9: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 1,
              docs: { 1: { tf: 1.0 } },
            },
            7: {
              0: {
                1: { 7: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 1,
            docs: { 1: { tf: 1.0 } },
          },
          3: {
            2: {
              1: { 0: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              df: 2,
              docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } },
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
          },
          4: {
            1: {
              ".": {
                9: {
                  0: {
                    5: {
                      3: { df: 1, docs: { 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            9: {
              ".": {
                6: { 8: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
          },
          5: {
            2: {
              ".": {
                7: { 4: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            3: {
              ".": {
                2: {
                  6: {
                    5: {
                      8: { df: 1, docs: { 2: { tf: 1.0 } } },
                      9: { df: 1, docs: { 1: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
          },
          6: { 0: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
          8: {
            1: { df: 1, docs: { 1: { tf: 1.0 } } },
            3: {
              ".": {
                4: {
                  7: {
                    6: { df: 1, docs: { 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            4: {
              ".": {
                7: { 1: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
          },
          a: {
            b: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    c: { df: 1, docs: { 0: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            c: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    s: { df: 1, docs: { 2: { tf: 1.0 } } },
                  },
                },
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              h: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    v: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
              t: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 1,
                      docs: { 0: { tf: 1.4142135623730951 } },
                      s: {
                        ".": {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  v: {
                    df: 2,
                    docs: {
                      1: { tf: 2.6457513110645907 },
                      2: { tf: 1.7320508075688772 },
                    },
                    i: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          df: 0,
                          docs: {},
                          s: {
                            df: 0,
                            docs: {},
                            t: {
                              a: {
                                df: 0,
                                docs: {},
                                t: {
                                  df: 1,
                                  docs: { 2: { tf: 1.7320508075688772 } },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          t: {
                            df: 0,
                            docs: {},
                            y: {
                              df: 0,
                              docs: {},
                              p: { df: 1, docs: { 1: { tf: 1.0 } } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            d: {
              d: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            f: {
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                b: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            l: {
              b: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    t: {
                      a: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
              },
              o: {
                df: 0,
                docs: {},
                n: { df: 0, docs: {}, g: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
            p: {
              df: 0,
              docs: {},
              i: {
                df: 3,
                docs: {
                  0: { tf: 2.449489742783178 },
                  1: { tf: 3.0 },
                  3: { tf: 1.7320508075688772 },
                },
              },
              p: {
                ".": {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      x: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
                df: 1,
                docs: { 0: { tf: 1.0 } },
                l: {
                  df: 0,
                  docs: {},
                  i: {
                    c: {
                      df: 2,
                      docs: { 0: { tf: 2.8284271247461903 }, 1: { tf: 2.0 } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  t: {
                    a: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            r: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      e: {
                        c: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            u: {
                              df: 0,
                              docs: {},
                              r: { df: 1, docs: { 0: { tf: 1.0 } } },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            s: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 4,
                    docs: {
                      0: { tf: 1.4142135623730951 },
                      1: { tf: 1.0 },
                      2: { tf: 2.449489742783178 },
                      3: { tf: 1.0 },
                    },
                  },
                },
                i: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  m: {
                    a: {
                      df: 0,
                      docs: {},
                      t: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            v: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                i: { d: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
          },
          b: {
            a: {
              c: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      d: {
                        df: 3,
                        docs: {
                          0: { tf: 1.7320508075688772 },
                          1: { tf: 2.23606797749979 },
                          3: { tf: 1.0 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  w: {
                    df: 3,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                  },
                },
              },
              t: {
                df: 0,
                docs: {},
                w: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              n: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
            },
            l: {
              df: 0,
              docs: {},
              o: {
                c: { df: 0, docs: {}, k: { df: 1, docs: { 3: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            o: {
              df: 0,
              docs: {},
              t: { df: 0, docs: {}, h: { df: 1, docs: { 2: { tf: 1.0 } } } },
              u: {
                df: 0,
                docs: {},
                n: {
                  d: {
                    a: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                l: { d: { df: 1, docs: { 0: { tf: 2.0 } } }, df: 0, docs: {} },
              },
            },
          },
          c: {
            a: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
              n: {
                a: {
                  d: {
                    a: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: { df: 1, docs: { 1: { tf: 2.6457513110645907 } } },
                      },
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              n: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  r: {
                    a: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            h: {
              a: {
                df: 0,
                docs: {},
                r: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              i: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                l: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  i: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        r: {
                          _: {
                            df: 0,
                            docs: {},
                            u: {
                              df: 0,
                              docs: {},
                              s: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  p: {
                                    df: 0,
                                    docs: {},
                                    o: {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        l: {
                                          df: 0,
                                          docs: {},
                                          i: {
                                            df: 0,
                                            docs: {},
                                            n: {
                                              df: 0,
                                              docs: {},
                                              g: {
                                                "=": {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 0,
                                                    docs: {},
                                                    r: {
                                                      df: 0,
                                                      docs: {},
                                                      u: {
                                                        df: 1,
                                                        docs: {
                                                          3: { tf: 1.0 },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.7320508075688772 },
                    2: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            o: {
              d: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: {
                          2: { tf: 2.449489742783178 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              m: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    n: {
                      d: { df: 1, docs: { 3: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  df: 0,
                  docs: {},
                },
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 2.449489742783178 } } },
                    s: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 3: { tf: 1.4142135623730951 } },
                      e: {
                        ".": {
                          df: 0,
                          docs: {},
                          y: {
                            df: 0,
                            docs: {},
                            m: {
                              df: 0,
                              docs: {},
                              l: {
                                df: 2,
                                docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              n: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        r: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                n: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 3,
                        docs: {
                          0: { tf: 1.0 },
                          1: { tf: 1.7320508075688772 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    q: {
                      df: 0,
                      docs: {},
                      u: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 2,
                        docs: { 2: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 2,
                            docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                          },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                    },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    i: {
                      b: {
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 3: { tf: 1.0 } } },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      i: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 2,
                    docs: { 1: { tf: 2.449489742783178 }, 2: { tf: 2.0 } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: {
                          d: { df: 1, docs: { 0: { tf: 1.0 } } },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                    s: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        o: {
                          df: 0,
                          docs: {},
                          n: {
                            d: {
                              df: 2,
                              docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                    },
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 1: { tf: 2.0 }, 2: { tf: 1.0 } },
                    r: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 1: { tf: 1.4142135623730951 } },
                      },
                      y: {
                        _: {
                          df: 0,
                          docs: {},
                          n: {
                            a: {
                              df: 0,
                              docs: {},
                              m: {
                                df: 2,
                                docs: {
                                  1: { tf: 1.0 },
                                  2: { tf: 1.4142135623730951 },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 3,
                    docs: {
                      0: { tf: 2.0 },
                      2: { tf: 1.4142135623730951 },
                      3: { tf: 1.4142135623730951 },
                    },
                  },
                },
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 0,
                        docs: {},
                        i: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            s: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
            u: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    m: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
          },
          d: {
            a: {
              df: 0,
              docs: {},
              t: {
                a: {
                  "/": {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 0,
                            docs: {},
                            s: {
                              "/": {
                                df: 0,
                                docs: {},
                                u: {
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    e: {
                                      df: 0,
                                      docs: {},
                                      r: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          ".": {
                                            df: 0,
                                            docs: {},
                                            j: {
                                              df: 1,
                                              docs: { 3: { tf: 1.0 } },
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                        },
                      },
                    },
                  },
                  b: {
                    a: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 3,
                        docs: {
                          1: { tf: 1.0 },
                          2: { tf: 2.6457513110645907 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 4,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    2: { tf: 1.0 },
                    3: { tf: 2.23606797749979 },
                  },
                },
                df: 0,
                docs: {},
                e: {
                  '"': {
                    ":": {
                      '"': {
                        2: {
                          0: {
                            2: {
                              2: { df: 1, docs: { 2: { tf: 1.0 } } },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 2.0 } },
                },
              },
            },
            b: {
              df: 2,
              docs: { 1: { tf: 1.0 }, 3: { tf: 1.7320508075688772 } },
            },
            df: 1,
            docs: { 3: { tf: 1.0 } },
            e: {
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              f: {
                a: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    d: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                    df: 0,
                    docs: {},
                  },
                },
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 2,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 } },
                    i: {
                      df: 0,
                      docs: {},
                      t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              l: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, v: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
              p: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    y: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                t: { df: 0, docs: {}, h: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              s: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      d: { df: 1, docs: { 1: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 2.23606797749979 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              t: {
                a: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 2,
                        docs: {
                          0: { tf: 1.4142135623730951 },
                          3: { tf: 3.3166247903554 },
                        },
                      },
                    },
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          i: { df: 1, docs: { 3: { tf: 2.0 } } },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              s: {
                c: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        e: {
                          c: {
                            df: 0,
                            docs: {},
                            t: { df: 1, docs: { 1: { tf: 1.0 } } },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  l: {
                    a: {
                      df: 0,
                      docs: {},
                      y: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        2: { tf: 2.0 },
                        3: { tf: 2.449489742783178 },
                      },
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        t: {
                          df: 2,
                          docs: {
                            0: { tf: 1.4142135623730951 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
              o: { df: 0, docs: {}, p: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            u: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
              },
            },
          },
          df: 0,
          docs: {},
          e: {
            ".": {
              df: 0,
              docs: {},
              g: {
                df: 2,
                docs: { 0: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
              },
            },
            a: {
              c: {
                df: 0,
                docs: {},
                h: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
            m: {
              b: {
                df: 1,
                docs: { 0: { tf: 1.0 } },
                e: { d: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              df: 0,
              docs: {},
              i: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            n: {
              d: { df: 1, docs: { 3: { tf: 1.0 } } },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  g: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 2: { tf: 1.4142135623730951 } } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              t: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 3,
                    docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                  },
                },
              },
              v: {
                df: 1,
                docs: { 3: { tf: 2.23606797749979 } },
                i: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 3: { tf: 2.23606797749979 } },
                      },
                    },
                  },
                },
              },
            },
            s: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 1,
                      docs: { 0: { tf: 1.0 } },
                      r: {
                        c: {
                          ".": {
                            c: {
                              df: 0,
                              docs: {},
                              j: { df: 1, docs: { 0: { tf: 1.0 } } },
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            x: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 2,
                      docs: { 1: { tf: 1.4142135623730951 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                s: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
            },
          },
          f: {
            a: {
              df: 0,
              docs: {},
              k: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              l: {
                df: 0,
                docs: {},
                s: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              t: {
                c: { df: 0, docs: {}, h: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
            },
            i: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    1: { tf: 1.0 },
                    3: { tf: 2.449489742783178 },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      c: {
                        a: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              g: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    i: { df: 1, docs: { 1: { tf: 1.0 } } },
                                  },
                                },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 1,
                      docs: { 1: { tf: 2.23606797749979 } },
                      t: {
                        df: 0,
                        docs: {},
                        y: {
                          df: 0,
                          docs: {},
                          p: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    w: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              u: {
                df: 0,
                docs: {},
                n: { d: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            r: {
              a: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    w: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          k: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                q: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
              o: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        d: {
                          _: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              e: {
                                a: {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                          df: 2,
                          docs: {
                            0: { tf: 2.6457513110645907 },
                            3: { tf: 1.0 },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              n: {
                c: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              t: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
            },
          },
          g: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 1: { tf: 2.6457513110645907 }, 2: { tf: 2.0 } },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: { df: 0, docs: {}, r: { df: 1, docs: { 3: { tf: 1.0 } } } },
              df: 0,
              docs: {},
              t: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
            },
            o: {
              _: {
                df: 0,
                docs: {},
                m: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    n: {
                      d: {
                        df: 0,
                        docs: {},
                        f: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              l: {
                                _: {
                                  df: 0,
                                  docs: {},
                                  w: {
                                    df: 0,
                                    docs: {},
                                    e: {
                                      b: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          df: 0,
                                          docs: {},
                                          o: {
                                            c: {
                                              df: 0,
                                              docs: {},
                                              k: {
                                                df: 0,
                                                docs: {},
                                                e: {
                                                  df: 0,
                                                  docs: {},
                                                  t: {
                                                    df: 1,
                                                    docs: { 3: { tf: 1.0 } },
                                                  },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                        },
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 3,
              docs: {
                0: { tf: 1.4142135623730951 },
                1: { tf: 1.4142135623730951 },
                3: { tf: 1.4142135623730951 },
              },
              o: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 2,
                    docs: {
                      0: { tf: 1.7320508075688772 },
                      3: { tf: 1.4142135623730951 },
                    },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
            },
          },
          h: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              v: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  m: {
                    a: {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          n: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              r: { df: 0, docs: {}, e: { df: 1, docs: { 0: { tf: 1.0 } } } },
            },
            i: {
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 2,
                      docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                      i: {
                        c: {
                          a: {
                            df: 0,
                            docs: {},
                            l: {
                              c: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  u: {
                                    df: 0,
                                    docs: {},
                                    n: {
                                      df: 0,
                                      docs: {},
                                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                              u: {
                                df: 0,
                                docs: {},
                                s: { df: 1, docs: { 0: { tf: 1.0 } } },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              t: {
                df: 2,
                docs: {
                  1: { tf: 2.23606797749979 },
                  2: { tf: 1.4142135623730951 },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: { d: { df: 1, docs: { 2: { tf: 1.0 } } }, df: 0, docs: {} },
              m: {
                df: 0,
                docs: {},
                e: {
                  ".": {
                    df: 0,
                    docs: {},
                    m: {
                      df: 0,
                      docs: {},
                      o: {
                        d: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              e: {
                                ".": {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      s: { df: 1, docs: { 0: { tf: 1.0 } } },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                    t: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 0,
                        docs: {},
                        x: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                      },
                    },
                  },
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                },
              },
              o: {
                df: 0,
                docs: {},
                k: {
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                  s: {
                    ".": {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            t: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  s: {
                    ":": {
                      "/": {
                        "/": {
                          df: 0,
                          docs: {},
                          w: {
                            df: 0,
                            docs: {},
                            o: {
                              df: 0,
                              docs: {},
                              n: {
                                d: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    r: {
                                      df: 0,
                                      docs: {},
                                      v: {
                                        df: 0,
                                        docs: {},
                                        i: {
                                          df: 0,
                                          docs: {},
                                          l: {
                                            df: 0,
                                            docs: {},
                                            l: {
                                              df: 0,
                                              docs: {},
                                              e: {
                                                ".": {
                                                  df: 0,
                                                  docs: {},
                                                  o: {
                                                    df: 0,
                                                    docs: {},
                                                    r: {
                                                      df: 0,
                                                      docs: {},
                                                      g: {
                                                        "/": {
                                                          df: 0,
                                                          docs: {},
                                                          w: {
                                                            df: 0,
                                                            docs: {},
                                                            v: {
                                                              a: {
                                                                df: 0,
                                                                docs: {},
                                                                s: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  s: {
                                                                    df: 0,
                                                                    docs: {},
                                                                    e: {
                                                                      df: 0,
                                                                      docs: {},
                                                                      t: {
                                                                        df: 0,
                                                                        docs: {},
                                                                        s: {
                                                                          "/": {
                                                                            df: 0,
                                                                            docs: {},
                                                                            u: {
                                                                              df: 0,
                                                                              docs: {},
                                                                              p: {
                                                                                df: 0,
                                                                                docs: {},
                                                                                l: {
                                                                                  df: 0,
                                                                                  docs: {},
                                                                                  o: {
                                                                                    a: {
                                                                                      d: {
                                                                                        df: 0,
                                                                                        docs: {},
                                                                                        s: {
                                                                                          "/": {
                                                                                            df: 0,
                                                                                            docs: {},
                                                                                            s: {
                                                                                              a: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                v: {
                                                                                                  df: 1,
                                                                                                  docs: {
                                                                                                    1: {
                                                                                                      tf: 1.0,
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                              o: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                l: {
                                                                                                  a: {
                                                                                                    df: 0,
                                                                                                    docs: {},
                                                                                                    r: {
                                                                                                      df: 1,
                                                                                                      docs: {
                                                                                                        2: {
                                                                                                          tf: 1.0,
                                                                                                        },
                                                                                                      },
                                                                                                    },
                                                                                                  },
                                                                                                  df: 0,
                                                                                                  docs: {},
                                                                                                },
                                                                                              },
                                                                                            },
                                                                                            t: {
                                                                                              df: 0,
                                                                                              docs: {},
                                                                                              r: {
                                                                                                df: 0,
                                                                                                docs: {},
                                                                                                e: {
                                                                                                  df: 2,
                                                                                                  docs: {
                                                                                                    1: {
                                                                                                      tf: 1.4142135623730951,
                                                                                                    },
                                                                                                    2: {
                                                                                                      tf: 1.0,
                                                                                                    },
                                                                                                  },
                                                                                                },
                                                                                              },
                                                                                            },
                                                                                          },
                                                                                          df: 0,
                                                                                          docs: {},
                                                                                        },
                                                                                      },
                                                                                      df: 0,
                                                                                      docs: {},
                                                                                    },
                                                                                    df: 0,
                                                                                    docs: {},
                                                                                  },
                                                                                },
                                                                              },
                                                                            },
                                                                          },
                                                                          df: 0,
                                                                          docs: {},
                                                                        },
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                              df: 0,
                                                              docs: {},
                                                            },
                                                          },
                                                        },
                                                        df: 0,
                                                        docs: {},
                                                      },
                                                    },
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          i: {
            ".": { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
            d: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            df: 0,
            docs: {},
            m: {
              a: {
                df: 0,
                docs: {},
                g: {
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        l: {
                          df: 2,
                          docs: {
                            1: { tf: 1.7320508075688772 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                      },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            n: {
              c: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  u: {
                    d: {
                      df: 3,
                      docs: {
                        1: { tf: 1.0 },
                        2: { tf: 1.0 },
                        3: { tf: 1.4142135623730951 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  x: {
                    ".": {
                      df: 0,
                      docs: {},
                      j: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    },
                    df: 1,
                    docs: { 2: { tf: 1.0 } },
                  },
                },
                i: { c: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
              },
              df: 0,
              docs: {},
              f: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    m: {
                      df: 3,
                      docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              i: {
                df: 0,
                docs: {},
                t: {
                  ".": {
                    df: 0,
                    docs: {},
                    j: { df: 1, docs: { 2: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                  i: {
                    a: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 0,
                        docs: {},
                        s: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                        u: {
                          df: 0,
                          docs: {},
                          s: {
                            df: 0,
                            docs: {},
                            e: {
                              df: 0,
                              docs: {},
                              r: {
                                c: {
                                  df: 0,
                                  docs: {},
                                  o: {
                                    df: 0,
                                    docs: {},
                                    u: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        t: {
                                          df: 1,
                                          docs: {
                                            0: { tf: 1.4142135623730951 },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                t: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                    n: {
                      c: { df: 1, docs: { 3: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                  df: 0,
                  docs: {},
                  e: {
                    a: {
                      d: { df: 1, docs: { 0: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  g: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  n: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    r: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        p: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                },
                r: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      df: 0,
                      docs: {},
                      u: {
                        c: { df: 1, docs: { 0: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            p: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
            s: {
              df: 0,
              docs: {},
              o: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
            },
          },
          j: {
            a: {
              df: 0,
              docs: {},
              v: {
                a: {
                  df: 0,
                  docs: {},
                  s: {
                    c: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            t: {
                              df: 1,
                              docs: { 3: { tf: 1.4142135623730951 } },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            s: { df: 1, docs: { 3: { tf: 1.0 } } },
          },
          k: {
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              y: {
                df: 3,
                docs: {
                  0: { tf: 1.0 },
                  2: { tf: 1.0 },
                  3: { tf: 1.4142135623730951 },
                },
              },
            },
          },
          l: {
            a: {
              df: 0,
              docs: {},
              t: {
                df: 1,
                docs: { 1: { tf: 1.0 } },
                i: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    u: {
                      d: {
                        df: 2,
                        docs: {
                          1: { tf: 1.7320508075688772 },
                          2: { tf: 1.4142135623730951 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              d: {
                df: 0,
                docs: {},
                u: {
                  c: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
            },
            i: {
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, k: { df: 1, docs: { 2: { tf: 1.0 } } } },
              s: {
                df: 0,
                docs: {},
                t: {
                  df: 1,
                  docs: { 1: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 3,
                      docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 }, 2: { tf: 1.0 } },
                    },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                      },
                    },
                  },
                  df: 1,
                  docs: { 0: { tf: 1.7320508075688772 } },
                  u: {
                    df: 0,
                    docs: {},
                    s: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            n: { df: 0, docs: {}, g: { df: 1, docs: { 1: { tf: 1.0 } } } },
            o: {
              a: {
                d: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                df: 0,
                docs: {},
              },
              c: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 2,
                    docs: { 1: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
              g: {
                df: 1,
                docs: { 1: { tf: 1.4142135623730951 } },
                g: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                },
                i: { c: { df: 1, docs: { 0: { tf: 1.0 } } }, df: 0, docs: {} },
                s: {
                  ".": {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      x: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 1.0 } } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      u: {
                        d: {
                          df: 2,
                          docs: {
                            1: { tf: 1.7320508075688772 },
                            2: { tf: 1.4142135623730951 },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              w: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                },
              },
            },
          },
          m: {
            a: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                n: {
                  ".": {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      o: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              n: {
                a: {
                  df: 0,
                  docs: {},
                  g: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
                },
                df: 0,
                docs: {},
              },
              p: {
                b: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      n: {
                        d: { df: 1, docs: { 1: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
                df: 2,
                docs: { 0: { tf: 2.0 }, 3: { tf: 1.4142135623730951 } },
              },
              t: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    i: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              x: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      m: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
                u: { df: 0, docs: {}, s: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
              d: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              s: {
                df: 0,
                docs: {},
                s: {
                  a: {
                    df: 0,
                    docs: {},
                    g: { df: 1, docs: { 2: { tf: 2.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  o: {
                    d: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              c: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    g: {
                      a: {
                        df: 0,
                        docs: {},
                        n: { df: 1, docs: { 2: { tf: 1.0 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    u: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        l: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                k: {
                  _: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        t: {
                          a: { df: 1, docs: { 3: { tf: 1.7320508075688772 } } },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          v: { df: 1, docs: { 3: { tf: 1.7320508075688772 } } },
                        },
                      },
                    },
                  },
                  df: 1,
                  docs: { 3: { tf: 2.0 } },
                },
              },
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  o: {
                    d: {
                      b: {
                        _: {
                          d: {
                            b: {
                              _: {
                                df: 0,
                                docs: {},
                                n: {
                                  a: {
                                    df: 0,
                                    docs: {},
                                    m: {
                                      df: 1,
                                      docs: { 3: { tf: 1.4142135623730951 } },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                            df: 0,
                            docs: {},
                          },
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            w: {
                              d: { df: 1, docs: { 3: { tf: 1.0 } } },
                              df: 0,
                              docs: {},
                            },
                          },
                          u: {
                            df: 0,
                            docs: {},
                            r: {
                              df: 0,
                              docs: {},
                              i: {
                                df: 1,
                                docs: { 3: { tf: 1.4142135623730951 } },
                              },
                            },
                            s: {
                              df: 0,
                              docs: {},
                              e: {
                                df: 0,
                                docs: {},
                                r: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    a: {
                                      df: 0,
                                      docs: {},
                                      m: { df: 1, docs: { 3: { tf: 1.0 } } },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                          },
                        },
                        df: 3,
                        docs: {
                          1: { tf: 1.7320508075688772 },
                          2: { tf: 1.7320508075688772 },
                          3: { tf: 1.4142135623730951 },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 3,
                    docs: {
                      1: { tf: 1.0 },
                      2: { tf: 1.0 },
                      3: { tf: 2.23606797749979 },
                    },
                  },
                },
                r: { df: 0, docs: {}, o: { df: 1, docs: { 2: { tf: 1.0 } } } },
                t: {
                  df: 0,
                  docs: {},
                  h: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              r: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    p: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 2,
                        docs: { 0: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                      },
                    },
                  },
                },
              },
            },
          },
          n: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    1: { tf: 2.8284271247461903 },
                    2: { tf: 1.4142135623730951 },
                    3: { tf: 1.4142135623730951 },
                  },
                },
              },
            },
            df: 1,
            docs: { 1: { tf: 1.7320508075688772 } },
            e: {
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  s: {
                    df: 0,
                    docs: {},
                    s: {
                      a: {
                        df: 0,
                        docs: {},
                        r: {
                          df: 0,
                          docs: {},
                          i: {
                            df: 3,
                            docs: {
                              0: { tf: 1.0 },
                              2: { tf: 1.0 },
                              3: { tf: 1.4142135623730951 },
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              s: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              w: {
                df: 3,
                docs: {
                  0: { tf: 1.4142135623730951 },
                  1: { tf: 1.4142135623730951 },
                  2: { tf: 1.0 },
                },
                u: { df: 0, docs: {}, s: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
            },
            o: {
              d: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
              },
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, e: { df: 1, docs: { 1: { tf: 1.0 } } } },
              t: {
                a: {
                  b: {
                    df: 0,
                    docs: {},
                    l: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
                e: { df: 2, docs: { 0: { tf: 1.0 }, 2: { tf: 1.0 } } },
              },
            },
            p: {
              df: 0,
              docs: {},
              m: {
                df: 2,
                docs: {
                  0: { tf: 1.4142135623730951 },
                  3: { tf: 1.4142135623730951 },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 2.23606797749979 } } },
              },
              m: {
                b: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  },
                },
                df: 0,
                docs: {},
              },
            },
          },
          o: {
            b: {
              df: 0,
              docs: {},
              j: {
                df: 0,
                docs: {},
                e: {
                  c: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            df: 0,
            docs: {},
            k: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
            n: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
            p: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 2,
                      docs: { 1: { tf: 1.4142135623730951 }, 3: { tf: 1.0 } },
                    },
                  },
                },
              },
            },
            r: {
              d: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, r: { df: 1, docs: { 1: { tf: 1.0 } } } },
              },
              df: 0,
              docs: {},
            },
            u: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    d: { df: 1, docs: { 0: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            v: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 1,
                  docs: { 1: { tf: 1.0 } },
                  v: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      e: {
                        df: 0,
                        docs: {},
                        w: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                      },
                    },
                  },
                },
              },
            },
          },
          p: {
            a: {
              c: {
                df: 0,
                docs: {},
                k: {
                  a: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 2.449489742783178 },
                        3: { tf: 1.0 },
                      },
                      e: {
                        ".": {
                          df: 0,
                          docs: {},
                          j: {
                            df: 0,
                            docs: {},
                            s: {
                              df: 0,
                              docs: {},
                              o: {
                                df: 0,
                                docs: {},
                                n: { df: 1, docs: { 0: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              df: 0,
              docs: {},
              g: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
              },
              r: {
                a: {
                  df: 0,
                  docs: {},
                  m: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: { 1: { tf: 2.23606797749979 }, 3: { tf: 1.0 } },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  df: 1,
                  docs: { 0: { tf: 1.0 } },
                  w: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      r: {
                        d: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              t: { df: 0, docs: {}, h: { df: 1, docs: { 3: { tf: 1.0 } } } },
              y: {
                df: 0,
                docs: {},
                l: {
                  df: 0,
                  docs: {},
                  o: {
                    a: {
                      d: {
                        df: 2,
                        docs: { 1: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                f: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      m: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                    },
                  },
                },
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 2: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            l: {
              a: {
                c: { df: 0, docs: {}, e: { df: 1, docs: { 3: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
            o: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                },
              },
              p: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  l: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              r: {
                df: 0,
                docs: {},
                t: { df: 2, docs: { 2: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
            },
            r: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                m: {
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      i: {
                        df: 0,
                        docs: {},
                        l: {
                          df: 0,
                          docs: {},
                          i: { df: 1, docs: { 0: { tf: 1.0 } } },
                        },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
              o: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
                d: {
                  df: 0,
                  docs: {},
                  u: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        df: 2,
                        docs: {
                          0: { tf: 1.7320508075688772 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
                j: {
                  df: 0,
                  docs: {},
                  e: {
                    c: {
                      df: 0,
                      docs: {},
                      t: {
                        "'": { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 4,
                        docs: {
                          0: { tf: 2.23606797749979 },
                          1: { tf: 1.4142135623730951 },
                          2: { tf: 1.4142135623730951 },
                          3: { tf: 1.7320508075688772 },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                p: { df: 1, docs: { 0: { tf: 1.0 } } },
                v: {
                  df: 0,
                  docs: {},
                  i: {
                    d: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 2.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          r: {
            a: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    m: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
                g: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    3: { tf: 1.0 },
                  },
                },
                k: {
                  '"': {
                    ":": {
                      1: { df: 1, docs: { 2: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 2,
                  docs: { 1: { tf: 1.7320508075688772 }, 2: { tf: 1.0 } },
                },
              },
              w: {
                _: {
                  d: {
                    a: {
                      df: 0,
                      docs: {},
                      t: {
                        a: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                c: {
                  df: 0,
                  docs: {},
                  t: {
                    _: {
                      a: {
                        df: 0,
                        docs: {},
                        p: {
                          df: 0,
                          docs: {},
                          p: {
                            _: {
                              df: 0,
                              docs: {},
                              g: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  l: {
                                    a: {
                                      df: 0,
                                      docs: {},
                                      n: {
                                        df: 0,
                                        docs: {},
                                        g: {
                                          _: {
                                            a: {
                                              df: 0,
                                              docs: {},
                                              p: {
                                                df: 0,
                                                docs: {},
                                                i: {
                                                  df: 1,
                                                  docs: { 3: { tf: 1.0 } },
                                                },
                                              },
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                  o: {
                                    df: 0,
                                    docs: {},
                                    g: {
                                      df: 0,
                                      docs: {},
                                      l: {
                                        df: 0,
                                        docs: {},
                                        e: {
                                          _: {
                                            df: 0,
                                            docs: {},
                                            m: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                p: {
                                                  df: 0,
                                                  docs: {},
                                                  s: {
                                                    _: {
                                                      a: {
                                                        df: 0,
                                                        docs: {},
                                                        p: {
                                                          df: 0,
                                                          docs: {},
                                                          i: {
                                                            _: {
                                                              df: 0,
                                                              docs: {},
                                                              k: {
                                                                df: 0,
                                                                docs: {},
                                                                e: {
                                                                  df: 0,
                                                                  docs: {},
                                                                  y: {
                                                                    df: 1,
                                                                    docs: {
                                                                      3: {
                                                                        tf: 1.0,
                                                                      },
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                            df: 0,
                                                            docs: {},
                                                          },
                                                        },
                                                      },
                                                      df: 0,
                                                      docs: {},
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              m: {
                                df: 0,
                                docs: {},
                                i: {
                                  df: 0,
                                  docs: {},
                                  n: {
                                    d: {
                                      df: 0,
                                      docs: {},
                                      f: {
                                        df: 0,
                                        docs: {},
                                        u: {
                                          df: 0,
                                          docs: {},
                                          e: {
                                            df: 0,
                                            docs: {},
                                            l: {
                                              _: {
                                                df: 0,
                                                docs: {},
                                                w: {
                                                  df: 0,
                                                  docs: {},
                                                  e: {
                                                    b: {
                                                      df: 0,
                                                      docs: {},
                                                      s: {
                                                        df: 0,
                                                        docs: {},
                                                        o: {
                                                          c: {
                                                            df: 0,
                                                            docs: {},
                                                            k: {
                                                              df: 0,
                                                              docs: {},
                                                              e: {
                                                                df: 0,
                                                                docs: {},
                                                                t: {
                                                                  df: 1,
                                                                  docs: {
                                                                    3: {
                                                                      tf: 1.0,
                                                                    },
                                                                  },
                                                                },
                                                              },
                                                            },
                                                          },
                                                          df: 0,
                                                          docs: {},
                                                        },
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                        },
                                      },
                                    },
                                    df: 0,
                                    docs: {},
                                  },
                                },
                              },
                            },
                            df: 0,
                            docs: {},
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 2,
                    docs: { 0: { tf: 3.3166247903554 }, 3: { tf: 1.0 } },
                  },
                },
                df: 0,
                docs: {},
              },
              c: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    v: {
                      df: 2,
                      docs: { 0: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                    },
                  },
                },
                h: {
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                o: {
                  df: 0,
                  docs: {},
                  r: {
                    d: {
                      df: 2,
                      docs: {
                        1: { tf: 1.7320508075688772 },
                        2: { tf: 1.4142135623730951 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                w: { df: 1, docs: { 1: { tf: 1.0 } } },
              },
              d: {
                df: 0,
                docs: {},
                u: {
                  c: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      r: {
                        ".": {
                          df: 0,
                          docs: {},
                          t: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                  x: { df: 1, docs: { 0: { tf: 3.3166247903554 } } },
                },
              },
              df: 1,
              docs: { 0: { tf: 1.0 } },
              f: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 1,
                    docs: { 0: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        c: { df: 1, docs: { 3: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
              g: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      _: {
                        df: 0,
                        docs: {},
                        n: {
                          a: {
                            df: 0,
                            docs: {},
                            m: {
                              df: 2,
                              docs: {
                                1: { tf: 1.0 },
                                2: { tf: 1.4142135623730951 },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              l: {
                a: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              q: {
                df: 0,
                docs: {},
                u: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 1.4142135623730951 },
                        3: { tf: 1.0 },
                      },
                    },
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.0 } } },
                p: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    n: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 1: { tf: 1.7320508075688772 } },
                      },
                    },
                  },
                },
                t: {
                  _: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        l: {
                          a: {
                            df: 0,
                            docs: {},
                            n: {
                              df: 0,
                              docs: {},
                              g: {
                                "/": {
                                  df: 0,
                                  docs: {},
                                  l: {
                                    df: 0,
                                    docs: {},
                                    o: {
                                      df: 0,
                                      docs: {},
                                      g: {
                                        df: 0,
                                        docs: {},
                                        s: {
                                          ".": {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              df: 0,
                                              docs: {},
                                              x: {
                                                df: 0,
                                                docs: {},
                                                t: {
                                                  df: 1,
                                                  docs: { 1: { tf: 1.0 } },
                                                },
                                              },
                                            },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 1,
                                docs: { 1: { tf: 1.0 } },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                      },
                    },
                  },
                  a: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                  df: 1,
                  docs: { 1: { tf: 2.23606797749979 } },
                },
              },
              t: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 1,
                    docs: { 1: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      v: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                    },
                  },
                },
                u: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    w: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                t: {
                  df: 2,
                  docs: { 2: { tf: 1.0 }, 3: { tf: 2.23606797749979 } },
                },
              },
              u: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                },
              },
            },
            u: {
              df: 0,
              docs: {},
              l: { df: 0, docs: {}, e: { df: 1, docs: { 0: { tf: 1.0 } } } },
              n: {
                df: 2,
                docs: {
                  0: { tf: 1.7320508075688772 },
                  3: { tf: 2.23606797749979 },
                },
              },
            },
          },
          s: {
            a: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: { df: 1, docs: { 3: { tf: 1.0 } } },
                p: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 1,
                    docs: { 3: { tf: 1.7320508075688772 } },
                    e: {
                      _: {
                        d: {
                          a: {
                            df: 0,
                            docs: {},
                            t: {
                              a: {
                                ".": {
                                  df: 0,
                                  docs: {},
                                  j: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      o: {
                                        df: 0,
                                        docs: {},
                                        n: { df: 1, docs: { 3: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              v: {
                df: 0,
                docs: {},
                e: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
              },
            },
            c: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 2,
                      docs: {
                        2: { tf: 1.4142135623730951 },
                        3: { tf: 1.7320508075688772 },
                      },
                    },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              a: {
                df: 0,
                docs: {},
                r: {
                  c: {
                    df: 0,
                    docs: {},
                    h: { df: 1, docs: { 1: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
              },
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  n: {
                    d: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
                t: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                d: {
                  df: 1,
                  docs: { 3: { tf: 1.7320508075688772 } },
                  e: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 3: { tf: 1.0 } } },
                  },
                },
                df: 0,
                docs: {},
                n: { df: 1, docs: { 0: { tf: 1.0 } } },
              },
              r: {
                df: 0,
                docs: {},
                v: {
                  df: 2,
                  docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 4,
                      docs: {
                        0: { tf: 1.7320508075688772 },
                        1: { tf: 1.7320508075688772 },
                        2: { tf: 1.0 },
                        3: { tf: 3.1622776601683795 },
                      },
                    },
                  },
                  i: {
                    c: {
                      df: 3,
                      docs: {
                        0: { tf: 1.0 },
                        1: { tf: 2.0 },
                        3: { tf: 3.3166247903554 },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              s: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 3,
                        docs: {
                          0: { tf: 1.0 },
                          1: { tf: 1.0 },
                          2: { tf: 2.0 },
                        },
                      },
                    },
                  },
                },
              },
              t: {
                df: 2,
                docs: {
                  0: { tf: 1.7320508075688772 },
                  3: { tf: 2.23606797749979 },
                },
              },
            },
            h: {
              a: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                },
              },
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                w: { df: 0, docs: {}, n: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
            },
            i: {
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  n: {
                    a: {
                      df: 0,
                      docs: {},
                      v: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  l: {
                    a: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
                p: { df: 0, docs: {}, l: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
              n: {
                df: 0,
                docs: {},
                g: {
                  df: 0,
                  docs: {},
                  l: { df: 2, docs: { 0: { tf: 1.0 }, 3: { tf: 1.0 } } },
                },
              },
            },
            o: {
              c: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    df: 0,
                    docs: {},
                    l: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  df: 0,
                  docs: {},
                },
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    t: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 2.0 } } },
                  },
                },
              },
              df: 0,
              docs: {},
              l: {
                a: {
                  df: 0,
                  docs: {},
                  r: {
                    df: 1,
                    docs: { 2: { tf: 1.0 } },
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          r: {
                            df: 0,
                            docs: {},
                            g: {
                              df: 0,
                              docs: {},
                              y: {
                                d: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    f: {
                                      df: 0,
                                      docs: {},
                                      e: {
                                        df: 0,
                                        docs: {},
                                        n: {
                                          d: {
                                            df: 1,
                                            docs: { 2: { tf: 1.0 } },
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              u: {
                df: 0,
                docs: {},
                r: { c: { df: 1, docs: { 3: { tf: 1.0 } } }, df: 0, docs: {} },
              },
            },
            p: {
              df: 0,
              docs: {},
              e: {
                c: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    f: {
                      df: 0,
                      docs: {},
                      i: { df: 2, docs: { 1: { tf: 1.0 }, 3: { tf: 1.0 } } },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              i: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
              l: {
                df: 0,
                docs: {},
                i: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              },
            },
            r: {
              c: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              df: 0,
              docs: {},
            },
            t: {
              a: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  t: {
                    d: {
                      a: {
                        df: 0,
                        docs: {},
                        t: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 4,
                    docs: {
                      0: { tf: 1.0 },
                      1: { tf: 1.4142135623730951 },
                      2: { tf: 1.4142135623730951 },
                      3: { tf: 1.7320508075688772 },
                    },
                  },
                },
                t: {
                  df: 3,
                  docs: { 1: { tf: 2.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
                  e: {
                    df: 2,
                    docs: { 0: { tf: 2.8284271247461903 }, 2: { tf: 1.0 } },
                  },
                  i: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    ".": {
                      df: 0,
                      docs: {},
                      t: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 2,
                    docs: { 0: { tf: 1.0 }, 2: { tf: 1.7320508075688772 } },
                  },
                  i: {
                    df: 2,
                    docs: { 1: { tf: 1.0 }, 2: { tf: 1.4142135623730951 } },
                  },
                },
              },
              r: {
                df: 0,
                docs: {},
                i: {
                  df: 0,
                  docs: {},
                  n: {
                    df: 0,
                    docs: {},
                    g: { df: 2, docs: { 1: { tf: 2.0 }, 3: { tf: 1.0 } } },
                  },
                },
                u: {
                  c: {
                    df: 0,
                    docs: {},
                    t: {
                      df: 0,
                      docs: {},
                      u: {
                        df: 0,
                        docs: {},
                        r: { df: 2, docs: { 0: { tf: 1.0 }, 1: { tf: 1.0 } } },
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            u: {
              b: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    q: {
                      df: 0,
                      docs: {},
                      u: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
              c: {
                c: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    s: {
                      df: 0,
                      docs: {},
                      s: {
                        df: 1,
                        docs: { 1: { tf: 1.7320508075688772 } },
                        f: {
                          df: 0,
                          docs: {},
                          u: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              l: {
                                df: 0,
                                docs: {},
                                i: { df: 1, docs: { 3: { tf: 1.0 } } },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
          },
          t: {
            df: 0,
            docs: {},
            h: {
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  e: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
                o: {
                  df: 0,
                  docs: {},
                  u: {
                    df: 0,
                    docs: {},
                    g: {
                      df: 0,
                      docs: {},
                      h: {
                        df: 2,
                        docs: { 0: { tf: 1.4142135623730951 }, 1: { tf: 1.0 } },
                      },
                    },
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                m: {
                  b: {
                    ".": {
                      df: 0,
                      docs: {},
                      p: {
                        df: 0,
                        docs: {},
                        n: {
                          df: 0,
                          docs: {},
                          g: {
                            df: 2,
                            docs: {
                              1: { tf: 1.7320508075688772 },
                              2: { tf: 1.4142135623730951 },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              m: {
                df: 0,
                docs: {},
                e: {
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 1.4142135623730951 },
                    2: { tf: 1.4142135623730951 },
                  },
                  l: {
                    df: 0,
                    docs: {},
                    i: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              p: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
              t: {
                a: { df: 0, docs: {}, l: { df: 1, docs: { 1: { tf: 1.0 } } } },
                df: 0,
                docs: {},
              },
              w: {
                a: {
                  df: 0,
                  docs: {},
                  r: {
                    d: { df: 1, docs: { 3: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
                df: 0,
                docs: {},
              },
            },
            r: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                e: {
                  df: 2,
                  docs: { 1: { tf: 2.0 }, 2: { tf: 1.7320508075688772 } },
                },
              },
              i: {
                df: 0,
                docs: {},
                v: {
                  df: 0,
                  docs: {},
                  i: {
                    a: {
                      df: 0,
                      docs: {},
                      l: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              u: {
                df: 0,
                docs: {},
                e: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
              },
            },
            s: { df: 0, docs: {}, x: { df: 1, docs: { 0: { tf: 1.0 } } } },
            w: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                e: { df: 0, docs: {}, t: { df: 1, docs: { 0: { tf: 1.0 } } } },
              },
              i: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              o: {
                df: 3,
                docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 }, 3: { tf: 1.0 } },
              },
            },
            y: {
              df: 0,
              docs: {},
              p: {
                df: 0,
                docs: {},
                e: {
                  '"': {
                    ":": {
                      '"': {
                        df: 0,
                        docs: {},
                        w: {
                          df: 0,
                          docs: {},
                          o: {
                            df: 0,
                            docs: {},
                            n: {
                              d: {
                                df: 0,
                                docs: {},
                                e: {
                                  df: 0,
                                  docs: {},
                                  r: {
                                    df: 0,
                                    docs: {},
                                    v: {
                                      df: 0,
                                      docs: {},
                                      i: {
                                        df: 0,
                                        docs: {},
                                        l: {
                                          df: 0,
                                          docs: {},
                                          l: {
                                            df: 0,
                                            docs: {},
                                            e: {
                                              a: {
                                                df: 0,
                                                docs: {},
                                                s: {
                                                  df: 0,
                                                  docs: {},
                                                  s: {
                                                    df: 0,
                                                    docs: {},
                                                    e: {
                                                      df: 0,
                                                      docs: {},
                                                      t: {
                                                        df: 1,
                                                        docs: {
                                                          2: { tf: 1.0 },
                                                        },
                                                      },
                                                    },
                                                  },
                                                },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                              df: 0,
                              docs: {},
                            },
                          },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 3,
                  docs: {
                    0: { tf: 1.0 },
                    1: { tf: 3.4641016151377544 },
                    2: { tf: 2.23606797749979 },
                  },
                  s: {
                    c: {
                      df: 0,
                      docs: {},
                      r: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          p: {
                            df: 0,
                            docs: {},
                            t: { df: 1, docs: { 0: { tf: 1.0 } } },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
          },
          u: {
            df: 0,
            docs: {},
            i: { df: 1, docs: { 0: { tf: 1.0 } } },
            n: {
              c: {
                df: 0,
                docs: {},
                o: {
                  df: 0,
                  docs: {},
                  m: { df: 1, docs: { 3: { tf: 1.4142135623730951 } } },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                q: {
                  df: 0,
                  docs: {},
                  u: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
                },
                t: { df: 1, docs: { 2: { tf: 1.0 } } },
              },
            },
            p: {
              d: {
                a: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 3,
                    docs: {
                      0: { tf: 1.0 },
                      1: { tf: 1.4142135623730951 },
                      2: { tf: 1.0 },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              df: 2,
              docs: {
                2: { tf: 1.4142135623730951 },
                3: { tf: 1.7320508075688772 },
              },
              o: { df: 0, docs: {}, n: { df: 1, docs: { 1: { tf: 1.0 } } } },
              p: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  r: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                },
              },
            },
            r: {
              df: 0,
              docs: {},
              l: {
                df: 2,
                docs: { 1: { tf: 2.0 }, 2: { tf: 1.7320508075688772 } },
              },
            },
            s: {
              a: { df: 0, docs: {}, g: { df: 1, docs: { 0: { tf: 1.0 } } } },
              df: 4,
              docs: {
                0: { tf: 2.449489742783178 },
                1: { tf: 1.7320508075688772 },
                2: { tf: 1.7320508075688772 },
                3: { tf: 2.6457513110645907 },
              },
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 4,
                  docs: {
                    0: { tf: 1.7320508075688772 },
                    1: { tf: 2.6457513110645907 },
                    2: { tf: 2.6457513110645907 },
                    3: { tf: 2.0 },
                  },
                  n: {
                    a: {
                      df: 0,
                      docs: {},
                      m: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            t: {
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                l: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              },
            },
            u: {
              df: 0,
              docs: {},
              i: {
                d: { df: 2, docs: { 1: { tf: 1.0 }, 2: { tf: 1.0 } } },
                df: 0,
                docs: {},
              },
            },
          },
          v: {
            1: {
              "/": {
                a: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    i: {
                      "/": {
                        a: {
                          c: {
                            df: 0,
                            docs: {},
                            t: {
                              df: 1,
                              docs: { 1: { tf: 1.4142135623730951 } },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                        u: {
                          df: 0,
                          docs: {},
                          s: { df: 1, docs: { 1: { tf: 1.0 } } },
                        },
                      },
                      df: 0,
                      docs: {},
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              6: { df: 1, docs: { 0: { tf: 1.0 } } },
              df: 0,
              docs: {},
            },
            a: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                i: { d: { df: 1, docs: { 1: { tf: 1.0 } } }, df: 0, docs: {} },
                u: {
                  df: 2,
                  docs: { 0: { tf: 1.0 }, 1: { tf: 1.4142135623730951 } },
                },
              },
              r: {
                df: 0,
                docs: {},
                i: {
                  a: {
                    b: {
                      df: 0,
                      docs: {},
                      l: {
                        df: 2,
                        docs: { 0: { tf: 1.0 }, 3: { tf: 2.6457513110645907 } },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    u: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
            },
            df: 0,
            docs: {},
            e: {
              c: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 0,
                    docs: {},
                    r: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                },
              },
              df: 0,
              docs: {},
              r: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            i: {
              a: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
              d: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  o: {
                    df: 2,
                    docs: {
                      1: { tf: 1.7320508075688772 },
                      2: { tf: 1.4142135623730951 },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                w: { df: 1, docs: { 0: { tf: 1.7320508075688772 } } },
              },
            },
            o: {
              df: 0,
              docs: {},
              l: {
                df: 0,
                docs: {},
                u: { df: 0, docs: {}, m: { df: 1, docs: { 2: { tf: 1.0 } } } },
              },
            },
          },
          w: {
            a: {
              df: 0,
              docs: {},
              n: { df: 0, docs: {}, t: { df: 1, docs: { 3: { tf: 1.0 } } } },
              r: { df: 0, docs: {}, n: { df: 1, docs: { 3: { tf: 1.0 } } } },
              s: { df: 0, docs: {}, t: { df: 1, docs: { 1: { tf: 1.0 } } } },
            },
            df: 0,
            docs: {},
            e: {
              b: {
                df: 0,
                docs: {},
                s: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    t: { df: 1, docs: { 0: { tf: 1.0 } } },
                  },
                  o: {
                    c: {
                      df: 0,
                      docs: {},
                      k: {
                        df: 0,
                        docs: {},
                        e: {
                          df: 0,
                          docs: {},
                          t: {
                            df: 4,
                            docs: {
                              0: { tf: 1.4142135623730951 },
                              1: { tf: 2.0 },
                              2: { tf: 1.7320508075688772 },
                              3: { tf: 2.0 },
                            },
                          },
                        },
                      },
                    },
                    df: 0,
                    docs: {},
                  },
                },
              },
              df: 0,
              docs: {},
            },
            h: {
              df: 0,
              docs: {},
              e: {
                df: 0,
                docs: {},
                r: {
                  df: 0,
                  docs: {},
                  e: {
                    a: { df: 1, docs: { 2: { tf: 1.0 } } },
                    df: 0,
                    docs: {},
                  },
                },
              },
            },
            i: {
              df: 0,
              docs: {},
              t: {
                df: 0,
                docs: {},
                h: {
                  df: 0,
                  docs: {},
                  i: {
                    df: 0,
                    docs: {},
                    n: { df: 1, docs: { 0: { tf: 1.4142135623730951 } } },
                  },
                },
              },
            },
            o: {
              df: 0,
              docs: {},
              n: {
                d: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    r: {
                      df: 0,
                      docs: {},
                      v: {
                        df: 0,
                        docs: {},
                        i: {
                          df: 0,
                          docs: {},
                          l: {
                            df: 2,
                            docs: {
                              2: { tf: 3.0 },
                              3: { tf: 1.4142135623730951 },
                            },
                            l: {
                              df: 0,
                              docs: {},
                              e: {
                                "'": { df: 1, docs: { 1: { tf: 1.0 } } },
                                a: {
                                  c: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      df: 0,
                                      docs: {},
                                      i: {
                                        df: 0,
                                        docs: {},
                                        v: {
                                          df: 0,
                                          docs: {},
                                          i: {
                                            df: 0,
                                            docs: {},
                                            t: {
                                              df: 0,
                                              docs: {},
                                              y: {
                                                b: {
                                                  df: 0,
                                                  docs: {},
                                                  o: {
                                                    a: {
                                                      df: 0,
                                                      docs: {},
                                                      r: {
                                                        d: {
                                                          df: 1,
                                                          docs: {
                                                            2: {
                                                              tf: 1.4142135623730951,
                                                            },
                                                          },
                                                        },
                                                        df: 0,
                                                        docs: {},
                                                      },
                                                    },
                                                    df: 0,
                                                    docs: {},
                                                  },
                                                },
                                                df: 0,
                                                docs: {},
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      e: {
                                        df: 0,
                                        docs: {},
                                        t: { df: 1, docs: { 1: { tf: 1.0 } } },
                                      },
                                    },
                                  },
                                },
                                df: 0,
                                docs: {},
                                s: {
                                  df: 0,
                                  docs: {},
                                  e: {
                                    df: 0,
                                    docs: {},
                                    s: {
                                      df: 0,
                                      docs: {},
                                      s: { df: 1, docs: { 2: { tf: 1.0 } } },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                df: 0,
                docs: {},
              },
              r: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  f: {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      o: {
                        df: 0,
                        docs: {},
                        w: { df: 1, docs: { 0: { tf: 1.0 } } },
                      },
                    },
                  },
                },
                l: {
                  d: { df: 1, docs: { 1: { tf: 1.4142135623730951 } } },
                  df: 0,
                  docs: {},
                },
              },
            },
            r: {
              a: {
                df: 0,
                docs: {},
                p: {
                  df: 0,
                  docs: {},
                  p: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      r: { df: 1, docs: { 0: { tf: 1.0 } } },
                    },
                  },
                },
              },
              df: 0,
              docs: {},
              i: {
                df: 0,
                docs: {},
                t: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: { df: 1, docs: { 1: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
            s: {
              ":": {
                "/": {
                  "/": {
                    df: 0,
                    docs: {},
                    l: {
                      df: 0,
                      docs: {},
                      o: {
                        c: {
                          a: {
                            df: 0,
                            docs: {},
                            l: {
                              df: 0,
                              docs: {},
                              h: {
                                df: 0,
                                docs: {},
                                o: {
                                  df: 0,
                                  docs: {},
                                  s: {
                                    df: 0,
                                    docs: {},
                                    t: {
                                      ":": {
                                        3: {
                                          2: {
                                            1: {
                                              0: {
                                                df: 1,
                                                docs: { 3: { tf: 1.0 } },
                                              },
                                              df: 0,
                                              docs: {},
                                            },
                                            df: 0,
                                            docs: {},
                                          },
                                          df: 0,
                                          docs: {},
                                        },
                                        df: 0,
                                        docs: {},
                                      },
                                      df: 0,
                                      docs: {},
                                    },
                                  },
                                },
                              },
                            },
                          },
                          df: 0,
                          docs: {},
                        },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
              df: 0,
              docs: {},
            },
          },
          y: { df: 1, docs: { 1: { tf: 1.7320508075688772 } } },
        },
      },
      title: {
        root: {
          a: {
            df: 0,
            docs: {},
            p: { df: 0, docs: {}, i: { df: 1, docs: { 1: { tf: 1.0 } } } },
          },
          b: {
            a: {
              c: {
                df: 0,
                docs: {},
                k: {
                  df: 0,
                  docs: {},
                  e: {
                    df: 0,
                    docs: {},
                    n: {
                      d: { df: 1, docs: { 1: { tf: 1.0 } } },
                      df: 0,
                      docs: {},
                    },
                  },
                },
              },
              df: 0,
              docs: {},
            },
            df: 0,
            docs: {},
          },
          d: {
            a: {
              df: 0,
              docs: {},
              t: {
                a: {
                  b: {
                    a: {
                      df: 0,
                      docs: {},
                      s: { df: 1, docs: { 2: { tf: 1.0 } } },
                    },
                    df: 0,
                    docs: {},
                  },
                  df: 0,
                  docs: {},
                },
                df: 0,
                docs: {},
              },
            },
            df: 0,
            docs: {},
            e: {
              df: 0,
              docs: {},
              v: {
                df: 0,
                docs: {},
                e: {
                  df: 0,
                  docs: {},
                  l: {
                    df: 0,
                    docs: {},
                    o: {
                      df: 0,
                      docs: {},
                      p: { df: 1, docs: { 3: { tf: 1.0 } } },
                    },
                  },
                },
              },
            },
          },
          df: 0,
          docs: {},
          f: {
            df: 0,
            docs: {},
            r: {
              df: 0,
              docs: {},
              o: {
                df: 0,
                docs: {},
                n: {
                  df: 0,
                  docs: {},
                  t: {
                    df: 0,
                    docs: {},
                    e: {
                      df: 0,
                      docs: {},
                      n: {
                        d: { df: 1, docs: { 0: { tf: 1.0 } } },
                        df: 0,
                        docs: {},
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    lang: "English",
    pipeline: ["trimmer", "stopWordFilter", "stemmer"],
    ref: "id",
    version: "0.9.5",
  },
  results_options: { limit_results: 30, teaser_word_count: 30 },
  search_options: {
    bool: "OR",
    expand: true,
    fields: {
      body: { boost: 1 },
      breadcrumbs: { boost: 1 },
      title: { boost: 2 },
    },
  },
});
