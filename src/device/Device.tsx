import * as React from "react";
import { IPhone } from "./iphone/iphone";
import { Grid, Row, Col } from "react-bootstrap";
import { Editor } from "../components/editor";
import { Prototype } from "../components/prototype/Prototype";
import F from "react-jsonschema-form";

const Form: any = F;

import {
  CustomTitleField,
  ObjectFieldTemplate,
  DefaultNormalArrayFieldTemplate
} from "../components/custom";

const schema = require("../data/form.json");
const home: any = require("../data/home.json");

export class Device extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { formData: home };
  }
  render() {
    const fields = {
      TitleField: CustomTitleField
    };
    return (
      <Grid>
        <Row>
          <Col md={12} xs={12} sm={12}>
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#53d9ef"
              }}
            >
              <Editor
                onChange={() => {}}
                value={JSON.stringify(this.state.formData, null, 2)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} xs={12} sm={12}>
            &nbsp;
          </Col>
        </Row>
        <Row>
          <Col md={4} xs={4} sm={4}>
            <IPhone>
              <Prototype />
            </IPhone>
          </Col>
          <Col md={8} xs={8} sm={8}>
            <Form
              fields={fields}
              ArrayFieldTemplate={DefaultNormalArrayFieldTemplate}
              ObjectFieldTemplate={ObjectFieldTemplate}
              schema={schema}
              formData={this.state.formData}
              onChange={(e: any) => {
                console.log(e);
                this.setState({ formData: e.formData });
              }}
            >
              &nbsp;
            </Form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
