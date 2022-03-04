import {
  Chart,
  Column,
  Gridlines,
  LineGraph,
  Marker,
  PieChart,
  PieSlice
} from "cx/charts";
import {
  Controller,
  KeySelection,
  LabelsLeftLayout,
  PropertySelection,
  Repeater
} from "cx/ui";
import { Svg, Text } from "cx/svg";
import {
  Button,
  Checkbox,
  FlexRow,
  Grid,
  Heading,
  HtmlElement,
  List,
  Section,
  Select,
  TreeAdapter,
  TreeNode,
  ValidationGroup
} from "cx/widgets";

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
    id: 0,
    name: "compilation.r",
    size: 365597,
    city: "Sauerhaven",
    date_modified: "Jun 14 2021",
    type: "pdf",
    $leaf: true,
    $level: 1
  }
];

class PageController extends Controller {
  init() {
    super.init();
    this.idSeq = 0;
    console.log(this.generateRec());
    this.store.set("data", array);
    this.store.set("data1", array);
    this.store.set("bars", [
      {
        day: "Mo",
        value: 500,
        colorIndex: 12
      },
      {
        day: "Tu",
        value: 900,
        colorIndex: 9
      },
      {
        day: "We",
        value: 850,
        colorIndex: 10
      },
      {
        day: "Th",
        value: 950,
        colorIndex: 9
      },
      {
        day: "Fr",
        value: 1000,
        colorIndex: 8
      }
    ]);
    console.log("generando...");
    const a = Array.from({ length: 5 }).map((x, i) => ({
      text: `${i + 1}`
    }));
    console.log(a);
    this.store.init(
      "$page.records",
      Array.from({ length: 5 }).map((x, i) => ({
        text: `${i + 1}`
      }))
    );
  }

  generateRecords(node) {
    if (!node)
      return Array.from({ length: 2 }).map(() => ({
        id: ++this.idSeq,
        name: "Name",
        size: 1000,
        date_modified: "",
        type: "pdf",
        $leaf: true
      }));
  }
  generateRec() {
    console.log("page.records");
    return "$page.records";
  }
}

export const App = (
  <cx>
    <div>
      <Heading level="1">Tree Grid. </Heading>
      <br />
      <Heading level="3">Author: Alvaro Hernandez</Heading>
      <Heading level="3">Date: 02/27/2022</Heading>
      <br />
      <br />
    </div>
    <table>
      <tr>
        <td class="first">
          <div controller={PageController}>
            <Grid
              records:bind="data"
              mod="tree"
              style={{ width: "100%" }}
              dataAdapter={{
                type: TreeAdapter,
                load: (context, { controller }, node) =>
                  controller.generateRecords(node)
              }}
              selection={{ type: KeySelection, bind: "$page.selection" }}
              columns={[
                {
                  header: "Folder",
                  field: "name",
                  sortable: true,
                  items: (
                    <cx>
                      <TreeNode
                        expanded:bind="$record.$expanded"
                        leaf:bind="$record.$leaf"
                        level:bind="$record.$level"
                        loading:bind="$record.$loading"
                        text:bind="$record.name"
                      />
                    </cx>
                  )
                }
              ]}
            />
          </div>
        </td>
        <td class="second">
          <div>
            <div>
              <List
                records:bind="data"
                selection={{
                  type: KeySelection,
                  bind: "$record.documents"
                }}
              >
                Name: <span text:bind="$record.name" />
                <br />
                <strong text:bind="$record.name" />
                <br />
                Size: <span text:bind="$record.size" />
                <br />
                Date: <span text:bind="$record.date_modified" />
              </List>
            </div>
            <Section>
              <FlexRow putInto="footer">
                <Button mod="hollow" icon="file" />
                <Button mod="hollow" icon="calculator" />
                <Button mod="hollow" icon="search" />
              </FlexRow>
            </Section>
          </div>
        </td>
      </tr>
    </table>
  </cx>
);
