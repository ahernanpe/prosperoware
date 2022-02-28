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
import { Text } from "cx/svg";
import {
  Controller,
  KeySelection,
  LabelsLeftLayout,
  PropertySelection
} from "cx/ui";

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
    name: "Nasir Brown",
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
    console.log(this.generateRecords());
    this.store.set("data", array);
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
            <Section>
              <Grid
                records:bind="data"
                mod="big"
                style={{ width: "100%" }}
                dataAdapter={{
                  type: TreeAdapter,
                  load: (context, { controller }, node) =>
                    controller.generateRecors(node)
                }}
                selection={{ type: KeySelection, bind: "$page.selection" }}
                columns={[
                  {
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
                  },
                  { header: "Size", field: "size" },
                  { header: "Date", field: "date_modified", sortable: true },
                  { header: "Type", field: "type", sortable: true }
                ]}
              />
              <List
                records-bind="$page.record"
                selection={PropertySelection}
                style="width:200px"
                emptyText="No results found."
                mod="bordered"
                onItemDoubleClick={(e, { store }) => {
                  MsgBox.alert(store.get("$record.text"));
                }}
              >
                <div>
                  <strong>
                    Header <Text expr="{$index}+1" />
                  </strong>
                </div>
                Description
              </List>
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
