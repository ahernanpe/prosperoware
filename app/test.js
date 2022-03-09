const array = [
  {
    name: "Quokka",
    $level: 0,
    id: "1609839234925",
    $children: [
      {
        name: "VSCode",
        $level: 1,
        id: "1609839234926",
        documents: []
      },
      {
        name: "Prettier",
        $level: 1,
        id: "1609839234927",
        documents: []
      }
    ]
  },
  {
    name: "JavaScript",
    $level: 0,
    id: "2609839234925",
    $children: [
      {
        name: "Frameworks",
        $level: 1,
        id: "2609839234926",
        $children: [
          {
            name: "ReactJS",
            $level: 2,
            id: "2609839234927",
            $children: [
              {
                name: "CxJS",
                $level: 3,
                id: "2609839234928",
                documents: [
                  {
                    id: "2609839234940",
                    name: "Introduction.pdf",
                    size: 156664555,
                    date_modified:
                      "Mon Jun 14 2021 13:34:55 GMT+0200 (Central European Summer Time)",
                    type: "pdf",
                    $leaf: true,
                    $level: 4
                  },
                  {
                    id: "2609839234940",
                    name: "Documentation.docx",
                    size: 1566555,
                    date_modified:
                      "Tue Jun 15 2021 20:30:55 GMT+0200 (Central European Summer Time)",
                    type: "docx"
                  },
                  {
                    id: "2609839234940",
                    name: "Calculations.xlsx",
                    size: 180995,
                    date_modified:
                      "Sun Jun 13 2021 13:51:35 GMT+0200 (Central European Summer Time)",
                    type: "xlsx"
                  }
                ]
              },
              {
                name: "ModernUI",
                $level: 3,
                id: "2609839234929"
              }
            ]
          },
          {
            name: "VueJS",
            $level: 2,
            id: "2609839234930"
          },
          {
            name: "AngularJS",
            $level: 2,
            id: "2609839234931"
          }
        ],
        documents: [
          {
            id: "2609839234940",
            name: "Frameworks.pdf",
            size: 365597,
            date_modified:
              "Mon Jun 14 2021 13:34:55 GMT+0200 (Central European Summer Time)",
            type: "pdf"
          }
        ]
      }
    ]
  },
  {
    name: "GraphQL",
    $level: 0,
    id: "2609839234950",
    documents: [
      {
        id: "2609839234955",
        name: "Introduction.pdf",
        size: 156664555,
        date_modified:
          "Mon Jun 14 2021 13:34:55 GMT+0200 (Central European Summer Time)",
        type: "pdf",
        $leaf: true,
        $level: 1
      },
      {
        id: "2609839234955",
        name: "closures.pdf",
        size: 156664555,
        date_modified:
          "Mon Jun 14 2021 13:34:55 GMT+0200 (Central European Summer Time)",
        type: "pdf",
        $leaf: true,
        $level: 1
      }
    ]
  },
  {
    id: 2609839234990,
    name: "compilation.r",
    size: 365597,
    city: "Sauerhaven",
    date_modified: "Jun 14 2021",
    type: "pdf",
    $leaf: true,
    $level: 0
  }
];

var a = array.filter(x => x.id === "2609839234928").map(x => x.name);

var b = array.filter(x => x.id === "2609839234950")
    .map( doc => doc.documents.map( 
    sub => ({name: sub.name,
             size: sub.size})     ));
    
var c = b.reduce((a,b) => [...a,...b], [])
    
console.log("hello",c)

