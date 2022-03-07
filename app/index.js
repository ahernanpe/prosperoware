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

class PageController extends Controller {
  init() {
    super.init();
    this.idSeq = 0;
    console.log("array", this.generateRec());
    this.store.set("data", array);
    this.store.set("data1", array);
    this.store.set("bars", this.generateRecords());
    console.log("generando...");

    this.store.init(
      "$page.records",
      Array.from({ length: 5 }).map((x, i) => ({
        text: `${i + 1}`
      }))
    );
  }

  generateRecords(node) {
    console.log("activado");
    if (!node || node.$level < 5) {
      return array.map(array => ({
        id: ++this.idSeq,
        name: array.name,
        size: "55454",
        date_modified: "jun-2022",
        type: "pdf",
        $leaf: true
      }));
    }
  }

  generteFiles(node) {
    return Array.from({ length: 5 }).map((x, i) => ({
      text: `${i + 1}`
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
              selection={{
                type: KeySelection,
                bind: "$page.selection",
                multiple: true
              }}
              columns={[
                {
                  header: "Folders",
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
            <div controller={PageController}>
              <List
                records:bind="bars"
                selection={{ type: KeySelection, bind: "selectedType" }}
                style="widt+h:200px"
                emptyText="Nothing found."
                mod="bordered"
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
            <Repeater records:bind="$page.records">
              <div>
                <Checkbox
                  checked:bind="$record.selected"
                  text:bind="$record.name"
                />
              </div>
            </Repeater>

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
